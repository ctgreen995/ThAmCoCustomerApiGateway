namespace ThAmCoCustomerApiGateway.Dtos;

public class OrderDto
{
    public List<ProductDto> ProductDtos { get; set; }
    public CustomerDto CustomerDto { get; set; }
    public double OrderTotal { get; set; }
    public string OrderDate { get; set; }
    public string Status { get; set; }
}