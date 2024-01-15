using ThAmCoCustomerApiGateway.Authorisation;

namespace ThAmCoCustomerApiGateway.StartupConfigurations;

public static class AddAuthorisationConfiguration
{
    public static void AddAuthorisationServices(this IServiceCollection services)
    {
        services.AddAuthorization(options =>
        {
            foreach (var policy in AuthorisationPolicies.Default.Policies)
            {
                options.AddPolicy(policy.PolicyName, policyBuilder =>
                    policyBuilder.Requirements.Add(new HasPermissionRequirement(policy.Permissions)));
            }
        });
    }
}