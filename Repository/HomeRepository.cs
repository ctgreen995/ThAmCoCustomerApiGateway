using Database.Data;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class HomeRepository : IHomeRepository
    {
        private readonly CustomerDbContext _context;

        public HomeRepository(CustomerDbContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetData()
        {
            return await _context.CostData.ToListAsync();
        }

    }
}
