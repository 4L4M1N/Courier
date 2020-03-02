using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.IServices;
using CourierAPI.Core.Models;
using CourierAPI.Core.ReportFormat;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Services
{
    public class BookingService : IBookingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        public BookingService(IUnitOfWork unitOfWork, DataContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
        public async Task<List<BookingR>> GetAllBookingDetails()
        {
            var result = await _context.ShowBookings.FromSqlRaw("exec Booking").ToListAsync();
            return result;
        }

        public async Task<List<BookingDetailsReport>> GetBookingDetailsForReport(DateTime From, DateTime To)
        {
            var result = await _context.ShowBookingDetailsReport.FromSqlRaw("exec BookingDetails {0}, {1}",From, To).ToListAsync();
            return result;
        }

        public async Task<Booking> SearchBookingBySerialNo(string SerialNo)
        {
            var result = await _unitOfWork.Bookings.FindBookingBySerialNo(SerialNo);
            if(result!=null)
            {
                result.Merchant.PasswordHash = null;
                result.Merchant.PasswordSalt = null;
            }
            return result;
        }

        public async Task<bool> Update(BookingDTO booking)
        {
            var isBookingExists = await _unitOfWork.Bookings.FindBookingById(booking.BookingId);
            if(isBookingExists == null)
            {
                return false;
            }
            isBookingExists.ItemPrice = booking.ItemPrice;
            isBookingExists.MerchantBill = booking.MerchantBill;
            isBookingExists.CourierBill = booking.CourierBill;
            isBookingExists.TotalAmmount = booking.TotalAmount;
            isBookingExists.ItemPrice = booking.ItemPrice;
            isBookingExists.ItemPrice = booking.ItemPrice;
            isBookingExists.ConditionCharge = booking.ConditionCharge;
            isBookingExists.TotalAmmount = booking.TotalAmount;
            await _unitOfWork.CompleteAsync();
            // var receiver = await _unitOfWork.Receivers.GetReciverById(booking.ReceiverId);
            // receiver.ZoneId = booking.ZoneId;
            
            // receiver.Name = booking.ReceiverName;
            var bookingItem = await _unitOfWork.BookingItems.FindBookingItemById(booking.BookingId);

            bookingItem.IsConditionChargeApply = booking.IsConditionCharge;
            bookingItem.IsInCity = booking.IsInCity;
            bookingItem.IsOutCity = booking.IsOutCity;
            bookingItem.ItemAttributeId = booking.ItemAttributeId;
            await _unitOfWork.CompleteAsync();
            return true;
        }
    }
}