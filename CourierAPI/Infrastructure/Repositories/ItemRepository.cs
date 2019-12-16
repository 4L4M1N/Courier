using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
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