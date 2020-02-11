using System;
namespace CourierAPI.Core.ReportFormat
{
    public class BookingDetailsReport
    {
        public string Id { get; set; }
        public string MerchantName { get; set; }
        public string ReceiverName { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime DeliveredDate{ get; set; }
        public string Status { get; set; }
        public string Zone { get; set; } 
        public string DeliveryMan { get; set; } 
        public double CourierBill { get; set; } 
        public double MerchantBill { get; set; }
        public double ReceiverBill { get; set; }
    }
}