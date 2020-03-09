using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IStatusRepository
    {
         Task <IEnumerable<Status>> GetAllStatus();
         Task <Status> GetStatusById(int statusId);
    }
}