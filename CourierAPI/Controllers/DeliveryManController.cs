using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CourierAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using CourierAPI.Core.IRepositories;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Models;
using System;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using CourierAPI.Core.IServices;

namespace CourierAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryManController: ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryManService _deliveryManService;
        
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public DeliveryManController(IUnitOfWork unitOfWork, IConfiguration config, IMapper mapper,IDeliveryManService deliveryManService)
        {
            _unitOfWork = unitOfWork;
             _config = config;
            _mapper = mapper;
            _deliveryManService = deliveryManService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(DeliveryManToAddDTO addDeliveryMan)
        {
            //check already exists or not

            // byte[] passwordHash, passwordSalt;
            // Extensions.CreatePasswordHash(addDeliveryMan.Password, out passwordHash, out passwordSalt);
            int total = _unitOfWork.DeliveryMan.LastDeliverManId();
            var DeliveryManId = Extensions.GenerateIdForDeliveryMan(total + 1);
            var DeliveryManToAdd = new DeliveryMan
            {
                DelivManIdentity  = DeliveryManId,
                Name = addDeliveryMan.Name,
                Phone = addDeliveryMan.Phone,
                NID = addDeliveryMan.NID,
                Address = addDeliveryMan.Address,
                ECName = addDeliveryMan.ECName,
                ECAddress = addDeliveryMan.ECAddress,
                ECPhone = addDeliveryMan.ECPhone,
                // PasswordHash = passwordHash,
                // PasswordSalt = passwordSalt,
                ZoneId = addDeliveryMan.ZoneId
            };
            await _unitOfWork.DeliveryMan.AddDeliveryManAsync(DeliveryManToAdd);
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return BadRequest("Something went wrong!");

            return Ok("Delivery Man Added");
        }


        [HttpPost("login")]

        public async Task<IActionResult> Login(UserForLoginDTO deliveryMan)
        {
            var isDeliveryManExist = await _unitOfWork.DeliveryMan.FindByDeliveryManNameAsync(deliveryMan.UserName);
            if(isDeliveryManExist == null)
                return BadRequest("not found any DeliveyMan");

            var result = Extensions.VerifyPasswordHash(deliveryMan.Password, isDeliveryManExist.PasswordHash, isDeliveryManExist.PasswordSalt);

            if(result)
            {
                var claims  = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, deliveryMan.UserName),
                    new Claim(ClaimTypes.Role, "DelivaryMan"),
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


                return Ok(new
                {
                    token = tokenHandler.WriteToken(token)
                });
            }
            return Unauthorized();
            
        } 
        [HttpGet("all")]
        public async Task<IActionResult> GetAllDeliveryMan()
        {
            var deliveryMan = await _deliveryManService.GetDeliveryMen();
            return Ok(deliveryMan);
        }
         [HttpPut("update")]
        public async Task<IActionResult> UpdateDeliveryMan(DeliveryManToAddDTO UpdateDeliveryMan)
        {
            var result = await _deliveryManService.Update(UpdateDeliveryMan);
            if(result)
            {
                return Ok("Delivery Man information updated");
            }
            return BadRequest("Update Failed");
        }
    }
}