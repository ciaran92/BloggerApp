using BloggerApp.Core.Auth;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace BloggerApp.IntegrationTesting.Helpers
{
    public class Request<TStartup> : IDisposable where TStartup : class
    {

        private readonly HttpClient _client;
        private readonly TestServer _server;

        public Request()
        {
            var webHostBuilder = new WebHostBuilder()
                .UseStartup<TStartup>()
                .UseConfiguration(ConfigurationFactory
                .GetConfiguration());

            _server = new TestServer(webHostBuilder);
            _client = _server.CreateClient();
        }
    
        // public JwtAuthentication Jwt = new JwtAuthentication(ConfigurationFactory.GetConfiguration());

        public Request<TStartup> AddAuth(string token)
        {
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            return this;
        }

        public Task<HttpResponseMessage> Post<T>(string url, T body)
        {
            return _client.PostAsJsonAsync<T>(url, body);
        }

        public void Dispose()
        {
            _client.Dispose();
            _server.Dispose();
        }
    }
}
