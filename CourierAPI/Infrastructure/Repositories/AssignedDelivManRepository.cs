using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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

        public async Task Delete(string BookingId)
        {
            var findAssignedDelivMan = await _context.AssignedDelivMen.FirstOrDefaultAsync(x=>x.BookingId == BookingId);
            _context.AssignedDelivMen.Remove(findAssignedDelivMan);
        }

        public async Task<AssignedDelivMan> FindAssignedBookingById(string bookingId)
        {
            var result = await _context.AssignedDelivMen.FirstOrDefaultAsync(x=>x.BookingId == bookingId);
            return result;
        }
    }
}