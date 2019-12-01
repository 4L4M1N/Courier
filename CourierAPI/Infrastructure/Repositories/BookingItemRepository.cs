using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;

namespace CourierAPI.Infrastructure.Repositories
{
    public class BookingItemRepository : IBookingItemRepository
    {
        private readonly DataContext _context;
        public BookingItemRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Add(BookingItem bookingItem)
        {
            await _context.BookingItems.AddAsync(bookingItem);
        }
    }
}