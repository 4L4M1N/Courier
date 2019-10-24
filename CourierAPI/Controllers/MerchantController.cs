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
        
        private readonly DataContext _context;
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
        public IActionResult Create(MerchantToAddDTO addMerchant)
        {
            var merchantToAdd = new Merchant
            {
                Name = addMerchant.Name,
                Phone = addMerchant.Phone,
                Email = addMerchant.Email,
                Address = addMerchant.Address,
                TradeLicenseNo = addMerchant.TradeLicenseNo
            };
            _unitOfWork.Merchants.Add(merchantToAdd);
            var result = _unitOfWork.Complete();
           if(result == 0) return BadRequest();
           
           return Ok();
            
        }
    }
}