using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourierAPI.Core.IRepositories;
using CourierAPI.Core.Models;
using CourierAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Repositories
{
    public class MerchantRepository : IMerchantRepository
    {
        private readonly DataContext _context;

        public MerchantRepository(DataContext context)
        {
            _context = context;
        }

        //Add Merchant
        public async Task AddMerchantAsync(Merchant merchant)
        {
            await _context.Merchants.AddAsync(merchant);
        }

        //Find merchant by Email
        public async Task<Merchant> FindByMerchantEmailAsync(string merchantEmail)
        {
            var result = await (_context.Merchants.Where(m => m.Email == merchantEmail).FirstOrDefaultAsync());
            return result;
        }

        //Find by Merchant Identity
        public async Task<Merchant> FindByMerchantIdentityAsync(string merchantIdentity)
        {
            var result = await (_context.Merchants.Where(m => m.MerchantIdentity == merchantIdentity).FirstOrDefaultAsync());
            return result;
        }

        //Find merchant by Name
        public async Task<Merchant> FindByMerchantNameAsync(string merchantName)
        {
            var result = await (_context.Merchants.Where(m => m.Name == merchantName).FirstOrDefaultAsync());

            return result;
        }

        //Find merchant by Phone
        public async Task<Merchant> FindByMerchantPhoneAsync(string merchantPhone)
        {
            var result = await (_context.Merchants.Where(m => m.Phone == merchantPhone).FirstOrDefaultAsync());
            return result;
        }

        //Get merchant details by Name
        public async Task<Merchant> GetMerchantDetailsAsync(string merchantId)
        {
            var result = await (_context.Merchants.Where(m => m.Id == merchantId).FirstOrDefaultAsync());
            return result;
        }

        //Get all Merchant
        public async Task<IEnumerable<Merchant>> GetMerchantsAsync()
        {
            var merchants = await _context.Merchants.ToListAsync();
            return merchants;
        }

        public int LastMerchantId()
        {
            // var id = _context.Merchants.OrderByDescending(a =>a.Id).FirstOrDefault().Id;
            var id = _context.Merchants.Count();
            return id;
        }

        /* 
        public async Task<Merchant> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var findMerchant = await _context.Merchants.SingleOrDefaultAsync(x => x.Name == username);

            // check if username exists
            if (findMerchant == null)
                return null;

            // check if password is correct
            if (!Extensions.VerifyPasswordHash(password, findMerchant.PasswordHash, findMerchant.PasswordSalt))
                return null;

            // authentication successful
            return findMerchant;
        }


        public Merchant FindByMerchantName(string merchantId)
        {
            var result = _context.Merchants.Where(m => m.Name == merchantId).SingleOrDefault();
            return result;
            // throw new System.NotImplementedException();
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                // throw error if the new username is already taken
                if (_context.Users.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + userParam.Username + " is already taken");

                user.Username = userParam.Username;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
        */
    }
}