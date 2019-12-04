using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Infrastructure.Data;

namespace CourierAPI.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        public IMerchantRepository Merchants { get; private set; }

        public IItemRepository Items { get; private set; }

        public IItemAttributeRepository ItemAttributes { get; private set; }
        public IReceiverRepository Receivers {get; private set;}
        public IBookingRepository Bookings {get ; private set;}
        public IBookingItemRepository BookingItems {get; private set;}

        public IDeliveryAddressRepository DeliveryAddress {get; private set;}

        public IDeliveryManRepository DeliveryMan {get; private set;}

        public UnitOfWork(DataContext context)
        {
            _context = context;
            Merchants = new MerchantRepository(_context);
            Items = new ItemRepository(_context);
            ItemAttributes = new ItemAttributeRepository(_context);
            Receivers = new ReceiverRepository(_context);
            Bookings = new BookingRepository(_context);
            BookingItems = new BookingItemRepository(_context);
            DeliveryAddress = new DeliveryAddressRepository(_context);
            DeliveryMan = new DeliveryManRepository(_context);
        }

        public async Task<int> CompleteAsync()
        {
            var result = await _context.SaveChangesAsync();
            return result;
        }
    }
}