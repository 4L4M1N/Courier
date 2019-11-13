using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Models;

namespace CourierAPI.Repositories
{
    public interface IItemAttributeRepository
    {
        Task AddItem(ItemAttribute itemAttribute);
        Task <IEnumerable<ItemAttribute>> GetItemAttributes();
        int CheckItemAttribute(int itemId);
        Task <IEnumerable<ItemAttribute>> GetItemAttributesofAItem(int itemId);
    }
}