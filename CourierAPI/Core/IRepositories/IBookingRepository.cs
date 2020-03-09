using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IBookingRepository
    {
         Task Add(Booking booking);
         Task<Booking> FindBookingById(string bookingId);
         Task<Booking> FindBookingBySerialNo(string bookingSerialNo);
         Task Delete(string bookingId);
    }
}