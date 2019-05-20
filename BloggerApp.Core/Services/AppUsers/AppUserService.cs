using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using BloggerApp.Data.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using AutoMapper;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BloggerApp.Core.Services.AppUsers;
using BloggerApp.Core.Services;

namespace BloggerApp.Core.AppUsers.Services
{

    public class AppUserService : GenericService<AppUser>, IAppUserService
    {
        private readonly TestDBContext _context;

        public AppUserService(TestDBContext context): base(context)
        {
            _context = context;
        }

        public async Task<AppUser> Authenticate(string email, string password)
        {
            var user = await _context.AppUser.SingleOrDefaultAsync(u => u.Email == email);
            if(user != null)
            {
                if(ValidatePassword(password, user.PasswordSalt, user.UserPassword))
                {
                    return user;
                }
            }

            return null;
        }

        public AppUser Register(AppUser user)
        {
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                return null;
            }
            string salt = CreateSalt();
            user.PasswordSalt = salt;
            user.UserPassword = HashPassword(user.UserPassword, salt);

            //await _context.AppUser.AddAsync(user);
            //await SaveChanges();
            return user;
        }

        private string CreateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(salt);
                return Convert.ToBase64String(salt);
            }
        }

        private string HashPassword(string password, string salt)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Encoding.UTF8.GetBytes(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8)
            );

            return hashedPassword;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.AppUser.SingleOrDefaultAsync(x => x.UserName == username) != null)
            {
                return true;
            }
            return false;
        }

        private bool ValidatePassword(string password, string salt, string hashedPwdFromDB)
        {
            if (HashPassword(password, salt) == hashedPwdFromDB)
            {
                return true;
            }
            return false;
        }

        private async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }

        public Task<AppUser> Login(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}
