using System.Threading.Tasks;

namespace CourierAPI.Repositories
{
    public interface IUnitOfWork
    {
         IMerchantRepository Merchants { get;}
         IItemRepository Items {get;}
         IItemAttributeRepository ItemAttributes {get;}
         Task<int> CompleteAsync();
    }
}