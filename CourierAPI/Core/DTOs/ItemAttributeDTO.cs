namespace CourierAPI.Core.DTOs
{
    public class ItemAttributeDTO
    {
        public string ItemSize { get; set; }
        public double InCityRate{ get; set; }
        public double OutCityRate { get; set; }
        public double RegularRate { get; set; }
        public double ConditionCharge { get; set; }
        public double BookingCharge { get; set; }
        public double Discount { get; set; }
        public int ItemId { get; set; }
        public string MerchantId { get; set; }
        public int ItemAttributeId {get; set;}
    }
}