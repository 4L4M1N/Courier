using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class ReceiverRepository : IReceiverRepository
    {
        private readonly DataContext _context;

        public ReceiverRepository(DataContext context)
        {
            _context = context;
        }

        public async Task Add(Receiver receiver)
        {
            await _context.Receivers.AddAsync(receiver);
        }

        public async Task<Receiver> GetReciverById(string ReceiverId)
        {
            var result = await _context.Receivers.Include(x=>x.Zone).FirstOrDefaultAsync(x=>x.Id == ReceiverId);
            return result;
        }
    }
}