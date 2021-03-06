using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class DeliveryManRepository : IDeliveryManRepository
    {
        private readonly DataContext _context;
        public DeliveryManRepository(DataContext context)
        {
            _context = context;
        }
        public async Task AddDeliveryManAsync(DeliveryMan deliveryMan)
        {
            await _context.DeliveryMen.AddAsync(deliveryMan);
        }

        public async Task<DeliveryMan> FindByDeliveryManByIdAsync(string delivManId)
        {
            var result = await _context.DeliveryMen.Where(a => a.DelivManIdentity == delivManId).FirstOrDefaultAsync();
            return result;
        }

        public async Task<DeliveryMan> FindByDeliveryManNameAsync(string DMname)
        {
            var result = await _context.DeliveryMen.Where(a => a.Name == DMname).FirstOrDefaultAsync();
            return result;
        }

        public async Task<IEnumerable<DeliveryMan>> GetAllDeliveryMan()
        {
            var items = await _context.DeliveryMen.ToListAsync();
            return items;
        }

        public async Task<DeliveryMan> GetDeliveryManDetailsAsync(string id)
        {
            var result = await (_context.DeliveryMen.Where(d => d.DelivManIdentity == id).FirstOrDefaultAsync());
            return result;
        }

        public async Task<List<DeliveryMan>> GetDeliveryMen()
        {
            var result = await _context.DeliveryMen.Include(x=>x.Zone).Include(x=>x.Zone.Division).ToListAsync();
            return result;
        }

        public int LastDeliverManId()
        {
            var id = _context.DeliveryMen.Count();
            return id;
        }
    }
}