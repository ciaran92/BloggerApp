using BloggerApp.Data.Entities;
using BloggerApp.Data.Models.Article;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services.Articles
{
    public interface IArticleService
    {
        Article CreateNewArticle(Article article, int userId);
        Task<IEnumerable<ArticleDto>> GetTrendingArticles(int page, int pageSize);
        Task<IEnumerable<Article>> GetAllArticlesByUserId(int authorId, int page, int pageSize);
        Task<int> GetCount(float size);
        Task<Article> GetArticleForUserById(int userId, int articleId);
    }
}
