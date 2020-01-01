using System.ComponentModel.DataAnnotations.Schema;

namespace CourierAPI.Core.Models
{
    public class ItemAttribute
    {
        public int ItemAttributeId { get; set; }
        public string ItemSize { get; set; }
        public double InCityRate{ get; set; }
        public double OutCityRate { get; set; }
        public double RegularRate { get; set; }
        public double ConditionCharge { get; set; }
        public double BookingCharge { get; set; }

        public int ItemId { get; set; }
        [ForeignKey("ItemId")]
        public Item Item { get; set; }

        public string MerchantIdentity { get; set; }
       
    }
}