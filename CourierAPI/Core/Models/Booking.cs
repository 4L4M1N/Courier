using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourierAPI.Core.Models
{
    public class Booking
    {
        public string Id { get; set; }
        public string TrackingNumber { get; set; }
        public string ReceiverId { get; set; }
        [ForeignKey("ReceiverId")]
        public Receiver Receiver { get; set; }
        
        public string MerchantId { get; set; }
        [ForeignKey("MerchantId")]
        public Merchant Merchant { get; set; }

        public double TotalAmmount { get; set; }
        public double Discount { get; set; }
        public double ItemPrice { get; set;}
        public double ConditionCharge { get; set; }
        public double MerchantBill { get; set; }
        public double CourierBill { get; set; }
        public double ReceiverBill { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime DeliveredDate { get; set; }
        public string Status { get; set; }
        public string SerialNo { get; set; }
    }
}