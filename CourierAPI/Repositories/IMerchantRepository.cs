using CourierAPI.Models;

namespace CourierAPI.Repositories
{
    public interface IMerchantRepository
    {
         void Add(Merchant merchant);
         Merchant GetMerchantDetails(string merchantId);
         
    }
}