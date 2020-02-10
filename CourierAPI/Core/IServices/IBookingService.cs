using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.ReportFormat;

namespace CourierAPI.Core.IServices
{
    public interface IBookingService
    {
         Task<List<BookingR>>  GetAllBookingDetails();
    }
}