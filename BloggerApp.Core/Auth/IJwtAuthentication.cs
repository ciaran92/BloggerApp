using BloggerApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace BloggerApp.Core.Auth
{
    public interface IJwtAuthentication
    {
        string CreateAccessToken(AppUser user);
        RefreshToken CreateRefreshToken(int appUserId);
    }
}
