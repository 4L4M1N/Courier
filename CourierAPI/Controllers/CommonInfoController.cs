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

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id){

            var getCommonInfo =  await _unitOfWork.CommonInfo.FindCommonInfoById(id);
            if(getCommonInfo == null)
                return BadRequest("no courier found");

            await _unitOfWork.CommonInfo.Delete(id);

            var result =await _unitOfWork.CompleteAsync();

            if(result == 0) return BadRequest();

            return Ok("deleted");
            
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, CommonInfo commonInfo){

            var getCommonInfo =  await _unitOfWork.CommonInfo.FindCommonInfoById(id);
            if(getCommonInfo == null)
                return BadRequest("no courier found");

            // mapping
            getCommonInfo.Name = commonInfo.Name;
            getCommonInfo.Phone = commonInfo.Phone;
            getCommonInfo.Address = commonInfo.Address;
            getCommonInfo.TotalBranch = commonInfo.TotalBranch;
            getCommonInfo.Email = commonInfo.Email;

            await _unitOfWork.CommonInfo.Update(getCommonInfo);
            
            var result =await _unitOfWork.CompleteAsync();

            if(result == 0) return BadRequest("save failed");

            return Ok("update success");
        }
    }
}