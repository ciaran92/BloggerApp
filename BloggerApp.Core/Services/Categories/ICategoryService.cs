using BloggerApp.Data.Entities;
using BloggerApp.Data.Models.ArticleCategory;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services.Categories
{
    public interface ICategoryService
    {
        Task<List<ArticleCategoryDto>> GetAllCategories();
    }
}
