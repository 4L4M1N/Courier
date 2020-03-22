using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class delivPropertyU : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryMen_Zones_ZoneId",
                table: "DeliveryMen");

            migrationBuilder.DropForeignKey(
                name: "FK_Receivers_Zones_ZoneId",
                table: "Receivers");

            migrationBuilder.AlterColumn<int>(
                name: "ZoneId",
                table: "Receivers",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ZoneId",
                table: "DeliveryMen",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryMen_Zones_ZoneId",
                table: "DeliveryMen",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Receivers_Zones_ZoneId",
                table: "Receivers",
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

            migrationBuilder.DropForeignKey(
                name: "FK_Receivers_Zones_ZoneId",
                table: "Receivers");

            migrationBuilder.AlterColumn<int>(
                name: "ZoneId",
                table: "Receivers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ZoneId",
                table: "DeliveryMen",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryMen_Zones_ZoneId",
                table: "DeliveryMen",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Receivers_Zones_ZoneId",
                table: "Receivers",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
