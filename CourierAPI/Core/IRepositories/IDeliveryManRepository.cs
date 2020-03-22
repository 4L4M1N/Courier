using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IDeliveryManRepository
    {
        Task AddDeliveryManAsync(DeliveryMan deliveryMan);
        Task<DeliveryMan> GetDeliveryManDetailsAsync(string id);

        Task<DeliveryMan> FindByDeliveryManNameAsync(string DMname);
        Task<DeliveryMan> FindByDeliveryManByIdAsync(string delivManId);
        Task<IEnumerable<DeliveryMan>> GetAllDeliveryMan();
        Task<List<DeliveryMan>> GetDeliveryMen();
        int LastDeliverManId();
    }
}