using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using BloggerApp.Data.Models.ArticleCategory;
using Microsoft.EntityFrameworkCore;

namespace BloggerApp.Core.Services.Categories
{
    public class CategoryService : GenericService<ArticleCategory>, ICategoryService
    {
        private readonly TestDBContext _context;

        public CategoryService(TestDBContext context) : base(context)
        {
            _context = context;
        }
        // Return a list of all categories
        public async Task<List<ArticleCategoryDto>> GetAllCategories()
        {
            List<ArticleCategory> categories = await _context.ArticleCategory.OrderBy(x => x.CategoryName).ToListAsync();
            var articleCategoryDto = Mapper.Map<List<ArticleCategoryDto>>(categories);
            return articleCategoryDto;
        }

        public async Task<bool> ArticleCategoryExists(int categoryId)
        {
            var category = await _context.ArticleCategory.SingleOrDefaultAsync(c => c.CategoryId == categoryId);
            if(category != null)
            {
                return true;
            }
            return false;
        }
    }
}
