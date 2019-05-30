using BloggerApp.Core.AppUsers.Services;
using BloggerApp.Core.Services.Articles;
using BloggerApp.Core.Services.Categories;
using BloggerApp.Data.Context;
using System;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TestDBContext _context;

        public AppUserService userService { get; private set; }
        public ArticleService articleService { get; private set; }
        public CategoryService categoryService { get; private set; }

        public UnitOfWork(TestDBContext context)
        {
            _context = context;
            userService = new AppUserService(_context);
            articleService = new ArticleService(_context);
            categoryService = new CategoryService(_context);
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
