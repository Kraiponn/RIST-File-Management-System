using file_management.Models.Domains;
using Microsoft.EntityFrameworkCore;

namespace file_management.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<DocumentCategory> DocumentCategories { get; set; }
        public DbSet<Document> Documents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Config DocumentCategory Table
            modelBuilder.Entity<DocumentCategory>(opt =>
            {
                opt.HasKey(c => c.DocumentCategoryId);
                opt.Property(c => c.DocumentCategoryId).HasColumnType("uniqueidentifier").IsRequired();

                opt.Property(c => c.Name).HasColumnType("nvarchar(100)").IsRequired();
                opt.HasIndex(c => c.Name).IsUnique();

                opt.Property(c => c.Description).HasColumnType("nvarchar(255)").IsRequired(false);
            });

            // Config Documents Table
            modelBuilder.Entity<Document>(opt =>
            {
                opt.HasKey(d => d.DocumentId);
                opt.Property(d => d.DocumentId).HasColumnType("nvarchar(89)").IsRequired();

                opt.Property(d => d.Name).HasColumnType("nvarchar(100)").IsRequired();
                opt.HasIndex(d => d.Name);

                opt.Property(d => d.Description).HasColumnType("nvarchar(255)").IsRequired(false);

                opt.Property(d => d.Path).HasColumnType("nvarchar(200)").IsRequired();

                opt.Property(d => d.Extension).HasColumnType("nvarchar(9)").IsRequired();

                opt.Property(d => d.SizeInBytes).HasColumnType("bigint").IsRequired();

                opt.Property(d => d.ActivedDate).HasColumnType("datetime").HasDefaultValueSql("getdate()");
                opt.HasIndex(d => d.ActivedDate);

                // Foriegn key 
                opt.Property(d => d.DocumentCategoryId).HasColumnType("uniqueidentifier").IsRequired();
            });

            modelBuilder.Entity<Document>()
                .HasOne(e => e.DocumentCategory)
                .WithMany()
                // .WithMany("Documents")
                .HasForeignKey(e => e.DocumentCategoryId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            // modelBuilder.Entity<DocumentCategory>()
            //     .HasMany<Document>()
            //     .WithOne(e => e.DocumentCategory)
            //     .HasForeignKey(e => e.DocumentCategoryId)
            //     .OnDelete(DeleteBehavior.Cascade);
        }
    }
}