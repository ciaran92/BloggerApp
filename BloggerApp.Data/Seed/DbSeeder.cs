using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace BloggerApp.Data.Seed
{
    public static class DbSeeder
    {

        public static void seedDb(TestDBContext context)
        {
            context.Database.EnsureCreated();
            string salt = CreateSalt();
            var userpassword = HashPassword("password", salt);

            context.AppUser.Add(
                new AppUser()
                {
                    FirstName = "Uncle",
                    LastName = "Bob",
                    UserName = "uncB",
                    UserPassword = userpassword,
                    Email = "bobo@hotmail.com",
                    PasswordSalt = salt
                });

            context.SaveChanges();
        }

        private static string CreateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(salt);
                return Convert.ToBase64String(salt);
            }
        }

        private static string HashPassword(string password, string salt)
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
    }
}
