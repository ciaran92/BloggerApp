using BloggerApp.Data.Context;
using BloggerApp.Data.Models;
using BloggerApp.Data.Models.AppUser;
using BloggerApp.IntegrationTesting.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BloggerApp.IntegrationTesting
{
    public class UsersIntegrationTests : IClassFixture<TestFixture<Startup>>, IClassFixture<DbContextFactory>, IDisposable
    {
        public HttpClient _client;
        private readonly TestDBContext _context;

        public UsersIntegrationTests(TestFixture<Startup> fixture, DbContextFactory contextFactory)
        {
            _client = fixture.Client;
            _context = contextFactory.Context;
            _context.Database.ExecuteSqlCommand("begin tran");
        }


        [Fact]
        public async Task TestRegisterNewUserSuccessful()
        {
            _context.Database.BeginTransaction();
            var response = await _client.PostAsync("/api/users/register", new StringContent(
                    JsonConvert.SerializeObject(
                    new UserForCreationDto()
                    {
                        FirstName = "Test",
                        LastName = "User",
                        UserName = "TestUser",
                        UserPassword = "testing123",
                        Email = "test@email.com"
                    }), Encoding.UTF8, "application/json")
                );

            //var value = await response.Content.ReadAsStringAsync();

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        //[Fact]
        public async Task TestRegisterNewUserEmailAlreadyExists()
        {
            var response = await _client.PostAsync("/api/users/register", new StringContent(
                    JsonConvert.SerializeObject(
                    new UserForCreationDto()
                    {
                        FirstName = "Test",
                        LastName = "User",
                        UserName = "TestUser",
                        UserPassword = "testing123",
                        Email = "Harry@gmail.com"
                    }), Encoding.UTF8, "application/json")
                );

            //var value = await response.Content.ReadAsStringAsync();

            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        //[Fact]
        public async Task TestLoginUserCorrectCredentials()
        {
            var response = await _client.PostAsync("/api/users/login", new StringContent(
                JsonConvert.SerializeObject(
                    new UserLoginDto()
                    {
                        Email = "Harry@gmail.com",
                        UserPassword = "roflcopter69"
                    }), Encoding.UTF8, "application/json")
                );

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        //[Fact]
        public async Task TestLoginUserIncorrectPasswordReturnsBadRequest()
        {
            var response = await _client.PostAsync("/api/users/login", new StringContent(
                JsonConvert.SerializeObject(
                    new UserLoginDto()
                    {
                        Email = "Harry@gmail.com",
                        UserPassword = "wrongpassword"
                    }), Encoding.UTF8, "application/json")
                );

            //response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        //[Fact]
        public async Task TestLoginUserIncorrectEmailReturnsBadRequest()
        {
            var response = await _client.PostAsync("/api/users/login", new StringContent(
                JsonConvert.SerializeObject(
                    new UserLoginDto()
                    {
                        Email = "incorrect@email.com",
                        UserPassword = "roflcopter69"
                    }), Encoding.UTF8, "application/json")
                );

            //response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        public void Dispose()
        {
            _context.Database.ExecuteSqlCommand("rollback tran");
            //_context.Database.RollbackTransaction();
            //_context.Commit();
            //_context.AppUser.RemoveRange(_context.AppUser);
            //_context.SaveChanges();
        }
    }
}
