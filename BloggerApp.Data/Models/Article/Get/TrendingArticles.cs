using System;
using System.Collections.Generic;
using System.Text;

namespace BloggerApp.Data.Models.Article
{
    public class TrendingArticles
    {
        public IEnumerable<ArticleDto> Articles { get; set; }
        public int ArticleCount { get; set; }
    }
}
