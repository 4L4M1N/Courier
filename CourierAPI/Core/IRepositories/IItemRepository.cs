using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IItemRepository
    {
         Task <IEnumerable<Item>> GetItems();
         Task <List<Item>> GetItems(int itemId);
         Task AddItem(Item item);
    }
}