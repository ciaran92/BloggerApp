using System;
using System.Collections.Generic;

namespace BloggerApp.Data.Entities
{
    public partial class ArticleCategory
    {
        public ArticleCategory()
        {
            Article = new HashSet<Article>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<Article> Article { get; set; }
    }
}
