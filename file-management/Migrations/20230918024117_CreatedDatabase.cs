using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace file_management.Migrations
{
    /// <inheritdoc />
    public partial class CreatedDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DocumentCategories",
                columns: table => new
                {
                    DocumentCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentCategories", x => x.DocumentCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    DocumentId = table.Column<string>(type: "nvarchar(89)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Path = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    Extension = table.Column<string>(type: "nvarchar(9)", nullable: false),
                    SizeInBytes = table.Column<long>(type: "bigint", nullable: false),
                    ActivedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "getdate()"),
                    DocumentCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.DocumentId);
                    table.ForeignKey(
                        name: "FK_Documents_DocumentCategories_DocumentCategoryId",
                        column: x => x.DocumentCategoryId,
                        principalTable: "DocumentCategories",
                        principalColumn: "DocumentCategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentCategories_Name",
                table: "DocumentCategories",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_ActivedDate",
                table: "Documents",
                column: "ActivedDate");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_DocumentCategoryId",
                table: "Documents",
                column: "DocumentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_Name",
                table: "Documents",
                column: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DropTable(
                name: "DocumentCategories");
        }
    }
}
