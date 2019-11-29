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
        public int TotalAmmount { get; set; }
    }
}