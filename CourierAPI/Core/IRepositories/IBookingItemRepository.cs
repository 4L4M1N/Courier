using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IBookingItemRepository
    {
         Task Add(BookingItem bookingItem);
         Task Delete(string bookingId);
         Task<BookingItem> FindBookingItemById(string bookingId);
    }
}