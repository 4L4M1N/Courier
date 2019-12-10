using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IAssignedDelivManRepository
    {
         Task Add(AssignedDelivMan assignedDelivMan);
    }
}