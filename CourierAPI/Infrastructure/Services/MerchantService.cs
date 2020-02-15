using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.IServices;
using CourierAPI.Core.Models;

namespace CourierAPI.Infrastructure.Services
{
    public class MerchantService : IMerchantService
    {
         private readonly IUnitOfWork _unitOfWork;
         public MerchantService(IUnitOfWork unitOfWork)
         {
             _unitOfWork = unitOfWork;
         }
        public async Task<Merchant> GetMerchant(string MerchantId)
        {
            var result = await _unitOfWork.Merchants.GetMerchantDetailsAsync(MerchantId);
            return result;
        }
    }
}