using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using CourierAPI.Helpers;


namespace CourierAPI.Core.DTOs
{

    public class ItemAttributeDTO
    {
        [Required]
        public string ItemSize { get; set; }
        
        [Required]
     
        public double InCityRate{ get; set; }
       
        [Required]
        public double OutCityRate { get; set; }
        public double RegularRate { get; set; }
        public double ConditionCharge { get; set; }
        public double BookingCharge { get; set; }
        public double Discount { get; set; }
        [Required]
        public int ItemId { get; set; }
        public string MerchantId { get; set; }

        public int ItemAttributeId {get; set;}

        public string ItemName { get; set; }
    }
}