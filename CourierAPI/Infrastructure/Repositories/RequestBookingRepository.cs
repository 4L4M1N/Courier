using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class RequestBookingRepository : IRequestBookingRepository
    {
        private readonly DataContext _context;
        public RequestBookingRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Add(RequestBooking requestBooking)
        {
            await _context.RequestBookings.AddAsync(requestBooking);
        }

        public async Task<RequestBooking> FindRequestBookingByPhone(string phoneNo)
        {
            var result = await _context.RequestBookings.Where(rb => rb.Phone == phoneNo).FirstOrDefaultAsync();
            return result;
        }

        public async Task<IEnumerable<RequestBooking>> GetAllRequestedBookings()
        {
            var requestedBookings = await _context.RequestBookings.ToListAsync();
            return requestedBookings;
        }
    }
}