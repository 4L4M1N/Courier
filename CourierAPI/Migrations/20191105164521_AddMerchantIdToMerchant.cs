using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Migrations
{
    public partial class AddMerchantIdToMerchant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MerchantId",
                table: "Merchants",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MerchantId",
                table: "Merchants");
        }
    }
}
