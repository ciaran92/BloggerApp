using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BloggerApp.Data.Entities
{
    public partial class Article
    {
        public int ArticleId { get; set; }
        public string ArticleTitle { get; set; }
        public string ArticleBody { get; set; }
        public int AuthorId { get; set; }
        public int CategoryId { get; set; }

        public virtual AppUser Author { get; set; }
        public virtual ArticleCategory Category { get; set; }
    }
}
