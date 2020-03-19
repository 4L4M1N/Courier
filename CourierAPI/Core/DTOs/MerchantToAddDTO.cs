using System.ComponentModel.DataAnnotations;

namespace CourierAPI.Core.DTOs
{
    public class MerchantToAddDTO
    {
        
        [Required]
        public string Name { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string BankAccountNo { get; set; }
        [Required]
        public string TradeLicenseNo { get; set; }
        
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 8)]
        public string Password { get; set; }
    }
}