using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BloggerApp.Core.Services.Categories;
using BloggerApp.Data.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloggerApp.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly TestDBContext _context;
        private ICategoryService _categoryService;

        public CategoriesController(TestDBContext context, ICategoryService categoryService)
        {
            _context = context;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategories();
            if(categories != null)
            {
                return Ok(categories);
            }

            return BadRequest("something went wrong");
        }
    }
}