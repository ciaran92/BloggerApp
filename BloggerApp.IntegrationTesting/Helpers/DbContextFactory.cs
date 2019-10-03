using BloggerApp.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace BloggerApp.IntegrationTesting.Helpers
{
    public class DbContextFactory : IDisposable
    {
        public TestDBContext Context { get; private set; }

        public DbContextFactory()
        {
            var dbBuilder = GetContextBuilderOptions<TestDBContext>("DefaultConnection");
            Context = new TestDBContext(dbBuilder.Options);
            Context.Database.Migrate();
            //Context.Database.BeginTransaction();
            
        }

        public TestDBContext GetRefreshContext()
        {
            var dbBuilder = GetContextBuilderOptions<TestDBContext>("DefaultConnection");
            Context = new TestDBContext(dbBuilder.Options);
            return Context;
        }

        private DbContextOptionsBuilder<TestDBContext> GetContextBuilderOptions<T>(string connectionStringName)
        {
            var connectionString = ConfigurationFactory.GetConfiguration().GetConnectionString(connectionStringName);
            Console.WriteLine("string conn: " + connectionString);
            var contextBuilder = new DbContextOptionsBuilder<TestDBContext>();
            var servicesCollection = new ServiceCollection().AddEntityFrameworkSqlServer().BuildServiceProvider();

            contextBuilder.UseSqlServer(connectionString).UseInternalServiceProvider(servicesCollection);

            return contextBuilder;
        }

        public void Dispose()
        {
            
            //Context.RefreshToken.RemoveRange(Context.RefreshToken);
            //Context.AppUser.RemoveRange(Context.AppUser);
            //Context.SaveChanges();
            //Context.Database.RollbackTransaction();
            Context.Dispose();
        }
    }
}
