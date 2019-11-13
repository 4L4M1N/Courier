using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Data;
using CourierAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _context;
        public ItemRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddItem(Item item)
        {
            await _context.Items.AddAsync(item);
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            var items = await _context.Items.ToListAsync();
            return items;
        }
    }
}