using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class UpdatedItemAttribute : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MerchantIdentity",
                table: "ItemAttributes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ItemAttributes_MerchantIdentity",
                table: "ItemAttributes",
                column: "MerchantIdentity");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemAttributes_Merchants_MerchantIdentity",
                table: "ItemAttributes",
                column: "MerchantIdentity",
                principalTable: "Merchants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemAttributes_Merchants_MerchantIdentity",
                table: "ItemAttributes");

            migrationBuilder.DropIndex(
                name: "IX_ItemAttributes_MerchantIdentity",
                table: "ItemAttributes");

            migrationBuilder.DropColumn(
                name: "MerchantIdentity",
                table: "ItemAttributes");
        }
    }
}
