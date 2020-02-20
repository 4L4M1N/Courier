using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
            return result;
        }
    }
}