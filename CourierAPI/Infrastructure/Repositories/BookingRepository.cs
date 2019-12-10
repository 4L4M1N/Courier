using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly DataContext _context;

        public BookingRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Add(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
        }

        public async Task<Booking> FindBookingById(string bookingId)
        {
            var result = await _context.Bookings.Where(b =>b.Id == bookingId).FirstOrDefaultAsync();
            return result;
        }
    }
}