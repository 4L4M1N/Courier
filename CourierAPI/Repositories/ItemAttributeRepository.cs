using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Data;
using CourierAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Repositories
{
    public class ItemAttributeRepository : IItemAttributeRepository
    {
        private readonly DataContext _context;
        public ItemAttributeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddItem(ItemAttribute itemAttribute)
        {
            await _context.ItemAttributes.AddAsync(itemAttribute);
        }

        public int CheckItemAttribute(int itemId)
        {
            //TODO: Logic is not correct!!!
            var isExists = _context.ItemAttributes.Include(i=>i.Item).Where(i=>i.Item.ItemId == itemId);
            return isExists.Count();
        }

        public async Task<IEnumerable<ItemAttribute>> GetItemAttributes()
        {
            var items = await _context.ItemAttributes.ToListAsync();
            return items;
        }

        //Get an items all attribute
        public async Task<IEnumerable<ItemAttribute>> GetItemAttributesofAItem(int itemId)
        {
            var itemAttributes = await _context.ItemAttributes.Where(a => a.ItemId == itemId).ToListAsync();
            return itemAttributes;
        }
    }
}