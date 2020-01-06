using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class updateBookingProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "ConditionCharge",
                table: "Bookings",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "CourierBill",
                table: "Bookings",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "MerchantBill",
                table: "Bookings",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ReceiverBill",
                table: "Bookings",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConditionCharge",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "CourierBill",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "MerchantBill",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ReceiverBill",
                table: "Bookings");
        }
    }
}
