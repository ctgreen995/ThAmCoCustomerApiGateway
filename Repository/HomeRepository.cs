using Database.Data;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class HomeRepository : IHomeRepository
    {
        private readonly SmartMerchantDbContext _context;

        public HomeRepository(SmartMerchantDbContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetData()
        {
            return await _context.CostData.ToListAsync();
        }

    }
}
