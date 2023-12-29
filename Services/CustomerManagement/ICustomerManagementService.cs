using ThAmCoCustomerApiGateway.Dtos;

namespace ThAmCoCustomerApiGateway.Services.CustomerManagement;

public interface ICustomerManagementService
{
    Task<HttpResponseMessage> GetCustomerDetailsAsync(string customerId);

    Task<HttpResponseMessage> CreateCustomerAsync(CustomerDto customer);
    Task<HttpResponseMessage> UpdateCustomerAsync(CustomerDto customer);
    Task<HttpResponseMessage> RequestDeleteCustomerAsync(string customerId);
}