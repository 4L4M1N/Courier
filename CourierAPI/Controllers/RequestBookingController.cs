using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestBookingController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        public RequestBookingController(DataContext context, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
        [HttpPost("add")]
         public async Task<IActionResult> Add(RequestBooking booking)
         {
             var isExistsRequest = await _unitOfWork.RequestBooking.FindRequestBookingByPhone(booking.Phone);
             if(isExistsRequest != null)
             {
                 return BadRequest("Your request is pendingn or limit end");
             }
             booking.IsRead = false;
             booking.IsRead = false;
             await _unitOfWork.RequestBooking.Add(booking);
             var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest();

            return Ok();
             
         }
         [HttpGet("all")]
         public async Task<IActionResult> GetRequestedBookings()
         {
             var requestedBookings = await _unitOfWork.RequestBooking.GetAllRequestedBookings();
             return Ok(requestedBookings);
         }
    }
}