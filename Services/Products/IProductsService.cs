namespace ThAmCoCustomerApiGateway.Services.Products;

public interface IProductsService
{
    Task<HttpResponseMessage> GetProductsAsync();
}