namespace ThAmCoCustomerApiGateway.Services.Products;

public class ProductsService : IProductsService
{
    private readonly HttpClient _httpClient;
    
    public ProductsService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    public async Task<HttpResponseMessage> GetProductsAsync()
    {
        return await _httpClient.GetAsync("products/getProducts");
    }
}