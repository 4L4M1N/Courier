using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class delivPropertyUpd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receivers_Zones_ZoneId",
                table: "Receivers");

            migrationBuilder.AlterColumn<int>(
                name: "ZoneId",
                table: "Receivers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Receivers_Zones_ZoneId",
                table: "Receivers",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Receivers_Zones_ZoneId",
                table: "Receivers");

            migrationBuilder.AlterColumn<int>(
                name: "ZoneId",
                table: "Receivers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Receivers_Zones_ZoneId",
                table: "Receivers",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "ZoneId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
