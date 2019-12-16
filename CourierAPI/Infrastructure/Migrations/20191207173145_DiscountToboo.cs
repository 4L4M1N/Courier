using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class DiscountToboo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "ItemAttributes");

            migrationBuilder.AlterColumn<double>(
                name: "TotalAmmount",
                table: "Bookings",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "Bookings",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "IsConditionChargeApply",
                table: "BookingItems",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsInCity",
                table: "BookingItems",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "IsConditionChargeApply",
                table: "BookingItems");

            migrationBuilder.DropColumn(
                name: "IsInCity",
                table: "BookingItems");

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "ItemAttributes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<int>(
                name: "TotalAmmount",
                table: "Bookings",
                type: "int",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
