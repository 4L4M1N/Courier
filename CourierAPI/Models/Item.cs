using System.ComponentModel.DataAnnotations;

namespace CourierAPI.Models
{
    public class Item 
    {
        public int ItemId { get; set; }
        
        [Required]
        public string Name { get; set; }
    }
}