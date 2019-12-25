using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;

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
    }
}