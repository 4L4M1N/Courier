using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Query;
using CourierAPI.Core.ReportFormat;

namespace CourierAPI.Core.Services
{
    public interface IBookingService
    {
         Task<List<BookingR>>  GetAllBookingDetails();
    }
}