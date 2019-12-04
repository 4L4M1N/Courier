using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CourierAPI.Helpers;
using CourierAPI.Core.IRepositories;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Models;
using System;

namespace CourierAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryManController: ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        
        private readonly IMapper _mapper;

        public DeliveryManController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

         [HttpPost("create")]
        public async Task<IActionResult> Create(DeliveryManToAddDTO addDaliveryMan)
        {
            //check already exists or not

            byte[] passwordHash, passwordSalt;
            Extensions.CreatePasswordHash(addDaliveryMan.Password, out passwordHash, out passwordSalt);
            int total = _unitOfWork.DeliveryMan.LastDeliverManId();
            var DeliveryManId = Extensions.GenerateIdForDeliveryMan(total + 1);
            var DeliveryManToAdd = new DeliveryMan
            {
                DelivManIdentity  = DeliveryManId,
                Name = addDaliveryMan.Name,
                Phone = addDaliveryMan.Phone,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };
            await _unitOfWork.DeliveryMan.AddDeliveryManAsync(DeliveryManToAdd);
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return BadRequest();

            return Ok();
        }
        
    }
}