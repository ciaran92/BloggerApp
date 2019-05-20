using BloggerApp.Data.Models;
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

        [Fact]
        public async Task Test1()
        {
            var request = "/api/values";
            
            var response = await _client.GetAsync(request);

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            //Assert.Equal(1, 1);
        }

        [Fact]
        public async Task TestRegisterNewUser()
        {

            var response = await _client.PostAsync("/api/users/register", new StringContent(
                    JsonConvert.SerializeObject(
                    new UserForCreationDto()
                    {
                        FirstName = "Test FName1",
                        LastName = "Test LName1",
                        UserName = "Test UsrName1",
                        UserPassword = "Password",
                        Email = "Test@email.com"
                    }), Encoding.UTF8, "application/json")
                );

            //var value = await response.Content.ReadAsStringAsync();

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
