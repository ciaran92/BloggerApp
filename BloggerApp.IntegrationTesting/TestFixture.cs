﻿using BloggerApp.IntegrationTesting.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;

namespace BloggerApp.IntegrationTesting
{
    public class TestFixture<TStartup> : IDisposable where TStartup : class
    {
        private TestServer Server;
        public HttpClient Client { get; }

        public TestFixture()
        {
            /*var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();*/

            var webHostBuilder = new WebHostBuilder()
                .UseStartup(typeof(TStartup))
                .UseConfiguration(ConfigurationFactory.GetConfiguration());

            Server = new TestServer(webHostBuilder);
            Client = Server.CreateClient();
        }
 
        public void Dispose()
        {
            Client.Dispose();
            Server.Dispose();
        }
    }
}
