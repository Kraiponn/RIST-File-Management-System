﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using file_management.Data;

#nullable disable

namespace file_management.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("file_management.Models.Domains.Document", b =>
                {
                    b.Property<string>("DocumentId")
                        .HasColumnType("nvarchar(89)");

                    b.Property<DateTime>("ActivedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(255)");

                    b.Property<Guid>("DocumentCategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Extension")
                        .IsRequired()
                        .HasColumnType("nvarchar(9)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)");

                    b.Property<long>("SizeInBytes")
                        .HasColumnType("bigint");

                    b.HasKey("DocumentId");

                    b.HasIndex("ActivedDate");

                    b.HasIndex("DocumentCategoryId");

                    b.HasIndex("Name");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("file_management.Models.Domains.DocumentCategory", b =>
                {
                    b.Property<Guid>("DocumentCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("DocumentCategoryId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("DocumentCategories");
                });

            modelBuilder.Entity("file_management.Models.Domains.Document", b =>
                {
                    b.HasOne("file_management.Models.Domains.DocumentCategory", "DocumentCategory")
                        .WithMany()
                        .HasForeignKey("DocumentCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DocumentCategory");
                });
#pragma warning restore 612, 618
        }
    }
}