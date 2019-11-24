using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IItemAttributeRepository
    {
        Task AddItem(ItemAttribute itemAttribute);
        Task <IEnumerable<ItemAttribute>> GetItemAttributes();
        int CheckItemAttribute(ItemAttributeDTO itemAttribute);
        Task <IEnumerable<ItemAttribute>> GetItemAttributesofAItem(int itemId);
        Task <ItemAttribute> GetItemAttributeDetails(int itemAttributeId);
    }
}