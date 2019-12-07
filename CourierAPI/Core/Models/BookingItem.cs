using System.ComponentModel.DataAnnotations.Schema;

namespace CourierAPI.Core.Models
{
    public class BookingItem
    {
        public int Id { get; set; }
        public int ItemAttributeId { get; set; }
        public bool IsInCity { get; set; }
        public bool IsConditionChargeApply { get; set; }

        public string BookingId { get; set; }
        [ForeignKey("BookingId")]
        public Booking Booking { get; set; }
        
    }
}