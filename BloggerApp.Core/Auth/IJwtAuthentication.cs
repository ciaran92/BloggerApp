using BloggerApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Auth
{
    public interface IJwtAuthentication
    {
        string CreateAccessToken(AppUser user);
        RefreshToken CreateRefreshToken(int appUserId);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
        Task<string> RefreshAccessToken(int userId);
        Task<RefreshToken> GetRefreshToken(int userId);
        void DeleteRefreshToken(RefreshToken refreshToken);
    }
}
