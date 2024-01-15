using System.Net;
using System.Text;
using System.Text.Json;
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
                var formattedId = customerId.Substring(6);
                var cacheKey = $"CustomerDetails_{formattedId}";

                // Check if the data is in the cache
                if (_cache.TryGetValue(cacheKey, out CustomerDto cachedCustomer))
                {
                    _logger.LogInformation("Retrieved customer details for customer {CustomerId} from cache", customerId);
                    return new HttpResponseMessage
                    {
                        StatusCode = HttpStatusCode.OK,
                        Content = new StringContent(JsonSerializer.Serialize(cachedCustomer)),
                    };
                }

                // Not in cache so fetch from the service
                var response = await _httpClient.GetAsync($"customer/getCustomerDetailsById/{customerId}");

                if (!response.IsSuccessStatusCode)
                {
                    return response;
                }

                var customerDto = await response.Content.ReadFromJsonAsync<CustomerDto>();
                if (customerDto != null)
                {
                    // Add to cache
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
                var jsonContent = new StringContent(JsonSerializer.Serialize(customerDto), Encoding.UTF8, "application/json");

                var request = new HttpRequestMessage(new HttpMethod("PATCH"),
                    $"customer/updateCustomerById/{customerDto.AuthId}")
                {
                    Content = jsonContent
                };

                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    return response;
                }

                // Define the caching entry options
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSize(1)
                    .SetSlidingExpiration(TimeSpan.FromMinutes(30));

                // Update the cache
                _cache.Set($"CustomerDetails_{customerDto.AuthId}", customerDto, cacheEntryOptions);
                _logger.LogInformation("Updated customer {CustomerId} in cache", customerDto.AuthId);

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