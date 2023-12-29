using System.Net;
using System.Text;
using Newtonsoft.Json;
using ThAmCoCustomerApiGateway.Dtos;

namespace ThAmCoCustomerApiGateway.Services.Orders.FakeOrdersService;

public class FakeOrdersService : IOrdersService
{
    public Task<HttpResponseMessage> GetOrdersByCustomerIdAsync(string customerId)
    {
        var orders = new List<OrderDto>
        {
            new()
            {
                ProductDtos = new List<ProductDto>
                {
                    new()
                    {
                        Name = "Product 1",
                        Description = "Product 1 Description",
                        Price = 1000
                    },
                    new()
                    {
                        Name = "Product 2",
                        Description = "Product 2 Description",
                        Price = 200
                    },
                    new()
                    {
                        Name = "Product 3",
                        Description = "Product 3 Description",
                        Price = 3000
                    }
                },
                CustomerDto = new CustomerDto
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
                },
                OrderDate = "2021-01-01",
                Status = "Processing"
            },
            new()
            {
                ProductDtos = new List<ProductDto>
                {
                    new()
                    {
                        Name = "Product 1",
                        Description = "Product 1 Description",
                        Price = 1000
                    },
                    new()
                    {
                        Name = "Product 2",
                        Description = "Product 2 Description",
                        Price = 200
                    },
                    new()
                    {
                        Name = "Product 3",
                        Description = "Product 3 Description",
                        Price = 3000
                    }
                },
                CustomerDto = new CustomerDto
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
                },
                OrderDate = "2023-03-03",
                Status = "Complete"
            }
        };

        return Task.FromResult(new HttpResponseMessage
        {
            StatusCode = HttpStatusCode.OK,
            Content = new StringContent(JsonConvert.SerializeObject(orders), Encoding.UTF8, "application/json")
        });
    }

    public Task<HttpResponseMessage> CreateOrderAsync(OrderDto order)
    {
        return Task.FromResult(new HttpResponseMessage(HttpStatusCode.Created));
    }
}