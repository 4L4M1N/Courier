using System.Threading.Tasks;
using CourierAPI.DTOs;
using CourierAPI.Models;
using CourierAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourierAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class DropdownController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public DropdownController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet("item")]
        public async Task<IActionResult> GetItems()
        {
            var result = await _unitOfWork.Items.GetItems();
            return Ok(result);
        }
        
        [HttpPost("item/create")]
        [Authorize(Roles = "CourierOwner")]
        public async Task<IActionResult> CreateItem(string itemName)
        {
            if(itemName == null)
                return BadRequest();
            var itemToSave = new Item
            {
                Name = itemName
            };
            await _unitOfWork.Items.AddItem(itemToSave);
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return BadRequest();
            return Ok();
        }

        //Item Attribute
        [HttpPost("itemattribute/create")]
        [Authorize(Roles = "CourierOwner")]
        public async Task<IActionResult> CreateItemAttribute(ItemAttributeDTO itemAttribute)
        {
            if(itemAttribute == null) return BadRequest();
            var isitemAttributeExists = _unitOfWork.ItemAttributes.CheckItemAttribute(itemAttribute);
            if(isitemAttributeExists>0)
            {
                 return BadRequest();
            }
            else 
            {
                var itemAttributeToADD = new ItemAttribute
                {
                    ItemSize = itemAttribute.ItemSize,
                    InCityRate = itemAttribute.InCityRate,
                    OutCityRate = itemAttribute.OutCityRate,
                    RegularRate = itemAttribute.RegularRate,
                    ConditionCharge = itemAttribute.ConditionCharge,
                    BookingCharge = itemAttribute.BookingCharge,
                    Discount = itemAttribute.Discount,
                    ItemId = itemAttribute.ItemId
                };
                await _unitOfWork.ItemAttributes.AddItem(itemAttributeToADD);
            }
            var result = await _unitOfWork.CompleteAsync();
            if(result == 0) return BadRequest();
            return Ok();
        }
        [HttpGet("itemattribute")]
        public async Task<IActionResult> GetItemAttributes()
        {
            var result = await _unitOfWork.ItemAttributes.GetItemAttributes();
            return Ok(result);
        }
        //Get itemattribute of a Item..for dropdown
        [HttpGet("itemattribute/{itemId?}")]
        public async Task<IActionResult> GetItemAttributeOfAItem(int itemId)
        {
            var result = await _unitOfWork.ItemAttributes.GetItemAttributesofAItem(itemId);
            if(result == null) return BadRequest();
            return Ok(result);
        }

    }
}