using System.Threading.Tasks;
using CourierAPI.Models;

namespace CourierAPI.Repositories
{
    public interface IMerchantRepository
    {
         Task AddMerchantAsync(Merchant merchant);
         Merchant GetMerchantDetails(string merchantId);
         Task<Merchant> FindByMerchantNameAsync(string merchantId);
    }
}