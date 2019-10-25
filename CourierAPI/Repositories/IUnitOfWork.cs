using System.Threading.Tasks;

namespace CourierAPI.Repositories
{
    public interface IUnitOfWork
    {
         IMerchantRepository Merchants { get;  }
         Task<int> CompleteAsync();
    }
}