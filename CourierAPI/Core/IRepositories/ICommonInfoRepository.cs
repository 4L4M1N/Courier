using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface ICommonInfoRepository
    {
        Task Add(CommonInfo commonInfo);
        Task Delete(int id);
        Task Update(CommonInfo commonInfo);
        Task<CommonInfo> FindCommonInfoById(int id);
    }
}