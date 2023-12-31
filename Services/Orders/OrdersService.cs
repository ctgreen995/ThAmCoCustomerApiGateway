using ThAmCoCustomerApiGateway.Dtos;

namespace ThAmCoCustomerApiGateway.Services.Orders;

public class OrdersService : IOrdersService
{
    public Task<HttpResponseMessage> GetOrdersByCustomerIdAsync(string customerId)
    {
        throw new NotImplementedException();
    }

    public Task<HttpResponseMessage> CreateOrderAsync(OrderDto order)
    {
        throw new NotImplementedException();
    }
}