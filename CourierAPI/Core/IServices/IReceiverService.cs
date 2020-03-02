using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IServices
{
    public interface IReceiverService
    {
         Task<Receiver> GetReceiver(string ReceiverId);
         Task<bool> Update(Receiver receiver);
    }
}