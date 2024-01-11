namespace ThAmCoCustomerApiGateway.StartupConfigurations
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<Startup> _logger;

        public Startup(IConfiguration configuration, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            Configuration = configuration;
            _env = env;
            _logger = logger;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCorsServices();
            services.AddSingleton(Configuration);
            services.AddAuthenticationServices(Configuration);
            services.AddAuthorisationServices();
            services.AddServicedependencies();
            services.AddHttpServices(Configuration, _env, _logger);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors("DevPolicy");
            }
            else
            {
                app.UseCors("ProdPolicy");
                app.UseHsts();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}