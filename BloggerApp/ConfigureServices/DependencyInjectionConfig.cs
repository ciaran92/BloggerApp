using BloggerApp.Core.AppUsers.Services;
using BloggerApp.Core.Auth;
using BloggerApp.Core.Services;
using BloggerApp.Core.Services.AppUsers;
using BloggerApp.Core.Services.Categories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloggerApp.ConfigureServices
{
    public class DependencyInjectionConfig
    {
        public static void AddScope(IServiceCollection services)
        {
            services.AddScoped<IAppUserService, AppUserService>();
            services.AddScoped<IJwtAuthentication, JwtAuthentication>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
        }
    }
}
