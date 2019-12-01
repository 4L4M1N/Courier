using System.Threading.Tasks;

namespace CourierAPI.Core.IRepositories
{
    public interface IUnitOfWork
    {
         IMerchantRepository Merchants { get;}
         IItemRepository Items {get;}
         IItemAttributeRepository ItemAttributes {get;}
         IReceiverRepository Receivers {get;}
         IBookingRepository Bookings {get;}
         IBookingItemRepository BookingItems {get;}
         Task<int> CompleteAsync();
    }
}