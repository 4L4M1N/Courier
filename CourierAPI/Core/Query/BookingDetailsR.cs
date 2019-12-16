using System;

namespace CourierAPI.Core.Query
{
    public class BookingDetailsR
    {
        public string Id { get; set; }
        public DateTime BookingDate { get; set; }
        public string ReceiverName { get; set; }
        public string DelivManName { get; set; }
        public string DelivManId { get; set; }
        public string Zone { get; set; }
    }
}