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
            //Save Receiver
            var receiver = new Receiver
            {
                Id = Guid.NewGuid().ToString(),
                Name = booking.Name,
                Address = booking.Address,
                Phone = booking.Phone,
                Email = booking.Email,
                ZoneId = booking.ZoneId
            };
            await _unitOfWork.Receivers.Add(receiver);
            //get receiverId
            var receiverId = receiver.Id;
            
            //Place Booking
            var placeBooking = new Booking
            {
                Id = Guid.NewGuid().ToString(),
                ReceiverId = receiverId,
                MerchantId = booking.MerchantId,
                BookingDate = DateTime.Now
            };
            var bookingId = placeBooking.Id;
            await _unitOfWork.Bookings.Add(placeBooking);

            //Save BookingItems
            booking.ItemAttributesId.ForEach(async (itemattribute) => {
                var saveBookingItem = new BookingItem
                {
                    ItemAttributeId = itemattribute,
                    BookingId = bookingId
                };
                await _unitOfWork.BookingItems.Add(saveBookingItem);
            });
            var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest("error occured");
            return Ok();
        }
    }
}