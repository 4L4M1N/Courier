using System.Threading.Tasks;
using CourierAPI.Data;
using CourierAPI.DTOs;
using CourierAPI.Models;
using CourierAPI.Repositories;
using CourierAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace CourierAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class MerchantController : ControllerBase
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;
        public MerchantController(IUnitOfWork unitOfWork, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _config = config;
            
        }
        
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("lala");
        }

        [Authorize(Roles = "CourierOwner, SuperAdmin")]
        [HttpPost("create")]
        public async Task<IActionResult> Create(MerchantToAddDTO addMerchant)
        {
            var isMerchantExist = await _unitOfWork.Merchants.FindByMerchantNameAsync(addMerchant.Name);
            if(isMerchantExist != null)
                return BadRequest("This name already exists!");

            byte[] passwordHash, passwordSalt;
            Extensions.CreatePasswordHash(addMerchant.Password, out passwordHash, out passwordSalt);
            int total = _unitOfWork.Merchants.LastMerchantId();
            var merchantId = Extensions.GenerateIdForMerchant(total+1);
            var merchantToAdd = new Merchant
            {
                // Id = Guid.NewGuid().ToString(),
                Name = addMerchant.Name,
                Phone = addMerchant.Phone,
                Email = addMerchant.Email,
                Address = addMerchant.Address,
                TradeLicenseNo = addMerchant.TradeLicenseNo,
                MerchantIdentity = merchantId,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };
            await _unitOfWork.Merchants.AddMerchantAsync(merchantToAdd);
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return BadRequest();
           
           return Ok();
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO merchant)
        {
            var isMerchantExist = await _unitOfWork.Merchants.FindByMerchantNameAsync(merchant.UserName);
            if(isMerchantExist == null)
                return BadRequest("Not Found");
            
            var result = Extensions.VerifyPasswordHash(merchant.Password, isMerchantExist.PasswordHash, isMerchantExist.PasswordSalt);
            if (result)
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, merchant.UserName),
                    new Claim(ClaimTypes.Role, "Marchant")
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(_config.GetSection("AppSettings:Token").Value)); //Set Secret value
                
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
                
                //insert information to token
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                
                var token = tokenHandler.CreateToken(tokenDescriptor);
                

                return Ok(new {
                    token = tokenHandler.WriteToken(token)
                });
            }
            return Unauthorized();
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

        [Authorize(Roles = "CourierOwner, SuperAdmin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMerchant(string id)
        {
            var isMerchantExist = await _unitOfWork.Merchants.GetMerchantDetailsAsync(id);
            if(isMerchantExist == null) return BadRequest("Merchant not Found");
            return Ok(isMerchantExist);
        }

        [Authorize(Roles = "CourierOwner, SuperAdmin")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllMerchants()
        {
            var result = await _unitOfWork.Merchants.GetMerchantsAsync();
            return Ok(result);
        }
    }
}