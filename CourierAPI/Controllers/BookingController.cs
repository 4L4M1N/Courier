using System;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourierAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        
        
        public BookingController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("test")]
        public async Task<IActionResult> GetBooking()
        {
            
            return Ok();
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(BookingDTO booking)
        {
            //Create Receiver
            var receiver = new Receiver
            {
                Id = Guid.NewGuid().ToString(),
                Name = booking.Name,
                Address = booking.Address,
                Phone = booking.Phone,
                Email = booking.Email,
                ZoneId = booking.ZoneId
            };
            await _unitOfWork.Receiver.Add(receiver);
            return Ok();
        }
    }
}