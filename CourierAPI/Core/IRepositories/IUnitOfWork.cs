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
         IDeliveryAddressRepository DeliveryAddress {get;}

         IDeliveryManRepository DeliveryMan{get;}
         IAssignedDelivManRepository AssignedDelivMan {get;}
         ICommonInfoRepository CommonInfo{get;}
         IRequestBookingRepository RequestBooking {get;}
         Task<int> CompleteAsync();
    }
}