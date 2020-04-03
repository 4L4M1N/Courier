using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class myuiop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookingDetailsReport",
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

            migrationBuilder.CreateTable(
                name: "BookingR",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: true),
                    BookingDate = table.Column<DateTime>(nullable: false),
                    ReceiverName = table.Column<string>(nullable: true),
                    DelivManName = table.Column<string>(nullable: true),
                    DelivManId = table.Column<string>(nullable: true),
                    Zone = table.Column<string>(nullable: true),
                    BookingSerialNo = table.Column<string>(nullable: true),
                    MerchantName = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    MerchantId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingDetailsReport");

            migrationBuilder.DropTable(
                name: "BookingR");
        }
    }
}
