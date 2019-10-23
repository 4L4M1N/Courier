using CourierAPI.Data;

namespace CourierAPI.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        
        public UnitOfWork(DataContext context)
        {
            _context = context;
            Merchants = new MerchantRepository(_context);
           
            
        }
        public IMerchantRepository Merchants { get;}
        public int Complete()
        {
            var result = _context.SaveChanges();
            return result;
        }
    }
}