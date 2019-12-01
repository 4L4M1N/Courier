using System.ComponentModel.DataAnnotations.Schema;

namespace CourierAPI.Core.Models
{
    public class AssignedDelivMan
    {
        public int Id { get; set; }
        public string BookingId { get; set; }
        [ForeignKey("BookingId")]
        public Booking Booking { get; set; }
        public string DelivManId { get; set; }

    }
}