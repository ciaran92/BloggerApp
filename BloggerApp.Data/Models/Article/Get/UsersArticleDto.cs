using System;
using System.Collections.Generic;
using System.Text;

namespace BloggerApp.Data.Models.Article
{
    public class UsersArticleDto
    {
        public int ArticleId { get; set; }
        public string ArticleTitle { get; set; }
        public string ArticleBody { get; set; }
    }
}
