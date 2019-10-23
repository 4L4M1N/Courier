using CourierAPI.Data;
using CourierAPI.Models;

namespace CourierAPI.Repositories
{
    public class MerchantRepository : IMerchantRepository
    {
        private readonly DataContext _context;
       
        public MerchantRepository(DataContext context)
        {
            _context = context;
        }
        public void Add(Merchant merchant)
        {
            _context.Merchants.Add(merchant);
        }

        public Merchant GetMerchantDetails(string merchantId)
        {
            throw new System.NotImplementedException();
        }
    }
}