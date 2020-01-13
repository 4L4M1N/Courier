using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using AutoMapper;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Filters;
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
        private readonly IMapper _mapper;
        public DropdownController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
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
                    ItemId = itemAttribute.ItemId
                };
                if(itemAttribute.MerchantId != null) {
                    var merchant = await _unitOfWork.Merchants.GetMerchantDetailsAsync(itemAttribute.MerchantId);
                    if(merchant == null) return BadRequest("Invalid merchant");
                    itemAttributeToADD.MerchantIdentity = merchant.MerchantIdentity;
                }
                
                await _unitOfWork.ItemAttributes.AddItem(itemAttributeToADD);
            }
            var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest("dont save");
            return Ok();
        }

        [HttpPut("itemattribute/update")]
        public async Task<IActionResult> UpdateItemAttribute(ItemAttributeDTO itemAttribute) 
        {
            
            var getItemAttribute = _unitOfWork.ItemAttributes.GetItemAttributeByID(itemAttribute.ItemAttributeId);
            if(getItemAttribute == null) 
                return BadRequest("this item Attribute does not exist");
               
            else{
                getItemAttribute.ItemSize = itemAttribute.ItemSize;
                getItemAttribute.InCityRate = itemAttribute.InCityRate;
                getItemAttribute.OutCityRate = itemAttribute.OutCityRate;
                getItemAttribute.RegularRate = itemAttribute.RegularRate;
                getItemAttribute.ConditionCharge = itemAttribute.ConditionCharge;
                getItemAttribute.BookingCharge = itemAttribute.BookingCharge;
               // getItemAttribute.ItemId = itemAttribute.ItemId;

                if(itemAttribute.MerchantId != null) {
                    var merchant = await _unitOfWork.Merchants.GetMerchantDetailsAsync(itemAttribute.MerchantId);
                    if(merchant == null) return BadRequest("Invalid merchant");
                    getItemAttribute.MerchantIdentity = merchant.MerchantIdentity;
                }
                await _unitOfWork.ItemAttributes.UpdateItem(getItemAttribute);
            }

            var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest("dont save");
            return NoContent();
        }


        [HttpDelete("itemattribute/delete/{id}/{merchantId}")]
        public async Task<IActionResult> DeleteItemAttribute(int id, string merchantId) {
            var isMerchantExist = await _unitOfWork.Merchants.GetMerchantDetailsAsync(merchantId);
            
            if (isMerchantExist == null) return BadRequest("Merchant not Found");
 
            var GetItemAttributeByID = _unitOfWork.ItemAttributes.GetItemAttributeByID(id);
            if(GetItemAttributeByID == null) 
                return BadRequest("this item Attribute does not exist");
            
            await _unitOfWork.ItemAttributes.DeleteItem(GetItemAttributeByID.ItemAttributeId);
 
            var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest("dont save");
            return NoContent();
        }




        [HttpGet("itemattribute")]
        public async Task<IActionResult> GetItemAttributes([FromQuery]ItemAttributesFilter filter)
        {
            if(filter.MerchantIdentity != null && filter.ItemId != null && filter.WithItem != true) {
            var merchant = await _unitOfWork.Merchants.GetMerchantDetailsAsync(filter.MerchantIdentity);
            filter.MerchantIdentity = merchant.MerchantIdentity;
            }
            //For agreement 
            if(filter.MerchantIdentity != null && filter.WithItem == true)
            {
                var merchant = await _unitOfWork.Merchants.GetMerchantDetailsAsync(filter.MerchantIdentity);
                filter.MerchantIdentity = merchant.MerchantIdentity;
                var itemAttributeList = await _unitOfWork.ItemAttributes.GetItemAttributes(filter.MerchantIdentity);
                var itemList = await _unitOfWork.Items.GetItems(0);
                var itemAttributeWithItemName = from itemAttribute in itemAttributeList join item in itemList
                                                on itemAttribute.ItemId equals item.ItemId
                                                select new {
                                                    itemAttribute.InCityRate,
                                                    itemAttribute.OutCityRate,
                                                    itemAttribute.ItemSize,
                                                    itemAttribute.ConditionCharge,
                                                    itemAttribute.BookingCharge,
                                                    item.Name
                                                };
                return Ok(itemAttributeWithItemName);
            }
            var result = await _unitOfWork.ItemAttributes.GetItemAttributes(filter);
            
            return Ok(result);
        }
        [HttpGet("itemattributedetails/{itemAttributeId}")]
        public async Task<IActionResult> ItemAttributeDetails(int itemAttributeId)
        {
            // int id = int.Parse(itemAttributeId);
            var result = await _unitOfWork.ItemAttributes.GetItemAttributeDetails(itemAttributeId);
            if (result == null) return BadRequest();
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


        //Delivery Address
        [HttpGet("divisions")]
        public async Task<IActionResult> GetDivisions()
        {
            var divisions = await _unitOfWork.DeliveryAddress.GetDivisions();
            return Ok(divisions);
        }

        //Zones of a Division
        [HttpGet("divisions/{divisionId?}")]
        public async Task<IActionResult> ZonesOfADivison(string divisionId)
        {
            int id = int.Parse(divisionId);
            var result = await _unitOfWork.DeliveryAddress.GetZonesOfADivision(id);
            if (result == null) return BadRequest();
            return Ok(result);
        }
        // Create Division
        [HttpPost("division/create")]
        [Authorize(Roles = "CourierOwner")]
        public async Task<IActionResult> CreateDivision([FromForm]string divisionName)
        {
            if (divisionName == null)
                return BadRequest("null");
            var isDivisionExists = await _unitOfWork.DeliveryAddress.FindDivisionByNameAsync(divisionName);
            if(isDivisionExists != null)
            {
                return BadRequest("Duplicate Division");
            }
            var divisionToAdd = new Division
            {
                Name = divisionName
            };
            await _unitOfWork.DeliveryAddress.AddDivisionAsync(divisionToAdd);
            var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest();
            return Ok();
        }
        // Create Zone
        [HttpPost("zone/create")]
        [Authorize(Roles = "CourierOwner")]
        public async Task<IActionResult> CreateZone(ZoneDTO zone)
        {
            //Using System.Text.Json
            //var result = JsonSerializer.Deserialize<ItemAttribute>(itemAttribute);

            if (zone == null) return BadRequest("No value please check");
            var isZoneExists = await _unitOfWork.DeliveryAddress.FindZoneByNameAsync(zone.ZoneName, zone.DivisionId);
            if (isZoneExists != null)
            {
                return BadRequest("duplicate zone!");
            }
            else
            {
                var zoneToADD = new Zone
                {
                    DivisionId = zone.DivisionId,
                    Name = zone.ZoneName
                };
                await _unitOfWork.DeliveryAddress.AddZoneAsync(zoneToADD);
            }
            var result = await _unitOfWork.CompleteAsync();
            if (result == 0) return BadRequest("dont save");
            return Ok();
        }
    }
}