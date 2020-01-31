using System;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Helpers;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourierAPI.Core.Services;

namespace CourierAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        private readonly IBookingService _bookingService;
        
        public BookingController(IUnitOfWork unitOfWork, DataContext context, IBookingService bookingService)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _bookingService = bookingService;
            
        }
        [HttpGet("test")]
        public async Task<IActionResult> GetBooking()
        {
            
            return Ok();
        }

        [HttpGet("getbookingserial/{merchantId}")]
        public async Task<IActionResult> GetBookingSerial(string merchantId)
        {
             var totalBooking = await _context.Bookings.CountAsync();
             var courierIdTemp = "0001"; //remove after 
             var showBookingSerial = Extensions.GenerateSerialForBooking(courierIdTemp,merchantId,totalBooking+1);
            
            return Ok(new {showBookingSerial = showBookingSerial});
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
            var totalBooking = _context.Bookings.Count();
            var courierIdTemp = "0001"; //remove after 
            var bookingSerialNo = Extensions.GenerateSerialForBooking(courierIdTemp,booking.MerchantIdentity,totalBooking+1);
            //Place Booking
            var placeBooking = new Booking
            {
                Id = Guid.NewGuid().ToString(),
                ReceiverId = receiverId,
                MerchantId = booking.MerchantId,
                BookingDate = DateTime.Now,
                TotalAmmount = booking.TotalAmount,
                Discount = booking.Discount,
                ItemPrice = booking.ItemPrice,
                SerialNo = bookingSerialNo,
                MerchantBill = booking.MerchantBill,
                CourierBill = booking.CourierBill,
                ReceiverBill = booking.ReceiverBill,
                ConditionCharge = booking.ConditionCharge
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

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBooking(string id)
        {
            var isBookingExists = await _unitOfWork.Bookings.FindBookingById(id);

            if(isBookingExists == null)
                return BadRequest("no booking is exist");

            await _unitOfWork.Bookings.Delete(isBookingExists.Id);

             var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest("dont save");
            return NoContent();
        }


        [HttpPost("assign")]
        public async Task<ActionResult> AssignDelivMan(AssignDelivManToBooking assign)
        {
            var isBookingExists = await _unitOfWork.Bookings.FindBookingById(assign.BookingId);
            var isDelivManExists = await _unitOfWork.DeliveryMan.FindByDeliveryManByIdAsync(assign.DelivManId);
            if(isBookingExists == null || isDelivManExists == null)
            {
                return BadRequest("Don't exists!");
            }
            var assignedDelivMan = new AssignedDelivMan
            {
                BookingId = assign.BookingId,
                DelivManId = assign.DelivManId
            };
            await _unitOfWork.AssignedDelivMan.Add(assignedDelivMan);
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return BadRequest("Assigned Failled!");
            return Ok();
        }
        //Show Booking Details
        [HttpGet("all")]
        public async Task<ActionResult> ShowBookingDetails()
        {
            var result = await _bookingService.GetAllBookingDetails();
            return Ok(result);
        }
    }
}