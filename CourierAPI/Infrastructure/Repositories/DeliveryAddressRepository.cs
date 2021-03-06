using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class DeliveryAddressRepository : IDeliveryAddressRepository
    {
        private readonly DataContext _context;
        public DeliveryAddressRepository(DataContext context)
        {
            _context = context;

        }

        public async Task AddDivisionAsync(Division division)
        {
            await _context.Divisions.AddAsync(division);
        }

        public async Task AddZoneAsync(Zone zone)
        {
            await _context.Zones.AddAsync(zone);
        }

        public async Task<Division> FindDivisionByNameAsync(string divisionName)
        {
            var result = await (_context.Divisions.Where(d => d.Name == divisionName).FirstOrDefaultAsync());
            return result;
        }

        public async Task<Zone> FindZoneByNameAsync(string zoneName, int divisionId)
        {
            var result = await (_context.Zones.Where(z => z.Name == zoneName && z.DivisionId == divisionId).FirstOrDefaultAsync());
            return result;
        }

        public async Task<Division> GetDivisionOfAZone(int zoneId)
        {
            var zone = await _context.Zones.FirstOrDefaultAsync(x=>x.ZoneId == zoneId);
            var division = await _context.Divisions.FirstOrDefaultAsync(x=>x.DivisionId == zone.DivisionId);
            return division;
        }

        public async Task<IEnumerable<Division>> GetDivisions()
        {
            var divisions = await _context.Divisions.ToListAsync();
            return divisions;
        }

        public async Task<Zone> GetZone(int zoneId)
        {
            var zone = await _context.Zones
                        .Where(z =>z.ZoneId == zoneId)
                        .FirstOrDefaultAsync();
            return zone;
        }

        public async Task<IEnumerable<Zone>> GetZones()
        {
            var zones = await _context.Zones.ToListAsync();
            return zones;
        }

        public async Task<IEnumerable<Zone>> GetZonesOfADivision(int divisionId)
        {
            var zonesOfADivision = await _context.Zones
                                    .Where(z =>z.DivisionId == divisionId)
                                    .ToListAsync();
            return zonesOfADivision;
        }
    }
}