using Polly;
using Polly.Extensions.Http;
using ThAmCoCustomerApiGateway.Services.Auth0Token;
using ThAmCoCustomerApiGateway.Services.CustomerManagement;
using ThAmCoCustomerApiGateway.Services.CustomerManagement.FakeCustomerManagementService;
using ThAmCoCustomerApiGateway.Services.Orders;
using ThAmCoCustomerApiGateway.Services.Orders.FakeOrdersService;
using ThAmCoCustomerApiGateway.Services.Products;
using ThAmCoCustomerApiGateway.Services.Products.FakeProductsService;

namespace ThAmCoCustomerApiGateway.StartupConfigurations;

public static class HttpServiceConfiguration
{
    public static void AddHttpServices(this IServiceCollection services, IConfiguration configuration,
        IWebHostEnvironment env, ILogger<Startup> logger)
    {
        if (env.IsDevelopment())
        {
            services.AddSingleton<ICustomerManagementService, FakeCustomerManagementService>();
            services.AddSingleton<IOrdersService, FakeOrdersService>();
            services.AddSingleton<IProductsService, FakeProductsService>();
        }
        else
        {
            services.AddMemoryCache();
            AddPollyPolicies(services, logger);
            services.AddHttpClient<ICustomerManagementService, CustomerManagementService>(client =>
                {
                    client.BaseAddress = new Uri(configuration["CustomerManagementServiceBaseUrl"]);
                })
                .AddPolicyHandlerFromRegistry("retryPolicy")
                .AddPolicyHandlerFromRegistry("circuitBreakerPolicy")
                .AddHttpMessageHandler(handler => new Auth0TokenHandler(
                    handler.GetRequiredService<IAuth0TokenService>(),
                    configuration["Auth0CmsClientId"], configuration["Auth0CmsClientSecret"],
                    configuration["Auth0CmsAudience"]));

       
            services.AddSingleton<IProductsService, FakeProductsService>();
            services.AddSingleton<IOrdersService, FakeOrdersService>();
        }
    }

    public static void AddPollyPolicies(IServiceCollection services, ILogger<Startup> logger)
    {
        var retryPolicy = HttpPolicyExtensions
            .HandleTransientHttpError()
            .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                onRetry: (outcome, timespan, retryAttempt, context) =>
                {
                    logger.LogWarning($"Retrying {retryAttempt} time(s) due to {outcome.Exception?.Message}");
                });

        var circuitBreakerPolicy = HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(5, TimeSpan.FromMinutes(1),
                onBreak: (outcome, timespan) =>
                    logger.LogWarning($"Circuit breaker open for {timespan.TotalMinutes} minutes"),
                onReset: () => logger.LogInformation("Circuit breaker has reset"),
                onHalfOpen: () => logger.LogInformation("Circuit breaker is half-open"));


        var registry = services.AddPolicyRegistry();
        registry.Add("retryPolicy", retryPolicy);
        registry.Add("circuitBreakerPolicy", circuitBreakerPolicy);
    }
}