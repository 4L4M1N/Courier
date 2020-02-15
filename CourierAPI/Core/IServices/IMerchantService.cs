using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IServices
{
    public interface IMerchantService
    {
         Task<Merchant> GetMerchant(string MerchantId);
    }
}