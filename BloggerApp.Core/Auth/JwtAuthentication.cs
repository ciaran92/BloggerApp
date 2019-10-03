using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using BloggerApp.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Auth
{

    public class JwtAuthentication : IJwtAuthentication
    {
        private readonly TestDBContext _context;

        private readonly byte[] _secretKey;
        private readonly string _validIssuer;
        private readonly string _validAudience;

        public JwtAuthentication(TestDBContext context, IConfiguration configuration)
        {
            _context = context;
            _secretKey = Encoding.UTF8.GetBytes(configuration["Jwt:SecurityKey"]);
            _validIssuer = configuration["Jwt:Issuer"];
            _validAudience = configuration["Jwt:Audience"];
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

        public RefreshToken CreateRefreshToken(int userId)
        {
            var refreshToken = _context.RefreshToken.SingleOrDefault(t => t.AppUserId == userId);
            if (refreshToken != null)
            {
                Console.WriteLine("token not null");
                _context.RefreshToken.Remove(refreshToken);
                _context.SaveChanges();
            }

            var newRefreshToken = new RefreshToken
            {
                AppUserId = userId,
                Token = Guid.NewGuid().ToString(),
                IssuedUtc = DateTime.Now,
                //ExpiresUtc = DateTime.Now.AddHours(1)
                ExpiresUtc = DateTime.Now.AddHours(6)
            };

            _context.RefreshToken.Add(newRefreshToken);
            _context.SaveChanges();

            return newRefreshToken;
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

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = new SymmetricSecurityKey(_secretKey);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }
            return principal;
        }

        // Method to generate a new access token to client as long as refresh token is still valid
        public async Task<string> RefreshAccessToken(int userId)
        {
            var refreshTokenFromDB = await GetRefreshToken(userId);

            // check if there is a current refresh token for user in database
            if (refreshTokenFromDB == null)
            {
                return null;
            }

            // check if refresh token has expired.
            if (refreshTokenFromDB.ExpiresUtc < DateTime.Now)
            {
                return null;
            }

            // if refresh token still valid.. generate a new access token and send back to user
            var user = await _context.AppUser.SingleOrDefaultAsync(x => x.AppUserId == userId);

            if(user != null)
            {
                string newAccessToken = CreateAccessToken(user);
                return newAccessToken;
            }

            return null;            
        }

        public async Task<RefreshToken> GetRefreshToken(int userId)
        {
            var refreshTokenFromDB = await _context.RefreshToken.SingleOrDefaultAsync(t => t.AppUserId == userId);
            return refreshTokenFromDB;
        }

        public void DeleteRefreshToken(RefreshToken refreshToken)
        {
            _context.RefreshToken.Remove(refreshToken);
        }
    }
}
