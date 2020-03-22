using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class delivPropertyUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "DeliveryMen",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ECAddress",
                table: "DeliveryMen",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ECName",
                table: "DeliveryMen",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ECPhone",
                table: "DeliveryMen",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NID",
                table: "DeliveryMen",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ZoneId",
                table: "DeliveryMen",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryMen_ZoneId",
                table: "DeliveryMen",
                column: "ZoneId");

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

            migrationBuilder.DropIndex(
                name: "IX_DeliveryMen_ZoneId",
                table: "DeliveryMen");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "DeliveryMen");

            migrationBuilder.DropColumn(
                name: "ECAddress",
                table: "DeliveryMen");

            migrationBuilder.DropColumn(
                name: "ECName",
                table: "DeliveryMen");

            migrationBuilder.DropColumn(
                name: "ECPhone",
                table: "DeliveryMen");

            migrationBuilder.DropColumn(
                name: "NID",
                table: "DeliveryMen");

            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "DeliveryMen");
        }
    }
}
