
namespace ThAmCoCustomerApiGateway.StartupConfigurations
{
    public static class CorsConfiguration
    {
        public static void AddCorsServices(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("DevPolicy", builder =>
                    builder.WithOrigins("https://localhost:5173", "https://thamcoapigatewaydev.azurewebsites.net")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            services.AddCors(options =>
            {
                options.AddPolicy("ProdPolicy", builder =>
                    builder.WithOrigins("https://ashy-island-06c50db03.4.azurestaticapps.net")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }
    }
}
