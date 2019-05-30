using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BloggerApp.ConfigureServices;
using BloggerApp.Data.Context;
using BloggerApp.Data.Entities;
using BloggerApp.Data.Models;
using BloggerApp.Data.Models.AppUser;
using BloggerApp.Data.Models.Article;
using BloggerApp.Data.Models.ArticleCategory;
using BloggerApp.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BloggerApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<TestDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2).AddJsonOptions(
                options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            // Get information from the app settings and make use of it
            var appSettingsSection = Configuration.GetSection("AppSecrets");
            services.Configure<AppSecrets>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSecrets>();

            string connection = appSettings.ConnectionString;

            //services.AddDbContext<TestDBContext>(options => options.UseSqlServer(connection));
            services.AddDbContext<TestDBContext>(options => options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"]));

            var key = Encoding.UTF8.GetBytes(appSettings.Secret);

            DependencyInjectionConfig.AddScope(services);
            JwtConfig.AddJwtAuthentication(services, Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<UserForCreationDto, AppUser>();
                cfg.CreateMap<ArticleCategory, ArticleCategoryDto>();
                cfg.CreateMap<ArticleForCreationDto, Article>();
                cfg.CreateMap<Article, ArticleDto>()
                    .ForMember(a => a.FirstName, ex => ex.MapFrom(o => o.Author.FirstName))
                    .ForMember(a => a.LastName, ex => ex.MapFrom(o => o.Author.LastName));
            });
            //app.ConfigureCustomExceptionMiddleware();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
