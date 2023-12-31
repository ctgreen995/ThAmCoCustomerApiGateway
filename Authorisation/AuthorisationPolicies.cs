namespace ThAmCoCustomerApiGateway.Authorisation
{
    public record AuthorisationPolicies(List<PolicyRequirement> Policies)
    {
        public static readonly AuthorisationPolicies Default = new AuthorisationPolicies(
            new List<PolicyRequirement>
            {
                new("ReadAccount", new[] { "read:account" }),
                new("CreateAccount", new[] { "create:account" }),
                new("UpdateAccount", new[] { "update:account" }),
                new("RequestDeleteAccount", new[] { "requestDelete:account" }),
            });
    }

    public record PolicyRequirement(string PolicyName, string[] Permissions);
}