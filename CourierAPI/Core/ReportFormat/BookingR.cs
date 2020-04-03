using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourierAPI.Core.ReportFormat
{
    
    public class BookingR
    {
        public string Id { get; set; }
        public DateTime BookingDate { get; set; }
        public string ReceiverName { get; set; }
        public string DelivManName { get; set; }
        public string DelivManId { get; set; }
        public string Zone { get; set; }
        public string BookingSerialNo { get; set; }
        public string MerchantName { get; set; }
        public string Status { get; set; }
        public string MerchantId { get; set; }
    }
}