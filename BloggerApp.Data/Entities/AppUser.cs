using System;
using System.Collections.Generic;

namespace BloggerApp.Data.Entities
{
    public partial class AppUser
    {
        public AppUser()
        {
            Article = new HashSet<Article>();
            RefreshToken = new HashSet<RefreshToken>();
        }

        public int AppUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string Email { get; set; }
        public string PasswordSalt { get; set; }

        public virtual ICollection<Article> Article { get; set; }
        public virtual ICollection<RefreshToken> RefreshToken { get; set; }
    }
}
