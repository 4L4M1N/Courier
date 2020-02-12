using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.IServices;
using Microsoft.AspNetCore.Mvc;

namespace CourierAPI.Infrastructure.Services
{
    public class StatusService : IStatusService
    {
         private readonly IUnitOfWork _unitOfWork;
         public StatusService(IUnitOfWork unitOfWork)
         {
             _unitOfWork = unitOfWork;
         }
        public async Task<bool> SetStatusOfBooking(string bookingId, int statusId)
        {
            var isBookingExists = await _unitOfWork.Bookings.FindBookingById(bookingId);
            if(isBookingExists == null)
            {
                return false;
            }
            var status = await _unitOfWork.Status.GetStatusById(statusId);
            var statusName = status.Name;
            isBookingExists.Status = statusName;
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return false;
            return true;
        }
    }
}