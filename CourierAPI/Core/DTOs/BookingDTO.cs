using System.Collections.Generic;

namespace CourierAPI.Core.DTOs
{
    public class BookingDTO
    {
        public string MerchantId { get; set; }
        public int TotalAmmount { get; set; }
        public int Discount { get; set; }
        public List<int> ItemAttributesId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int ZoneId { get; set; }

    }
}