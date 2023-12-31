using Microsoft.AspNetCore.Mvc;
using ThAmCoCustomerApiGateway.Dtos;
using ThAmCoCustomerApiGateway.Services.Orders;

namespace ThAmCoCustomerApiGateway.Controllers;

[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrdersService _ordersService;
    
    public OrdersController(IOrdersService ordersService)
    {
        _ordersService = ordersService;
    }
    
    [HttpGet("getOrdersByCustomerId/{customerId}")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByCustomerIdAsync(string customerId)
    {
        try
        {
            var orders = await _ordersService.GetOrdersByCustomerIdAsync(customerId);
            if (orders.IsSuccessStatusCode)
            {
                return Ok(await orders.Content.ReadFromJsonAsync<IEnumerable<OrderDto>>());
            }

            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost("createOrder")]
    public async Task<ActionResult<OrderDto>> CreateOrderAsync(OrderDto order)
    {
        try
        {
            var createOrder = await _ordersService.CreateOrderAsync(order);
            if (createOrder.IsSuccessStatusCode)
            {
                return Ok(await createOrder.Content.ReadFromJsonAsync<OrderDto>());
            }

            return BadRequest();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}