using BloggerApp.Data.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Infrastructure
{
    public class JwtAuthentication
    {

        private readonly byte[] _secretKey;
        private readonly string _validIssuer;
        private readonly string _validAudience;

        public JwtAuthentication(IConfiguration configuration)
        {
            _secretKey = Encoding.UTF8.GetBytes(configuration["Jwt:SecurityKey"]);
            _validAudience = configuration["Jwt:ValidAudience"];
            _validIssuer = configuration["Jwt:ValidIssuer"];
        }

        public string CreateAccessToken(AppUser user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.AppUserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("FName", user.FirstName),
                new Claim("LName", user.LastName)
            };

            return GetAccessToken(claims);
        }

        private string GetAccessToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(_secretKey);
            var signInCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken
            (
                issuer: _validIssuer,
                audience: _validAudience,
                expires: DateTime.Now.AddMinutes(30),
                claims: claims,
                signingCredentials: signInCred
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public RefreshToken CreateRefreshToken(int userId)
        {
            var refreshToken = new RefreshToken
            {
                AppUserId = userId,
                Token = Guid.NewGuid().ToString(),
                IssuedUtc = DateTime.Now,
                //ExpiresUtc = DateTime.Now.AddHours(1)
                ExpiresUtc = DateTime.Now.AddHours(6)
            };

            return refreshToken;
        }
    }
}
