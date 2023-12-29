using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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
                return Ok(await customerDetails.Content.ReadFromJsonAsync<CustomerDto>());
            }

            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("createCustomer")]
    public async Task<ActionResult<CustomerDto>> CreateCustomerAsync(CustomerDto customer)
    {
        try
        {
            var createCustomer = await _customerManagementService.CreateCustomerAsync(customer);
            if (createCustomer.IsSuccessStatusCode)
            {
                return Ok(await createCustomer.Content.ReadFromJsonAsync<CustomerDto>());
            }

            return BadRequest();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch("updateCustomer/{customerId}")]
    public async Task<ActionResult<CustomerDto>> UpdateCustomerAsync(string customerId, CustomerDto customer)
    {
        try
        {
            var updateCustomer = await _customerManagementService.UpdateCustomerAsync(customer);
            if (updateCustomer.IsSuccessStatusCode)
            {
                return Ok(await updateCustomer.Content.ReadFromJsonAsync<CustomerDto>());
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
                return Ok(await deleteCustomer.Content.ReadFromJsonAsync<CustomerDto>());
            }

            return BadRequest();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}