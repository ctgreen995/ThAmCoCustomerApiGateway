using Microsoft.AspNetCore.Authorization;

namespace WebApp.Authorisation
{
    public class HasPermissionRequirement : IAuthorizationRequirement
    {
        public string ValidPermission { get; } = "access:dashboard";
    }
}
