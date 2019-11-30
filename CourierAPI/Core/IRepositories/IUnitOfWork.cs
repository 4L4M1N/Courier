using System.Threading.Tasks;

namespace CourierAPI.Core.IRepositories
{
    public interface IUnitOfWork
    {
         IMerchantRepository Merchants { get;}
         IItemRepository Items {get;}
         IItemAttributeRepository ItemAttributes {get;}
         IReceiverRepository Receiver {get;}
         Task<int> CompleteAsync();
    }
}