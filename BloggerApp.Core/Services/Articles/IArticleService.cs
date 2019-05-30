using BloggerApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services.Articles
{
    public interface IArticleService
    {
        Article CreateNewArticle(Article article, int userId);
    }
}
