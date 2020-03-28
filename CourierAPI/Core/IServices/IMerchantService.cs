using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IServices
{
    public interface IMerchantService
    {
         Task<Merchant> GetMerchant(string MerchantId);
         Task<bool> Update(MerchantDTO updateMerchant);
    }
}