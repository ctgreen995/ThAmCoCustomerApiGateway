using ThAmCoCustomerApiGateway.Dtos;

namespace ThAmCoCustomerApiGateway.Services.Orders;

public interface IOrdersService
{
    Task<HttpResponseMessage> GetOrdersByCustomerIdAsync(string customerId);
    Task<HttpResponseMessage> CreateOrderAsync(OrderDto order);
}