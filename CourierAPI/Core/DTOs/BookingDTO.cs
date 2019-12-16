using System.Collections.Generic;

namespace CourierAPI.Core.DTOs
{
    public class BookingDTO
    {
        public string MerchantId { get; set; }
        public double TotalAmount { get; set; }
        public double Discount { get; set; }
        public int ItemAttributeId { get; set; }
        public string ReceiverName { get; set; }
        public string ReceiverAddress { get; set; }
        public string ReceiverPhone { get; set; }
        public string ReceiverEmail { get; set; }
        public int ZoneId { get; set; }
        public int DivisionId { get; set; }
        public double ConditionCharge { get; set; }
        public bool IsConditionCharge { get; set; }
        public bool IsInCity { get; set; }
        public bool IsOutCity { get; set; }

    }
}