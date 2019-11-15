using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IItemRepository
    {
         Task <IEnumerable<Item>> GetItems();
         Task AddItem(Item item);
    }
}