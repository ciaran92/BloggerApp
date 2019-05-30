using BloggerApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BloggerApp.Data.Models.AppUser
{
    public class UserTokens
    {
        public string Jwt { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }
}
