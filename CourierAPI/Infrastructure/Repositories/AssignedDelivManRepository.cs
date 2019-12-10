using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;

namespace CourierAPI.Infrastructure.Repositories
{
    public class AssignedDelivManRepository : IAssignedDelivManRepository
    {
        private readonly DataContext _context;
        public AssignedDelivManRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Add(AssignedDelivMan assignedDelivMan)
        {
            await _context.AssignedDelivMen.AddAsync(assignedDelivMan);
        }
    }
}