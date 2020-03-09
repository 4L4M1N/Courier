using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CourierAPI.Core.IServices
{
    public interface IStatusService
    {
         Task<bool> SetStatusOfBooking(string bookingId, int status);
    }
}