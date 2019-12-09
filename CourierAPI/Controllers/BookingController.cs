using System;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        
        
        public BookingController(IUnitOfWork unitOfWork, DataContext context)
        {
            _context = context;
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
                Name = booking.ReceiverName,
                Address = booking.ReceiverAddress,
                Phone = booking.ReceiverPhone,
                Email = booking.ReceiverEmail,
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
                BookingDate = DateTime.Now,
                TotalAmmount = booking.TotalAmount,
                Discount = booking.Discount,

            };
            var bookingId = placeBooking.Id;
            await _unitOfWork.Bookings.Add(placeBooking);

            //Save BookingItems
            var bookingItem = new BookingItem 
            {
                BookingId = bookingId,
                ItemAttributeId = booking.ItemAttributeId,
                IsInCity = booking.IsInCity,
                IsOutCity = booking.IsOutCity,
                IsConditionChargeApply = booking.IsConditionCharge
            };
            await _unitOfWork.BookingItems.Add(bookingItem);
            var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest("error occured");
            return Ok();
        }
        //Show Booking Details
        [HttpGet("allBookings")]
        public async Task<ActionResult> ShowBookingDetails()
        {
            var result = await _context.ShowBookings.FromSqlRaw("exec Booking").ToListAsync();
            return Ok(result);
        }
    }
}