using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.IServices;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;

namespace CourierAPI.Infrastructure.Services
{
    public class DeliveryManService : IDeliveryManService
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        public DeliveryManService(IUnitOfWork unitOfWork, DataContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }
        public async Task<List<DeliveryMan>> GetDeliveryMen()
        {
            var result = await _unitOfWork.DeliveryMan.GetDeliveryMen();
            return result;
        }

        public async Task<bool> Update(DeliveryManToAddDTO updateDeliveryMan)
        {
            var isDeliveryManExists = await _unitOfWork.DeliveryMan.FindByDeliveryManByIdAsync(updateDeliveryMan.DelivManIdentity);//Delivery-Man Identity
            if(isDeliveryManExists == null)
            {
                return false;
            }
            isDeliveryManExists.Name = updateDeliveryMan.Name;
            isDeliveryManExists.NID = updateDeliveryMan.NID;
            isDeliveryManExists.Phone = updateDeliveryMan.Phone;
            isDeliveryManExists.Address = updateDeliveryMan.Address;
            isDeliveryManExists.ECAddress = updateDeliveryMan.ECAddress;
            isDeliveryManExists.ECName = updateDeliveryMan.ECName;
            isDeliveryManExists.ECPhone = updateDeliveryMan.ECPhone;
            isDeliveryManExists.ZoneId = updateDeliveryMan.ZoneId;
            var result = await _unitOfWork.CompleteAsync();
            if(result>0)
            {
                return true;
            }
            return false;
        }
    }
}