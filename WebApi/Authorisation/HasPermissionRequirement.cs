using Microsoft.AspNetCore.Authorization;

namespace WebApi.Authorisation
{
    public class HasPermissionRequirement : IAuthorizationRequirement
    {
        public string ValidPermission { get; } = "access:dashboard";
    }
}
