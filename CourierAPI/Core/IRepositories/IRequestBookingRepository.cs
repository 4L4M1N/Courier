using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IRequestBookingRepository
    {
         Task Add(RequestBooking requestBooking);
         Task <RequestBooking> FindRequestBookingByPhone(string phoneNo);
         Task <IEnumerable<RequestBooking>> GetAllRequestedBookings();
    }
}