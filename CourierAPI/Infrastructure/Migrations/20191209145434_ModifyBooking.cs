using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class ModifyBooking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DelivManIdentity",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOutCity",
                table: "BookingItems",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DelivManIdentity",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "IsOutCity",
                table: "BookingItems");
        }
    }
}
