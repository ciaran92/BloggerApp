using BloggerApp.Data.Entities;
using BloggerApp.Data.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BloggerApp.Core.Auth
{

    public class JwtAuthentication : IJwtAuthentication
    {
        private readonly AppSecrets _appSecrets;
        private readonly byte[] _secretKey;

        public JwtAuthentication(IOptions<AppSecrets> appSecrets)
        {
            _appSecrets = appSecrets.Value;
            _secretKey = Encoding.UTF8.GetBytes(_appSecrets.Secret);
        }

        public string CreateAccessToken(AppUser user)
        {
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.AppUserId.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Email),
                new Claim("FName", user.FirstName),
                new Claim("LName", user.LastName)
            };

            return GetAccessToken(claims);
        }

        public RefreshToken CreateRefreshToken(int appUserId)
        {
            throw new NotImplementedException();
        }

        public RefreshToken GetRefreshToken(int appUserId)
        {
            throw new NotImplementedException();
        }

        private string GetAccessToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(_secretKey);
            var signInCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken
            (
                issuer: "http://localhost:52459",
                audience: "http://localhost:52459",
                expires: DateTime.Now.AddMinutes(5),
                claims: claims,
                signingCredentials: signInCred
            );
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
