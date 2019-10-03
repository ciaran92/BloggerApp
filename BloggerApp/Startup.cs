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
using BloggerApp.Data.Models.Article.Update;
using BloggerApp.Data.Models.ArticleCategory;
using BloggerApp.Data.Seed;
using BloggerApp.Helpers;
using Microsoft.AspNetCore.Authentication;
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

            //services.AddDbContext<TestDBContext>(options => options.UseSqlServer(connection));
            services.AddDbContext<TestDBContext>(options => options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"]));

            DependencyInjectionConfig.AddScope(services);
            services.AddAuthentication(GetAuthenticationOptions).AddJwtBearer(GetJwtBearerOptions);
            //JwtConfig.AddJwtAuthentication(services, Configuration);

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", p =>
                {
                    p.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, TestDBContext context)
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
                    .ForMember(dto => dto.FirstName, conf => conf.MapFrom(a => a.Author.FirstName))
                    .ForMember(dto => dto.LastName, conf => conf.MapFrom(a => a.Author.LastName));
                cfg.CreateMap<Article, UsersArticleDto>();
                cfg.CreateMap<ArticleForUpdatingDto, Article>();
            });
            //app.ConfigureCustomExceptionMiddleware();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            //DbSeeder.seedDb(context);

            app.UseHttpsRedirection();
            app.UseMvc();
        }

        private void GetAuthenticationOptions(AuthenticationOptions options)
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }

        private void GetJwtBearerOptions(JwtBearerOptions options)
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["Jwt:Issuer"],
                ValidAudience = Configuration["Jwt:Audience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecurityKey"]))
            };
        }
    }
}
