using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.Core.Services
{
    public interface IGenericService<T> where T:class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task AddAsync(T entity);
        void Update(T entiy);
        void Delete(T entity);
    }
}
