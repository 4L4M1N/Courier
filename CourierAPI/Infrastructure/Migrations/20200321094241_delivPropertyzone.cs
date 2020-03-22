using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class delivPropertyzone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryMen_Zones_ZoneId",
                table: "DeliveryMen");

            migrationBuilder.AlterColumn<int>(
                name: "ZoneId",
                table: "DeliveryMen",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryMen_Zones_ZoneId",
                table: "DeliveryMen",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryMen_Zones_ZoneId",
                table: "DeliveryMen");

            migrationBuilder.AlterColumn<int>(
                name: "ZoneId",
                table: "DeliveryMen",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryMen_Zones_ZoneId",
                table: "DeliveryMen",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
