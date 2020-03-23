using System.ComponentModel.DataAnnotations;

namespace CourierAPI.Core.DTOs
{
    public class DeliveryManToAddDTO
    {
     
        [Required]
        public string Name { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public int ZoneId { get; set; }
        [Required]
        public string NID { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ECPhone { get; set; }
        public int DivisionId { get; set; }
        public string ECName{ get; set; }
        public string ECAddress{ get; set; }
        public string Password {get;set;}
        public string DelivManIdentity  { get; set; }
    }
}