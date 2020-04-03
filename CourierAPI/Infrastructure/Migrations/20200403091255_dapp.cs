using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class dapp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingDetailsReport");

            migrationBuilder.DropTable(
                name: "BookingR");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookingDetailsReport",
                columns: table => new
                {
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CourierBill = table.Column<double>(type: "float", nullable: false),
                    DeliveredDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeliveryMan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MerchantBill = table.Column<double>(type: "float", nullable: false),
                    MerchantName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReceiverBill = table.Column<double>(type: "float", nullable: false),
                    ReceiverName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zone = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "BookingR",
                columns: table => new
                {
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BookingSerialNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DelivManId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DelivManName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MerchantId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MerchantName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReceiverName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Zone = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                });
        }
    }
}
