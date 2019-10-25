using System.Threading.Tasks;
using CourierAPI.Data;
using CourierAPI.DTOs;
using CourierAPI.Models;
using CourierAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourierAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "CourierOwner, SuperAdmin")]
    public class MerchantController : ControllerBase
    {
        
        private readonly IUnitOfWork _unitOfWork;
        public MerchantController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }
        
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("lala");
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(MerchantToAddDTO addMerchant)
        {
            var isMerchantExist = await _unitOfWork.Merchants.FindByMerchantNameAsync(addMerchant.Name);
            if(isMerchantExist != null)
                return BadRequest("This name already exists!");

            var merchantToAdd = new Merchant
            {
                Name = addMerchant.Name,
                Phone = addMerchant.Phone,
                Email = addMerchant.Email,
                Address = addMerchant.Address,
                TradeLicenseNo = addMerchant.TradeLicenseNo
            };
            await _unitOfWork.Merchants.AddMerchantAsync(merchantToAdd);
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return BadRequest();
           
           return Ok();
            
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update(MerchantToAddDTO updateMerchant)
        {
            var isMerchantExist = await _unitOfWork.Merchants.FindByMerchantNameAsync(updateMerchant.Name);
            if(isMerchantExist == null) return BadRequest("User Not Found");

            isMerchantExist.Email = updateMerchant.Email;
            isMerchantExist.BankAccountNo = updateMerchant.BankAccountNo;
            isMerchantExist.Address = updateMerchant.Address;
            isMerchantExist.Phone = updateMerchant.Phone;
            isMerchantExist.TradeLicenseNo = updateMerchant.TradeLicenseNo;
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return BadRequest();
            return Ok("Merchant Updated");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMerchant(string id)
        {
            var isMerchantExist = await _unitOfWork.Merchants.GetMerchantDetailsAsync(id);
            if(isMerchantExist == null) return BadRequest("Merchant not Found");
            return Ok(isMerchantExist);
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAllMerchants()
        {
            var result = await _unitOfWork.Merchants.GetMerchantsAsync();
            return Ok(result);
        }
    }
}