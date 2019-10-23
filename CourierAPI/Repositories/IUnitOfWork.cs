namespace CourierAPI.Repositories
{
    public interface IUnitOfWork
    {
         IMerchantRepository Merchants { get;  }
         int Complete();
    }
}