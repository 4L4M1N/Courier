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

        public async Task<Status> GetStatusById(int statusId)
        {
            var status = await _context.Statuses.FirstOrDefaultAsync(x=>x.Id==statusId);
            return status;
        }
    }
}