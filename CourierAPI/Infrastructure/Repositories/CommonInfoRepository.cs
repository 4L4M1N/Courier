using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class CommonInfoRepository : ICommonInfoRepository
    {
        private readonly DataContext _context;

        public CommonInfoRepository(DataContext context)
        {
            _context = context;
        }

        public async Task Add(CommonInfo commonInfo)
        {
            await _context.CommonInfos.AddAsync(commonInfo);
        }

        public async Task Delete(int id)
        {
            var findcommonInfo = await _context.CommonInfos.FindAsync(id);
             _context.CommonInfos.Remove(findcommonInfo);
        }

        public async Task<CommonInfo> FindCommonInfoById(int id){
            var result = await _context.CommonInfos.Where(x => x.Id == id).FirstOrDefaultAsync();
            return result;
        }

        public async Task Update( CommonInfo commonInfo)
        {
           //_context.Entry(commonInfo).State = EntityState.Modified;
          
           _context.CommonInfos.Update(commonInfo);
           //await _context.SaveChangesAsync();
        }
    }
}