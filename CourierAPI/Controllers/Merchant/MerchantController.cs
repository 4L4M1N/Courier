using CourierAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourierAPI.Controllers.Merchant
{
    
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "CourierOwner, SuperAdmin")]
    public class MerchantController : ControllerBase
    {
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("lala");
        }
    }
}