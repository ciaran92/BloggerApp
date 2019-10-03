using AutoMapper.QueryableExtensions;
using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using BloggerApp.Data.Models.Article;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services.Articles
{
    public class ArticleService : GenericService<Article>, IArticleService
    {

        private readonly TestDBContext _context;

        public ArticleService(TestDBContext context) : base(context)
        {
            _context = context;
        }

        public Article CreateNewArticle(Article article, int userId)
        {
            article.AuthorId = userId;
            return article;
        }

        public async Task<IEnumerable<ArticleDto>> GetTrendingArticles(int page, int pageSize)
        {
           var articles = await _context.Article.ProjectTo<ArticleDto>()
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return articles;
        }

        public async Task<int> GetCount(float size)
        {
            var articlesCount = await _context.Article.CountAsync();
            var totalPages = (int)Math.Ceiling(articlesCount / (float)size);

            return totalPages;
        }

        public async Task<IEnumerable<Article>> GetAllArticlesByUserId(int authorId, int page, int pageSize)
        {
            var articles = await _context.Article
                .Where(a => a.AuthorId == authorId)
                .OrderBy(a => a.ArticleId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return articles;
        }

        public async Task<Article> GetArticleForUserById(int userId, int articleId)
        {
            var article = await _context.Article
                .Where(a => a.ArticleId == articleId)
                .Where(a => a.AuthorId == userId)
                .SingleOrDefaultAsync();

            return article;
        }
    }
}
