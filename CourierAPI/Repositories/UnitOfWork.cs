using System.Threading.Tasks;
using CourierAPI.Data;

namespace CourierAPI.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        public IMerchantRepository Merchants { get; private set;}

        public IItemRepository Items { get; private set;}

        public IItemAttributeRepository ItemAttributes { get; private set;}

        public UnitOfWork(DataContext context)
        {
            _context = context;
            Merchants = new MerchantRepository(_context);
            Items = new ItemRepository(_context);
            ItemAttributes = new ItemAttributeRepository(_context);
        }
        
        public async Task<int> CompleteAsync()
        {
            var result = await _context.SaveChangesAsync();
            return result;
        }
    }
}