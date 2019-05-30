using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services.Articles
{
    public class ArticleService : GenericService<Article>, IArticleService
    {

        public ArticleService(TestDBContext context) : base(context)
        {
        }

        public Article CreateNewArticle(Article article, int userId)
        {
            article.AuthorId = userId;
            return article;
        }
    }
}
