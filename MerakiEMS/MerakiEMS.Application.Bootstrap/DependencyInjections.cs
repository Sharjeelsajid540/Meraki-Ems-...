
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Application.Services;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.Extensibility.PerfCounterCollector.QuickPulse;
using Microsoft.ApplicationInsights;


namespace MerakiEMS.Application.Bootstrap
{
    public static class DependencyInjections
    {
          
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            AddAppServices(services);
            return services;
        }
        private static void AddAppServices(IServiceCollection services)
        {
            services.AddTransient<IUserAuthenticateService, UserAuthenticateService>();
            services.AddTransient<ILeavesService, LeavesService>();
            services.AddTransient<IAttendanceService, AttendanceService>();
            services.AddTransient<IPerformanceService, PerformanceService>();
            services.AddTransient<ITicketsService, TicketsService>();
            services.AddTransient<IAdminService, AdminService>();
           
            //services.AddTransient<IPostsService, PostsService>();
            //services.AddTransient<IProductService, ProductService>();
            //services.AddTransient<IOrderService, OrderService>();



        }
        public static void BootstrapLogComponents(this IServiceCollection serviceCollection, IConfiguration configuration)
        {

            var AppInsightsConnectionString = configuration.GetConnectionString("AppInsightConnectionString");
            // register ILogger
            serviceCollection.AddLogging();

            // register Telemetry client
            var telemetryConfiguration = TelemetryConfiguration.CreateDefault();
            telemetryConfiguration.ConnectionString = AppInsightsConnectionString;

            QuickPulseTelemetryProcessor quickPulseProcessor = null;
            telemetryConfiguration.DefaultTelemetrySink.TelemetryProcessorChainBuilder
                .Use((next) =>
                {
                    quickPulseProcessor = new QuickPulseTelemetryProcessor(next);
                    return quickPulseProcessor;
                })
                .Build();

            var quickPulseModule = new QuickPulseTelemetryModule();

            quickPulseModule.Initialize(telemetryConfiguration);
            quickPulseModule.RegisterTelemetryProcessor(quickPulseProcessor);
            var telemetryClient = new TelemetryClient(telemetryConfiguration);
            serviceCollection.AddSingleton(telemetryClient);
        }

    } }
