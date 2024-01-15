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
        if (env.EnvironmentName == "Testing")
        {
            services.AddSingleton<ICustomerManagementService, FakeCustomerManagementService>();
            services.AddSingleton<IOrdersService, FakeOrdersService>();
            services.AddSingleton<IProductsService, FakeProductsService>();
        }
        else if (env.IsDevelopment())
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

            /*
             * The real catalogue and order services are not available in production environment for this project,
             * so we will use the fake services instead for demonstration purposes
             */
            //     services.AddHttpClient<IProductsService, ProductsService>(client =>
            //         {
            //             client.BaseAddress = new Uri(configuration["ProductsServiceBaseUrl"]);
            //         })
            //         .AddPolicyHandlerFromRegistry("retryPolicy")
            //         .AddPolicyHandlerFromRegistry("circuitBreakerPolicy")
            //         .AddHttpMessageHandler(handler => new Auth0TokenHandler(
            //             handler.GetRequiredService<IAuth0TokenService>(),
            //             configuration["Auth0CagClientId"], configuration["Auth0CagClientSecret"],
            //             configuration["Auth0CagAudience"]));

            //     services.AddHttpClient<IOrdersService, OrdersService>(client =>
            //         {
            //             client.BaseAddress = new Uri(configuration["OrdersServiceBaseUrl"]);
            //         })
            //         .AddPolicyHandlerFromRegistry("retryPolicy")
            //         .AddPolicyHandlerFromRegistry("circuitBreakerPolicy")
            //         .AddHttpMessageHandler(handler => new Auth0TokenHandler(
            //             handler.GetRequiredService<IAuth0TokenService>(),
            //             configuration["Auth0CagClientId"], configuration["Auth0CagClientSecret"],
            //             configuration["Auth0CagAudience"]));
            services.AddSingleton<IProductsService, FakeProductsService>();
            services.AddSingleton<IOrdersService, FakeOrdersService>();
        }
    }

    private static void AddPollyPolicies(IServiceCollection services, ILogger<Startup> logger)
    {
        var retryPolicy = HttpPolicyExtensions
            .HandleTransientHttpError()
            .WaitAndRetryAsync(50, retryAttempt => TimeSpan.FromSeconds(1),
                onRetry: (outcome, timespan, retryAttempt, context) =>
                {
                    logger.LogWarning($"Retrying {retryAttempt} time(s) due to {outcome.Exception?.Message}");
                });

        var circuitBreakerPolicy = HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(2, TimeSpan.FromSeconds(15),
                onBreak: (outcome, timespan) =>
                    logger.LogWarning($"Circuit breaker open for {timespan.TotalSeconds} seconds"),
                onReset: () => logger.LogInformation("Circuit breaker has reset"),
                onHalfOpen: () => logger.LogInformation("Circuit breaker is half-open"));


        var registry = services.AddPolicyRegistry();
        registry.Add("retryPolicy", retryPolicy);
        registry.Add("circuitBreakerPolicy", circuitBreakerPolicy);
    }
}