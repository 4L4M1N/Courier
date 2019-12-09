using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IDeliveryManRepository
    {
        Task AddDeliveryManAsync(DeliveryMan deliveryMan);
        Task<DeliveryMan> GetDeliveryManDetailsAsync(string id);

        Task<DeliveryMan> FindByDeliveryManNameAsync(string DMname);
        int LastDeliverManId();
    }
}