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
using BloggerApp.Data.Models.Article.Update;
using Microsoft.AspNetCore.Authorization;
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
            if (request == null)
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
                return new UnprocessableEntityObjectResult(ModelState);
            }

            // get user id from access token
            var claimsIdentity = User.Identity as ClaimsIdentity;
            int userId = int.Parse(claimsIdentity.FindFirst(ClaimTypes.Name)?.Value);

            // create new article
            var articleEntity = Mapper.Map<Article>(request);
            var article = _unitOfWork.articleService.CreateNewArticle(articleEntity, userId);

            // save new article to database
            if (article != null)
            {
                await _unitOfWork.articleService.AddAsync(article);
                await _unitOfWork.SaveChangesAsync();
            }

            //return 201 created if successful
            return Created("hhrhrh", article);
        }


        // Get top 20 article previews
        [HttpGet("trending/{page}/{pageSize}")]
        public async Task<IActionResult> GetAllArticles(int page, int pageSize)
        {
            var articles = await _unitOfWork.articleService.GetTrendingArticles(page, pageSize);
            var count = await _unitOfWork.articleService.GetCount((float)pageSize);

            if (articles == null)
            {
                return BadRequest();
            }

            var trending = new TrendingArticles
            {
                Articles = articles,
                ArticleCount = count
            };

            //var articlesDto = Mapper.Map<IEnumerable<ArticleDto>>(articles);
            return Ok(trending);
        }

        [Authorize]
        [HttpGet("my-articles/{page}/{pageSize}")]
        public async Task<IActionResult> GetAllArticlesForUserById(int page, int pageSize)
        {
            // get user id from access token
            var claimsIdentity = User.Identity as ClaimsIdentity;
            int userId = int.Parse(claimsIdentity.FindFirst(ClaimTypes.Name)?.Value);

            // check to see user exists
            if (!await _unitOfWork.userService.CheckUserExistsAsync(userId))
            {
                return NotFound();
            }

            // Get list of all articles created by the user 
            var articles = await _unitOfWork.articleService.GetAllArticlesByUserId(userId, page, pageSize);
            var usersArticleDto = Mapper.Map<List<UsersArticleDto>>(articles);

            return Ok(usersArticleDto);
        }

        [Authorize]
        [HttpGet("{articleId}")]
        public async Task<IActionResult> GetUserArticleDetail(int articleId)
        {
            // get user id from access token
            var claimsIdentity = User.Identity as ClaimsIdentity;
            int userId = int.Parse(claimsIdentity.FindFirst(ClaimTypes.Name)?.Value);

            // check to see user exists
            if (!await _unitOfWork.userService.CheckUserExistsAsync(userId))
            {
                return NotFound();
            }

            // Get the selected users article
            var article = await _unitOfWork.articleService.GetArticleForUserById(userId, articleId);

            if(article == null)
            {
                return NotFound();
            }

            var userArticleDetail = Mapper.Map<UsersArticleDto>(article);

            return Ok(userArticleDetail);
        }

        [Authorize]
        [HttpPut("{articleId}")]
        public async Task<IActionResult> UpdateArticleForUser(int articleId, [FromBody] ArticleForUpdatingDto articleUpdate)
        {
            // get user id from access token
            var claimsIdentity = User.Identity as ClaimsIdentity;
            int userId = int.Parse(claimsIdentity.FindFirst(ClaimTypes.Name)?.Value);

            if (articleUpdate == null)
            {
                return BadRequest();
            }

            var articleFromDb = await _unitOfWork.articleService.GetArticleForUserById(userId, articleId);

            if(articleFromDb == null)
            {
                return NotFound();
            }

            Mapper.Map(articleUpdate, articleFromDb);

            if (!await _unitOfWork.SaveChangesAsync())
            {
                // TODO: Throw proper exception
                return BadRequest("Something went wrong");
            }

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{articleId}")]
        public async Task<IActionResult> DeleteArticleForUser(int articleId)
        {
            // get user id from access token
            var claimsIdentity = User.Identity as ClaimsIdentity;
            int userId = int.Parse(claimsIdentity.FindFirst(ClaimTypes.Name)?.Value);

            // Confirm user exists
            if (!await _unitOfWork.userService.CheckUserExistsAsync(userId))
            {
                return NotFound();
            }

            // Get the article that is to be deleted
            var articleToDelete = await _unitOfWork.articleService.GetArticleForUserById(userId, articleId);

            // confirm that the article to be deleted exists
            if(articleToDelete == null)
            {
                return NotFound();
            }

            // Delete the article
            _unitOfWork.articleService.Delete(articleToDelete);
            if(!await _unitOfWork.SaveChangesAsync())
            {
                // TODO: proper exception
                return BadRequest("something went wrong");
            }

            // Get new list of all articles created by the user 
            var articles = await _unitOfWork.articleService.GetAllArticlesByUserId(userId, 1, 5);
            var usersArticleDto = Mapper.Map<List<UsersArticleDto>>(articles);

            return Ok(usersArticleDto);
        }

    }
}