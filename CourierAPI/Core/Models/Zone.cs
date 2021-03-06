using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourierAPI.Core.Models
{
    public class Zone
    {
        public int ZoneId { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public int DivisionId { get; set; }
        public Division Division { get; set; }
    }
}