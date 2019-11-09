using System.ComponentModel.DataAnnotations;

namespace CourierAPI.Models
{
    public class Division
    {
        public int DivisionId { get; set; }
        
        [Required]
        public string Name { get; set; }
    }
}