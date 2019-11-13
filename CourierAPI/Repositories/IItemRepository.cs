using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Models;

namespace CourierAPI.Repositories
{
    public interface IItemRepository
    {
         Task <IEnumerable<Item>> GetItems();
         Task AddItem(Item item);
    }
}