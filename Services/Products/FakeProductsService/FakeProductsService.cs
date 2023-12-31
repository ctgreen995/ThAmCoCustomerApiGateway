using System.Net;
using System.Text;
using Newtonsoft.Json;
using ThAmCoCustomerApiGateway.Dtos;

namespace ThAmCoCustomerApiGateway.Services.Products.FakeProductsService;

public class FakeProductsService : IProductsService
{
public async Task<HttpResponseMessage> GetProductsAsync()
    {
        var products = new List<ProductDto>
        {
            new ProductDto
            {
                Name = "Product 1",
                Description = "Product 1 Description",
                Price = 1900
            },
            new ProductDto
            {
                Name = "Product 2",
                Description = "Product 2 Description",
                Price = 2300
            },
            new ProductDto
            {
                Name = "Product 3",
                Description = "Product 3 Description",
                Price = 390
            }
        };

        return new HttpResponseMessage
        {
            StatusCode = HttpStatusCode.OK,
            Content = new StringContent(JsonConvert.SerializeObject(products), Encoding.UTF8, "application/json")
        };
    }
}