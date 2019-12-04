using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class passToDelivaryMan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "DeliveryMen",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "DeliveryMen",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ShowBookings",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: true),
                    BookingDate = table.Column<DateTime>(nullable: false),
                    ReceiverName = table.Column<string>(nullable: true),
                    DelivManName = table.Column<string>(nullable: true),
                    Zone = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShowBookings");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "DeliveryMen");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "DeliveryMen");
        }
    }
}
