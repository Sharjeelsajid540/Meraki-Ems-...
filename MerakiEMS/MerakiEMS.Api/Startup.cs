using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MerakiEMS.Api.Extension;
using MerakiEMS.Application.Common.Configuration;
using MerakiEMS.Application.Common.Constants;
using System.Text;

namespace MerakiEMS.Api
{
  

            public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            configuration.Bind(AppSettings.Configuration);

        }

        private IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = Configuration["JWT:Issuer"],
        ValidAudience = Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"])),
        ClockSkew = TimeSpan.Zero,
        RequireExpirationTime = true,
        //LifetimeValidator = (notBefore, expires, token, parameters) =>
        //{
        //    return expires >= DateTime.Now.AddMinutes(1);
        //}
    };
});
            services.RegisterServices(Configuration);
           services.AddSwaggerGen();
           
        }
    
       
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
          
            app.ConfigureRequestPipeline();
            app.UseCors(ApiConstants.CorsPolicy);

            app.UseHttpsRedirection();
            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyHeader();
                options.AllowAnyMethod();
            });
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();



        }
    }
}


