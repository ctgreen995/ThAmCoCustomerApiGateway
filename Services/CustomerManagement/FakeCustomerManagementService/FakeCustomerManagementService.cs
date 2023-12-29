using System.Net;
using System.Text.Json;
using ThAmCoCustomerApiGateway.Dtos;

namespace ThAmCoCustomerApiGateway.Services.CustomerManagement.FakeCustomerManagementService;

public class FakeCustomerManagementService : ICustomerManagementService
{
    public async Task<HttpResponseMessage> GetCustomerDetailsAsync(string customerId)
    {
        var customerDto = new CustomerDto
        {
            AuthId = "657430c34032e76a256fe12c",
            CustomerProfileDto = new CustomerProfileDto
            {
                Name = "Gary",
                Address = "3 Gary Street",
                Town = "Garyville",
                County = "Garyshire",
                Postcode = "GA1 1GA",
                Email = "gary@gary.com",
                Phone = "01234567890"
            },
            CustomerAccountDto = new CustomerAccountDto
            {
                Funds = 150.00
            }
        };

        var json = JsonSerializer.Serialize(customerDto);

        var httpResponse = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(json)
        };

        return await Task.FromResult(httpResponse);
    }

    public async Task<HttpResponseMessage> CreateCustomerAsync(CustomerDto customerDto)
    {
        return await Task.FromResult(new HttpResponseMessage(HttpStatusCode.Created));
    }

    public async Task<HttpResponseMessage> UpdateCustomerAsync(CustomerDto customerDto)
    {
        return await Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK));
    }

    public async Task<HttpResponseMessage> RequestDeleteCustomerAsync(string customerId)
    {
        return await Task.FromResult(new HttpResponseMessage(HttpStatusCode.NoContent));
    }
}