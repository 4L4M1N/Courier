using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Filters;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class ItemAttributeRepository : IItemAttributeRepository
    {
        private readonly DataContext _context;
        public ItemAttributeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddItem(ItemAttribute itemAttribute)
        {
            await _context.ItemAttributes.AddAsync(itemAttribute);
        }

        public int CheckItemAttribute(ItemAttributeDTO itemAttribute)
        {
            //TODO: Logic is not correct!!!
            var isExists = _context.ItemAttributes.Include(i => i.Item)
                .Where(i => i.Item.ItemId == itemAttribute.ItemId &&
                        i.ItemSize == itemAttribute.ItemSize &&
                        i.InCityRate == itemAttribute.InCityRate &&
                        i.OutCityRate == itemAttribute.OutCityRate &&
                        i.RegularRate == itemAttribute.RegularRate &&
                        i.ConditionCharge == itemAttribute.ConditionCharge &&
                        i.BookingCharge == itemAttribute.BookingCharge
                );
            return isExists.Count();
        }

        public async Task<ItemAttribute> GetItemAttributeDetails(int itemAttributeId)
        {
            var itemAttribute = await _context.ItemAttributes
                                        .Where(ia =>ia.ItemAttributeId == itemAttributeId)
                                        .FirstOrDefaultAsync();
            return itemAttribute;
        }

        public async Task<IEnumerable<ItemAttribute>> GetItemAttributes(ItemAttributesFilter filter)
        {
            var itemAttributes =  _context.ItemAttributes.AsQueryable();
            if(filter.ItemId.HasValue)
            {
                itemAttributes = itemAttributes.Where(at => at.ItemId == filter.ItemId);
            }
            if(filter.MerchantIdentity != null)
            {
                itemAttributes = itemAttributes.Where(at => at.MerchantIdentity == filter.MerchantIdentity);
            }
            return await itemAttributes.ToListAsync();
        }

        //Get an items all attribute
        public async Task<IEnumerable<ItemAttribute>> GetItemAttributesofAItem(int itemId)
        {
            var itemAttributes = await _context.ItemAttributes.Where(a => a.ItemId == itemId).ToListAsync();
            return itemAttributes;
        }

        public async Task UpdateItem(ItemAttribute itemAttribute)
        {
            _context.ItemAttributes.Update(itemAttribute);
        }

        public  ItemAttribute GetItemAttributeByID(int id)
        {
            var result =  _context.ItemAttributes.Where(x => x.ItemAttributeId == id).FirstOrDefault();
            return result;
        }

    }
}