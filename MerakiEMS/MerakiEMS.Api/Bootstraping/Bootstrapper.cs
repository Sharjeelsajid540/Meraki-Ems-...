using MerakiEMS.Application.Bootstrap;
using MerakiEMS.Application.Common.Configuration;
using MerakiEMS.Infrastructure.Bootstrap;

namespace MerakiEMS.Api.Bootstraping
{
    public static class Bootstrapper
    {
        public static IServiceCollection Bootstrap(this IServiceCollection serviceCollection, IConfiguration configuration)
        {

            configuration.Bind(AppConfigurations.Configuration);
            serviceCollection.AddApplication();
            serviceCollection.AddInfrastructure(configuration);

            serviceCollection.Configure<SwaggerConfig>(configuration.GetSection(nameof(SwaggerConfig)));
            // serviceCollection.BootstrapLogComponents(configuration);

            return serviceCollection;
        }
    }
}
