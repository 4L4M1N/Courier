using CourierAPI.Core.Models;
using CourierAPI.Core.Query;
using CourierAPI.Core.ReportFormat;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CourierAPI.Infrastructure.Data
{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
        public DbSet<AppUser> AppUsers {get; set;}
        public DbSet<Merchant> Merchants { get; set; }
        public DbSet<Division> Divisions { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemAttribute> ItemAttributes { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Receiver> Receivers { get; set; }
        public DbSet<BookingItem> BookingItems { get; set; }
        public DbSet<DeliveryMan> DeliveryMen { get; set; }
        public DbSet<AssignedDelivMan> AssignedDelivMen { get; set; }

        public DbSet<CommonInfo> CommonInfos { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<RequestBooking> RequestBookings { get; set; }
        public DbSet<Status> Statuses { get; set; }

        //Query
        public DbQuery<BookingR> ShowBookings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Override default AspNet Identity table names
            builder.Entity<IdentityUser>(entity => { entity.ToTable(name: "Users"); });
            builder.Entity<IdentityRole>(entity => { entity.ToTable(name: "Roles"); });
            builder.Entity<IdentityUserRole<string>>(entity => { entity.ToTable("UserRoles"); });
            builder.Entity<IdentityUserClaim<string>>(entity => { entity.ToTable("UserClaims"); });
            builder.Entity<IdentityUserLogin<string>>(entity => { entity.ToTable("UserLogins"); });
            builder.Entity<IdentityUserToken<string>>(entity => { entity.ToTable("UserTokens"); });
            builder.Entity<IdentityRoleClaim<string>>(entity => { entity.ToTable("RoleClaims"); });
        }

    }
}