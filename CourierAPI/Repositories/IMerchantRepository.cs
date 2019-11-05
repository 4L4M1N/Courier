using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Models;

namespace CourierAPI.Repositories
{
    public interface IMerchantRepository
    {
         Task AddMerchantAsync(Merchant merchant);
         Task<Merchant> GetMerchantDetailsAsync(string merchantName);
         Task<Merchant> FindByMerchantNameAsync(string merchantName);
         Task<Merchant> FindByMerchantEmailAsync(string merchantEmail);
         Task<Merchant> FindByMerchantPhoneAsync(string merchantPhone);
         Task<IEnumerable<Merchant>> GetMerchantsAsync();
         int LastMerchantId();
    }
}