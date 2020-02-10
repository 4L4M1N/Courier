using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class StatusRepository : IStatusRepository
    {
        private readonly DataContext _context;
        public StatusRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Status>> GetAllStatus()
        {
            var status = await _context.Statuses.ToListAsync();
            return status;
        }
    }
}