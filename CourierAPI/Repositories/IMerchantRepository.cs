using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Models;

namespace CourierAPI.Repositories
{
    public interface IMerchantRepository
    {
         Task AddMerchantAsync(Merchant merchant);
         Task<Merchant> GetMerchantDetailsAsync(string merchantId);
         Task<Merchant> FindByMerchantNameAsync(string merchantId);
         Task<IEnumerable<Merchant>> GetMerchantsAsync();
    }
}