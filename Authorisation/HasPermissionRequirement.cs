using Microsoft.AspNetCore.Authorization;

namespace ThAmCoCustomerApiGateway.Authorisation
{
    public class HasPermissionRequirement : IAuthorizationRequirement
    {
        
        public IEnumerable<string> ValidPermissions { get; }

        public HasPermissionRequirement(IEnumerable<string> validPermissions)
        {
            ValidPermissions = validPermissions;
        }
    }
}
