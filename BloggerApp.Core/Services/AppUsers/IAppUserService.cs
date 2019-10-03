using BloggerApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services.AppUsers
{
    public interface IAppUserService
    {
        AppUser Register(AppUser user);
        Task<AppUser> Login(string username, string password);
        Task<bool> EmailExists(string email);
        Task<AppUser> Authenticate(string username, string password);
        Task<bool> CheckUserExistsAsync(int userId);
    }
}
