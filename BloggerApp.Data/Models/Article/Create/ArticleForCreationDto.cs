using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BloggerApp.Data.Models.Article
{
    public class ArticleForCreationDto
    {
        [Required(ErrorMessage = "Please enter a Title")]
        [MaxLength(100, ErrorMessage = "The Title can be no more than 100 characters.")]
        public string ArticleTitle { get; set; }

        public string ArticleBody { get; set; }

        [ForeignKey("ArticleCategory")]
        [Required]
        public int CategoryId { get; set; }
    }
}
