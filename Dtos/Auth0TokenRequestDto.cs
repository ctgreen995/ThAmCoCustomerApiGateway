namespace ThAmCoCustomerApiGateway.Dtos;

public class Auth0TokenRequestDto
{
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string Audience { get; set; }
    public string GrantType { get; set; }
}