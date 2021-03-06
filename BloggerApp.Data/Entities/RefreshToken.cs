﻿using System;
using System.Collections.Generic;

namespace BloggerApp.Data.Entities
{
    public partial class RefreshToken
    {
        public int Id { get; set; }
        public DateTime? IssuedUtc { get; set; }
        public DateTime? ExpiresUtc { get; set; }
        public string Token { get; set; }
        public int? AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }
    }
}
