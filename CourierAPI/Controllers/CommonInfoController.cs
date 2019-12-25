using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace CourierAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonInfoController: ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        
        public CommonInfoController(IUnitOfWork unitOfWork, DataContext context)
        {
            _context = context;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("test")]
        public IActionResult Test(){
            return Ok();
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CommonInfo commonInfo){
            await _unitOfWork.CommonInfo.Add(commonInfo);

            var result =await _unitOfWork.CompleteAsync();

            if(result == 0) return BadRequest();

            return Ok("created");
        }
    }
}