﻿using Microsoft.AspNetCore.Authorization;

namespace WebApp.Authorisation
{
    public class HasPermissionHandler : AuthorizationHandler<HasPermissionRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasPermissionRequirement requirement)
        {
            var permission = context.User?.Claims?.FirstOrDefault(c => c.Type == "permissions" && c.Value == requirement.ValidPermission);

            if (permission != null)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
