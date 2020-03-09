using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class notmapped : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Merchants");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Merchants");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ShowBookings",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ShowBookingDetailsReport",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: true),
                    MerchantName = table.Column<string>(nullable: true),
                    ReceiverName = table.Column<string>(nullable: true),
                    BookingDate = table.Column<DateTime>(nullable: false),
                    DeliveredDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    Zone = table.Column<string>(nullable: true),
                    DeliveryMan = table.Column<string>(nullable: true),
                    CourierBill = table.Column<double>(nullable: false),
                    MerchantBill = table.Column<double>(nullable: false),
                    ReceiverBill = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShowBookingDetailsReport");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ShowBookings");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Merchants",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Merchants",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
