using Microsoft.AspNetCore.Mvc;
using ThAmCoCustomerApiGateway.Dtos;
using ThAmCoCustomerApiGateway.Services.Products;

namespace ThAmCoCustomerApiGateway.Controllers;

[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductsService _productsService;
    
    public ProductsController(IProductsService productsService)
    {
        _productsService = productsService;
    }
    
    [HttpGet("getProducts")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsAsync()
    {
        try
        {
            var products = await _productsService.GetProductsAsync();
            if (products.IsSuccessStatusCode)
            {
                return Ok(await products.Content.ReadFromJsonAsync<IEnumerable<ProductDto>>());
            }

            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}