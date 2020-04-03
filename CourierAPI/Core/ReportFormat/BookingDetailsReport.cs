using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CourierAPI.Core.ReportFormat
{
   
    public class BookingDetailsReport
    {
        [JsonProperty("ID")]
        public string Id { get; set; }
        [JsonProperty("Merchant Name")]
        public string MerchantName { get; set; }
         [JsonProperty("Receiver Name")]
        public string ReceiverName { get; set; }
        [JsonProperty("Booking Date")]
        public DateTime BookingDate { get; set; }
        [JsonProperty("Delivered Date")]
        public DateTime DeliveredDate{ get; set; }
        [JsonProperty("Status")]
        public string Status { get; set; }
        [JsonProperty("Zone")]
        public string Zone { get; set; } 
        [JsonProperty("Delivery Man")]
        public string DeliveryMan { get; set; } 
        [JsonProperty("Courier Bill")]
        public double CourierBill { get; set; } 
        [JsonProperty("Merchant Bill")]
        public double MerchantBill { get; set; }
        [JsonProperty("Receiver Bill")]
        public double ReceiverBill { get; set; }
    }
}