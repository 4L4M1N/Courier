using System.Collections.Generic;
using System.Threading.Tasks;
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
    }
}