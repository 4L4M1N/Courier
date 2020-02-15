using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Models;
using CourierAPI.Core.ReportFormat;

namespace CourierAPI.Core.IServices
{
    public interface IBookingService
    {
         Task<List<BookingR>>  GetAllBookingDetails();

         Task<List<BookingDetailsReport>> GetBookingDetailsForReport(DateTime From, DateTime To);
         Task<Booking> SearchBookingBySerialNo(string SerialNo);
    }
}