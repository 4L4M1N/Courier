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

        public async Task<DeliveryMan> GetDeliveryManDetailsAsync(string id)
        {
            var result = await (_context.DeliveryMen.Where(d => d.DelivManIdentity == id).FirstOrDefaultAsync());
            return result;
        }

        public int LastDeliverManId()
        {
            var id = _context.DeliveryMen.Count();
            return id;
        }
    }
}