using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Data;
using CourierAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Repositories
{
    public class MerchantRepository : IMerchantRepository
    {
        private readonly DataContext _context;
       
        public MerchantRepository(DataContext context)
        {
            _context = context;
        }
        public async Task AddMerchantAsync(Merchant merchant)
        {
            await _context.Merchants.AddAsync(merchant);
        }

        public async Task<Merchant> FindByMerchantNameAsync(string merchantId)
        {
            var result = await (_context.Merchants.Where(m => m.Name == merchantId).FirstOrDefaultAsync());
   
            return result;
        }

        public Merchant GetMerchantDetails(string merchantId)
        {
            throw new System.NotImplementedException();
        }
        // public Merchant FindByMerchantName(string merchantId)
        // {
        //     var result = _context.Merchants.Where(m => m.Name == merchantId).SingleOrDefault();
        //     return result;
        //     // throw new System.NotImplementedException();
        // }
    }
}