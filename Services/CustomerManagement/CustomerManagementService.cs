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
                _logger.LogInformation("Fetching details for customer {CustomerId}", customerId);

                var cacheKey = $"CustomerDetails_{customerId}";
                return await _cache.GetOrCreateAsync(cacheKey, async entry =>
                {
                    _logger.LogInformation("Cached customer details for customer {CustomerId}", customerId);
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30);
                    return await _httpClient.GetAsync($"customer/getCustomerDetailsById/{customerId}");
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching details for customer {CustomerId}", customerId);
                throw;
            }
        }

        public async Task<HttpResponseMessage> CreateCustomerAsync(CustomerDto customerDto)
        {
            return await _httpClient.PostAsJsonAsync("customer/createCustomer", customerDto);
        }

        public async Task<HttpResponseMessage> UpdateCustomerAsync(CustomerDto customerDto)
        {
            try
            {
                _logger.LogInformation("Updating customer {CustomerId}", customerDto.AuthId);
                var updatedCustomer =
                    await _httpClient.PutAsJsonAsync($"customer/updateCustomerById/{customerDto.AuthId}", customerDto);
                if (updatedCustomer.IsSuccessStatusCode)
                {
                    updatedCustomer.Content.ReadFromJsonAsync<CustomerDto>();
                    _cache.Set($"CustomerDetails_{customerDto.AuthId}", updatedCustomer, TimeSpan.FromMinutes(30));
                    _logger.LogInformation("Updated customer {CustomerId} in cache", customerDto.AuthId);
                }

                return updatedCustomer;
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
                _logger.LogInformation("Requesting deletion of customer {CustomerId}", customerId);
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