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
        private readonly IMerchantRepository _merchantRepo;

        // private readonly UnitOfWork _unitOfWork;

        public MerchantController(IMerchantRepository merchantRepository)
        {
            // _unitOfWork = unitOfWork;
            _merchantRepo = merchantRepository;
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
            _merchantRepo.Add(merchantToAdd);
           
           
           return Ok();
            
        }
    }
}