using System.Text.Json;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
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
        public async Task<IActionResult> CreateItem([FromForm]string itemName)
        {
            if (itemName == null)
                return BadRequest();
            var itemToSave = new Item
            {
                Name = itemName
            };
            await _unitOfWork.Items.AddItem(itemToSave);
            var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest();
            return Ok();
        }

        //Item Attribute
        [HttpPost("itemattribute/create")]
        [Authorize(Roles = "CourierOwner")]
        public async Task<IActionResult> CreateItemAttribute(ItemAttributeDTO itemAttribute)
        {
            //Using System.Text.Json
            //var result = JsonSerializer.Deserialize<ItemAttribute>(itemAttribute);

            if (itemAttribute == null) return BadRequest("No value please check");
            var isitemAttributeExists = _unitOfWork.ItemAttributes.CheckItemAttribute(itemAttribute);
            if (isitemAttributeExists > 0)
            {
                return BadRequest("validation error!");
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
            if (result == 0) return BadRequest("dont save");
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
        public async Task<IActionResult> ItemAttributeOfAItem(string itemId)
        {
            int id = int.Parse(itemId);
            var result = await _unitOfWork.ItemAttributes.GetItemAttributesofAItem(id);
            if (result == null) return BadRequest();
            return Ok(result);
        }

    }
}