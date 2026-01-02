using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class RefactoringClientEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RegistrationDate",
                table: "Clients",
                newName: "SubscriptionDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "JoinDate",
                table: "Clients",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JoinDate",
                table: "Clients");

            migrationBuilder.RenameColumn(
                name: "SubscriptionDate",
                table: "Clients",
                newName: "RegistrationDate");
        }
    }
}
