﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using MerakiEMS.Infrastructure.Persistence.Sql.Repositories;


namespace MerakiEMS.Infrastructure.Bootstrap
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
           /* services.AddDbContext<UsersContext>(options => options.UseSqlServer(configuration.GetConnectionString("MerakiEMSDb")));*/
           
            services.AddDbContext<UserContext>(options => options.UseSqlServer(configuration.GetConnectionString("MerakiEMSDb")));

            //services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<IAdminRepository, AdminRepository>();
            services.AddTransient<ILeavesRepository, LeavesRepository>();
            services.AddTransient<IAttendanceRepository, AttendanceRepository>();
            services.AddTransient<IPerformanceRepository, PerformanceRepository>();
            services.AddTransient<ITicketsRepository, TicketsRepository>();
            //services.AddTransient<IOrderRepository, OrderRepository>();




            return services;
        }
    }
}
