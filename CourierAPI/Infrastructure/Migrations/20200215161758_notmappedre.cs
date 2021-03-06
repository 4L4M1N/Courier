﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CourierAPI.Infrastructure.Migrations
{
    public partial class notmappedre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Merchants",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Merchants",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Merchants");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Merchants");
        }
    }
}
