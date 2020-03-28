using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
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

        public async Task<bool> Update(MerchantDTO updateMerchant)
        {
            var isMerchantExists = await _unitOfWork.Merchants.FindByMerchantIdAsync(updateMerchant.Id.ToString());
            if(isMerchantExists == null)
            {
                return false;
            }
            isMerchantExists.Email = updateMerchant.Email;
            isMerchantExists.Name = updateMerchant.Name;
            isMerchantExists.Address = updateMerchant.Address;
            isMerchantExists.Phone = updateMerchant.Phone;
            isMerchantExists.TradeLicenseNo = updateMerchant.TradeLicenseNo;
            isMerchantExists.BankAccountNo = updateMerchant.BankAccountNo;
            var result = await _unitOfWork.CompleteAsync();
            if(result>0)
            {
                return true;
            }
            return false;
        }
    }
}