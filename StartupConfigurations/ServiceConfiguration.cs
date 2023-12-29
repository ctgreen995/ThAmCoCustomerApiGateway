using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using ThAmCoCustomerApiGateway.Authorisation;
using ThAmCoCustomerApiGateway.Services.Auth0Token;
using WebApi.Profiles;

namespace ThAmCoCustomerApiGateway.StartupConfigurations;

public static class ServiceConfiguration
{
    public static void AddServicedependencies(this IServiceCollection services)
    {
 
        var mapperConfig = new MapperConfiguration(m => { m.AddProfile(new MapperProfile()); });
        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        services.AddControllers();


        services.AddSingleton<IAuthorizationHandler, HasPermissionHandler>();

        services.AddSingleton<IAuth0TokenService, Auth0TokenService>();
    }
}