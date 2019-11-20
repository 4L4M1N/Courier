using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IMerchantRepository
    {
         Task AddMerchantAsync(Merchant merchant);
         Task<Merchant> GetMerchantDetailsAsync(string merchantId);
         Task<Merchant> FindByMerchantNameAsync(string merchantName);
         Task<Merchant> FindByMerchantEmailAsync(string merchantEmail);
         Task<Merchant> FindByMerchantPhoneAsync(string merchantPhone);
         Task<Merchant> FindByMerchantIdentityAsync(string merchantIdentity);
         Task<IEnumerable<Merchant>> GetMerchantsAsync();
         int LastMerchantId();
    }
}