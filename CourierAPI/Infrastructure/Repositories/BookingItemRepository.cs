using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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

        public async Task Delete(string bookingId)
        {
            var findBookingItem = await _context.BookingItems.FirstOrDefaultAsync(x=>x.BookingId==bookingId);
            _context.BookingItems.Remove(findBookingItem);
        }

        public async Task<BookingItem> FindBookingItemById(string bookingId)
        {
            var result = await _context.BookingItems.FirstOrDefaultAsync(x=>x.BookingId == bookingId);
            return result;
        }
    }
}