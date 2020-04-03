using System;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Helpers;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.IServices;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Extensions = CourierAPI.Helpers.Extensions;
using Microsoft.Extensions.Logging;
using System.Data;
using Dapper;
using CourierAPI.Core.ReportFormat;

namespace CourierAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        private readonly IBookingService _bookingService;
        private readonly IStatusService _statusService;
        public readonly IMerchantService _merchantService;
        public readonly IReceiverService _receiverService;
        public readonly ILogger _logger;
        
        public BookingController(IUnitOfWork unitOfWork, DataContext context, 
                                IBookingService bookingService, IStatusService statusService,
                                IMerchantService merchantService, IReceiverService receiverService,
                                ILogger<BookingController> logger)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _bookingService = bookingService;
            _statusService = statusService;
            _merchantService = merchantService;
            _receiverService = receiverService;
            _logger = logger;
        }
        [HttpGet("test")]
        public async Task<IActionResult> GetBooking()
        {
            _logger.LogInformation("Hello logger successed");
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
            placeBooking.Status = "Pending";
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
        [HttpPut("update")]
        public async Task<IActionResult> Update(JObject data)
        {
            dynamic jsondata = data;
            JObject receiverJson = jsondata.receiver;
            JObject bookingJson = jsondata.booking;
            var receiver = receiverJson.ToObject<Receiver>();
            // Update Receiver
            var isUpdateReceiver = await _receiverService.Update(receiver);
            var booking = bookingJson.ToObject<BookingDTO>();
            var isUpdateBooking = await _bookingService.Update(booking);
            if(isUpdateBooking && isUpdateReceiver)
            {
                return Ok(receiver);
            }
            return BadRequest("NotUpdated");
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBooking(string id)
        {
            var isBookingExists = await _unitOfWork.Bookings.FindBookingById(id);

            if(isBookingExists == null)
                return BadRequest("no booking is exist");

            var result = await _bookingService.Delete(isBookingExists.Id);
            if(result) {
                string message = "deleted";
                return Ok(message);
                }
            return BadRequest("Booking dont delete");
        }


        [HttpPost("assign")]
        public async Task<ActionResult> AssignDelivMan(AssignDelivManToBooking assign)
        {
            var isBookingExists = await _unitOfWork.Bookings.FindBookingById(assign.BookingId);
            var isDelivManExists = await _unitOfWork.DeliveryMan.FindByDeliveryManByIdAsync(assign.DelivManId); //Delivery-Man Identity
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
        [HttpPost("setbookingstatus")]
        public async Task<ActionResult> SetStatusOfBooking(BookingStatusSetDTO assign)
        {   
            var result = await _statusService.SetStatusOfBooking(assign.BookingId, assign.SelectedStatusId);
            if(result == false)
            {
                return BadRequest("Assigned Failled!");
            }
            // await _unitOfWork.AssignedDelivMan.Add(assignedDelivMan);
            // var result = await _unitOfWork.CompleteAsync();
            // if(result == 0) return BadRequest("Assigned Failled!");
            return Ok();
        }
         [HttpGet("search")]
        public async Task<ActionResult> SearchBooking([FromQuery]string SerialNo)
        {
            var booking = await _bookingService.SearchBookingBySerialNo(SerialNo);
            if(booking == null)
            {
                return BadRequest("No booking found");
            }
            var bookingItem = await _context.BookingItems.FirstOrDefaultAsync(x=>x.BookingId == booking.Id);
            var itemAttribute = await _context.ItemAttributes.Include(i=>i.Item).FirstOrDefaultAsync(x=>x.ItemAttributeId == bookingItem.ItemAttributeId);
            
            booking.BookingItem = bookingItem;
            booking.Item = itemAttribute.Item;
            return Ok(booking);
        }
        //show from to date report
        [HttpGet("datewisereport")]
        //DateTime from, DateTime to
        public async Task<ActionResult> ShowReportDateWise([FromQuery]DateTime FromDate, DateTime ToDate)
        {
            
            var result = await _bookingService.GetBookingDetailsForReport(FromDate,ToDate);
            return Ok(result);
        }
    }
}