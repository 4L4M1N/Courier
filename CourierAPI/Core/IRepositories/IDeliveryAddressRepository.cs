using System.Collections.Generic;
using System.Threading.Tasks;
using CourierAPI.Core.Models;

namespace CourierAPI.Core.IRepositories
{
    public interface IDeliveryAddressRepository
    {
         Task <IEnumerable<Division>> GetDivisions();
         Task <IEnumerable<Zone>> GetZones();
         Task <IEnumerable<Zone>> GetZonesOfADivision(int divisionId);
         Task <Zone> GetZone(int zoneId);
    }
}