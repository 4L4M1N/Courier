using System.ComponentModel.DataAnnotations.Schema;

namespace CourierAPI.Core.Models
{
    public class Receiver
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int ZoneId { get; set; }
        [ForeignKey("ZoneId")]
        public Zone Zone { get; set; }
    }
}