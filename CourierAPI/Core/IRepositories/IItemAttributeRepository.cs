using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Filters;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IItemAttributeRepository
    {
        Task AddItem(ItemAttribute itemAttribute);
        Task UpdateItem(ItemAttribute itemAttribute);
        Task DeleteItem(int id);
        Task <IEnumerable<ItemAttribute>> GetItemAttributes(ItemAttributesFilter filter);
        Task<List<ItemAttribute>> GetItemAttributes(string merchantIdentity);
        int CheckItemAttribute(ItemAttributeDTO itemAttribute);
        Task <IEnumerable<ItemAttribute>> GetItemAttributesofAItem(int itemId);
        Task <ItemAttribute> GetItemAttributeDetails(int itemAttributeId);
        ItemAttribute GetItemAttributeByID(int id);
    }
}