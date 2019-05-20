using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services
{
    public interface IUnitOfWork : IDisposable
    {
        Task SaveChangesAsync();
    }
}
