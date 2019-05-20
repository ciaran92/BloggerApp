using System;
using System.Collections.Generic;
using System.Text;

namespace BloggerApp.Data.Models.AppUser
{
    public class UserForCreationDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string Email { get; set; }
    }
}
