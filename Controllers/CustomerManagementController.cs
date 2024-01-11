using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThAmCoCustomerApiGateway.Dtos;
using ThAmCoCustomerApiGateway.Services.CustomerManagement;

namespace ThAmCoCustomerApiGateway.Controllers;

[Authorize]
[Route("[controller]")]
public class CustomerManagementController : ControllerBase
{
    private readonly ICustomerManagementService _customerManagementService;

    public CustomerManagementController(ICustomerManagementService customerManagementService)
    {
        _customerManagementService = customerManagementService;
    }

    [HttpGet("getCustomerDetailsById/{customerId}")]
    public async Task<ActionResult<CustomerDto>> GetCustomerDetailsAsync(string customerId)
    {
        try
        {
            var customerDetails = await _customerManagementService.GetCustomerDetailsAsync(customerId);
            if (customerDetails.IsSuccessStatusCode)
            {
                if (customerDetails.Content != null)
                {
                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };
                    var contentString = await customerDetails.Content.ReadAsStringAsync();
                    var content = JsonSerializer.Deserialize<CustomerDto>(contentString, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                    return Ok(content);
                }
                return NotFound();
            }

            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("createCustomer")]
    public async Task<ActionResult<CustomerDto>> CreateCustomerAsync([FromBody] CustomerDto customer)
    {
        try
        {
            var createCustomer = await _customerManagementService.CreateCustomerAsync(customer);
            if (createCustomer.IsSuccessStatusCode)
            {
                if (createCustomer.Content != null)
                {
                    var contentString = await createCustomer.Content.ReadAsStringAsync();
                    var content = JsonSerializer.Deserialize<CustomerDto>(contentString, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                    return Ok(content);
                }
                return NotFound();
            }

            return BadRequest();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch("updateCustomerById/{customerId}")]
    public async Task<ActionResult<CustomerDto>> UpdateCustomerAsync([FromBody] CustomerDto customer)
    {
        try
        {
            var updateCustomer = await _customerManagementService.UpdateCustomerAsync(customer);
            if (updateCustomer.IsSuccessStatusCode)
            {
                if (updateCustomer.Content != null)
                {
                    return Ok();
                }
                return NotFound();
            }

            return BadRequest();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("requestDeleteCustomer/{customerId}")]
    public async Task<ActionResult<CustomerDto>> RequestDeleteCustomerAsync(string customerId)
    {
        try
        {
            var deleteCustomer = await _customerManagementService.RequestDeleteCustomerAsync(customerId);
            if (deleteCustomer.IsSuccessStatusCode)
            {
                return Ok();
            }

            return BadRequest();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}