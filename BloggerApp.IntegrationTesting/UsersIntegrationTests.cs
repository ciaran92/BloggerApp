using BloggerApp.Data.Models;
using BloggerApp.Data.Models.AppUser;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
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
    public class UsersIntegrationTests : IClassFixture<TestFixture<Startup>>
    {
        public HttpClient _client;

        public UsersIntegrationTests(TestFixture<Startup> fixture)
        {
            _client = fixture.Client;
        }

        /*[Fact]
        public async Task Test1()
        {
            var request = "/api/values";
            
            var response = await _client.GetAsync(request);

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            //Assert.Equal(1, 1);
        }*/

        [Fact]
        public async Task TestRegisterNewUserSuccessful()
        {
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

        [Fact]
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

        [Fact]
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

        [Fact]
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

        [Fact]
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
    }
}
