using System;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.IServices;
using CourierAPI.Core.Models;

namespace CourierAPI.Infrastructure.Services
{
    public class ReceiverService : IReceiverService
    {
         private readonly IUnitOfWork _unitOfWork;
         public ReceiverService(IUnitOfWork unitOfWork)
         {
             _unitOfWork = unitOfWork;
         }

        public async Task<Receiver> Add(BookingDTO booking)
        {
            var receiver = new Receiver
            {
                Id = Guid.NewGuid().ToString(),
                Name = booking.ReceiverName,
                Address = booking.ReceiverAddress,
                Phone = booking.ReceiverPhone,
                Email = booking.ReceiverEmail,
                ZoneId = booking.ZoneId
            };
            receiver = await _unitOfWork.Receivers.Add(receiver);
            return receiver;
        }

        public async Task<Receiver> GetReceiver(string ReceiverId)
        {
            var result = await _unitOfWork.Receivers.GetReciverById(ReceiverId);
            return result;
        }

        public async Task<bool> Update(Receiver receiver)
        {
            var isReceiverExists = await _unitOfWork.Receivers.GetReciverById(receiver.Id);
            if(isReceiverExists == null)
            {
                return false;
            }
            isReceiverExists.Name = receiver.Name;
            isReceiverExists.Phone = receiver.Phone;
            isReceiverExists.Email = receiver.Email;
            isReceiverExists.Address = receiver.Address;
            isReceiverExists.ZoneId = receiver.ZoneId;
             await _unitOfWork.CompleteAsync();
            return true;
        }
    }
}