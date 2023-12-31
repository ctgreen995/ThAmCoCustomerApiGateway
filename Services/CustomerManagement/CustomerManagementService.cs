using Microsoft.Extensions.Caching.Memory;
using ThAmCoCustomerApiGateway.Dtos;

namespace ThAmCoCustomerApiGateway.Services.CustomerManagement
{
    public class CustomerManagementService : ICustomerManagementService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly ILogger<CustomerManagementService> _logger;

        public CustomerManagementService(HttpClient httpClient, IMemoryCache cache,
            ILogger<CustomerManagementService> logger)
        {
            _httpClient = httpClient;
            _cache = cache;
            _logger = logger;
        }

        public async Task<HttpResponseMessage> GetCustomerDetailsAsync(string customerId)
        {
            try
            {

                var cacheKey = $"CustomerDetails_{customerId}";
                var response = await _httpClient.GetAsync($"customer/getCustomerDetailsById/{customerId}");

                if (!response.IsSuccessStatusCode)
                {
                    return response;
                }

                var customerDto = await response.Content.ReadFromJsonAsync<CustomerDto>();
                if (customerDto != null)
                {
                    _cache.Set(cacheKey, customerDto, TimeSpan.FromMinutes(30));
                    
                    // These logs are for demonstrating caching is functioning
                    _logger.LogInformation("Cached customer details for customer {CustomerId}", customerId);
                }

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching details for customer {CustomerId}", customerId);
                throw;
            }
        }


        public async Task<HttpResponseMessage> CreateCustomerAsync(CustomerDto customerDto)
        {
            try
            {
                return await _httpClient.PostAsJsonAsync("customer/createCustomer", customerDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating customer {CustomerId}", customerDto.AuthId);
                throw;
            }

        }

        public async Task<HttpResponseMessage> UpdateCustomerAsync(CustomerDto customerDto)
        {
            try
            {
                var response =
                    await _httpClient.PutAsJsonAsync($"customer/updateCustomerById/{customerDto.AuthId}", customerDto);
                if (!response.IsSuccessStatusCode)
                {
                    return response;
                }

                var updatedCustomerDto = await response.Content.ReadFromJsonAsync<CustomerDto>();
                if (updatedCustomerDto != null)
                {
                    _cache.Set($"CustomerDetails_{customerDto.AuthId}", updatedCustomerDto, TimeSpan.FromMinutes(30));
                    _logger.LogInformation("Updated customer {CustomerId} in cache", customerDto.AuthId);
                }

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating customer {CustomerId}", customerDto.AuthId);
                throw;
            }
        }

        public async Task<HttpResponseMessage> RequestDeleteCustomerAsync(string customerId)
        {
            try
            {
                var response = await _httpClient.DeleteAsync($"customer/requestDeleteCustomer/{customerId}");
                if (response.IsSuccessStatusCode)
                {
                    _cache.Remove($"CustomerDetails_{customerId}");
                    _logger.LogInformation("Removed customer {CustomerId} from cache", customerId);
                }

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error requesting deletion of customer {CustomerId}", customerId);
                throw;
            }
        }
    }
}