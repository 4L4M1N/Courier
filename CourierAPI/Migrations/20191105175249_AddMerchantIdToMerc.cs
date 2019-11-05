using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Migrations
{
    public partial class AddMerchantIdToMerc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MerchantId",
                table: "Merchants");

            migrationBuilder.AddColumn<string>(
                name: "MerchantIdentity",
                table: "Merchants",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MerchantIdentity",
                table: "Merchants");

            migrationBuilder.AddColumn<string>(
                name: "MerchantId",
                table: "Merchants",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
