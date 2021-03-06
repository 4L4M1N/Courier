using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CourierAPI.Core.Models
{
    public class Division
    {
        public int DivisionId { get; set; }
        
        [Required]
        public string Name { get; set; }
        public List<Zone> Zones { get; set; }
    }
}