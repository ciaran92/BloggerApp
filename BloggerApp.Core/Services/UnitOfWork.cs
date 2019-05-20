using BloggerApp.Core.AppUsers.Services;
using BloggerApp.Data.Context;
using System;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TestDBContext _context;

        public AppUserService userService { get; private set; }

        public UnitOfWork(TestDBContext context)
        {
            _context = context;
            userService = new AppUserService(_context);
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
