using Microsoft.AspNetCore.Identity;

namespace CourierAPI.Core.Models
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
    }
}