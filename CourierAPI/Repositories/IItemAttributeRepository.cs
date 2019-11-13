using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.DTOs;
using CourierAPI.Models;

namespace CourierAPI.Repositories
{
    public interface IItemAttributeRepository
    {
        Task AddItem(ItemAttribute itemAttribute);
        Task <IEnumerable<ItemAttribute>> GetItemAttributes();
        int CheckItemAttribute(ItemAttributeDTO itemAttribute);
        Task <IEnumerable<ItemAttribute>> GetItemAttributesofAItem(int itemId);
    }
}