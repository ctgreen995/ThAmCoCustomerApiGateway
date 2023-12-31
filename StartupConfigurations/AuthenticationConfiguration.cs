using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace ThAmCoCustomerApiGateway.StartupConfigurations;

public static class AuthenticationConfiguration
{
    public static void AddAuthenticationServices(this IServiceCollection services, IConfiguration Configuration)
    {
        string authority = $"https://{Configuration["Auth0Authority"]}/";
        string audience = Configuration["Auth0CagAudience"];

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                    JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme =
                    JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = authority;
                options.Audience = audience;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = ClaimTypes.NameIdentifier,
                    RoleClaimType = "permissions"
                };
            });
    }
}