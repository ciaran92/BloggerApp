using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace BloggerApp.IntegrationTesting.Helpers
{
    public class ConfigurationFactory
    {
        private static IConfigurationRoot configuration;
        private ConfigurationFactory() { }

        public static IConfigurationRoot GetConfiguration()
        {
            if(configuration is null)
            {
                configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .AddEnvironmentVariables()
                    .Build();
            }

            return configuration;
        }
    }
}
