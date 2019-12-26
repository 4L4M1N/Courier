using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class UpdatedItemAttributeOne : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemAttributes_Merchants_MerchantIdentity",
                table: "ItemAttributes");

            migrationBuilder.DropIndex(
                name: "IX_ItemAttributes_MerchantIdentity",
                table: "ItemAttributes");

            migrationBuilder.AlterColumn<string>(
                name: "MerchantIdentity",
                table: "ItemAttributes",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MerchantIdentity",
                table: "ItemAttributes",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

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
    }
}
