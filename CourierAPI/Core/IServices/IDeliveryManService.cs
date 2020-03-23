using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IServices
{
    public interface IDeliveryManService
    {
         Task<List<DeliveryMan>> GetDeliveryMen();
         Task<bool> Update(DeliveryManToAddDTO update);
    }
}