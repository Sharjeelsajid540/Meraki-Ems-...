using MerakiEMS.Api.Middleware;
using MerakiEMS.Application.Common.Constants;

namespace MerakiEMS.Api.Extension
{
    public static class MiddlewareExtension
    {
        public static IApplicationBuilder ConfigureRequestPipeline(this IApplicationBuilder app)
        {
            app.UseResponseCompression();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyHeader();
                options.AllowAnyMethod();
            });
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(ApiConstants.CorsPolicy);
            app.UseSwagger();
            app.UseSwaggerUI();
           
            // Execute only request is sent to api methods.

            app.UseWhen(context => context.Request.Path.StartsWithSegments(ApiConstants.Api),
                appBuilder =>
                {
                    appBuilder.UseMiddleware<RequestLoggingMiddleware>();
                    
                });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            return app;
        }
    }
}
