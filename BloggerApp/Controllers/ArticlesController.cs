using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BloggerApp.Core.Services;
using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using BloggerApp.Data.Models.Article;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloggerApp.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly TestDBContext _context;
        private readonly UnitOfWork _unitOfWork;

        public ArticlesController(TestDBContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork as UnitOfWork;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateNewArticle([FromBody]ArticleForCreationDto request)
        {
            // validate request data
            if(request == null)
            {
                Console.WriteLine("request was null");
                return BadRequest();
            }

            if (!await _unitOfWork.categoryService.ArticleCategoryExists(request.CategoryId))
            {
                ModelState.AddModelError(nameof(ArticleForCreationDto), "Please select a category for the Article");
            }

            if (!ModelState.IsValid)
            {
                Console.WriteLine("why am I returning a 400 error?");
                return new UnprocessableEntityObjectResult(ModelState);
            }

            // get user id from access token
            var claimsIdentity = User.Identity as ClaimsIdentity;
            int userId = int.Parse(claimsIdentity.FindFirst(ClaimTypes.Name)?.Value);

            // create new article
            var articleEntity = Mapper.Map<Article>(request);
            var article = _unitOfWork.articleService.CreateNewArticle(articleEntity, userId);

            // save new article to database
            if(article != null)
            {
                await _unitOfWork.articleService.AddAsync(article);
                await _unitOfWork.SaveChangesAsync();
            }

            //return 201 created if successful
            return Created("hhrhrh", article);
        }


        // Get top 20 article previews
        [HttpGet]
        public async Task<IActionResult> GetAllArticles()
        {
            var articles = await _unitOfWork.articleService.GetAll();
            if (articles == null)
            {
                return BadRequest();
            }

            var articlesDto = Mapper.Map<IEnumerable<ArticleDto>>(articles);
            return Ok(articles);
        }

    }
}