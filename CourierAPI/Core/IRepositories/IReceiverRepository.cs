using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IReceiverRepository
    {
         Task Add(Receiver receiver); 
         Task Delete(string ReceiverId);
         Task<Receiver> GetReciverById(string ReceiverId);
    }
}