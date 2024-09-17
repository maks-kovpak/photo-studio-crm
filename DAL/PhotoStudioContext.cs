using Microsoft.EntityFrameworkCore;

using PhotoStudio.Models;

namespace PhotoStudio.DAL;

public partial class PhotoStudioContext : DbContext {
    public virtual DbSet<Client> Clients { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderItem> OrderItems { get; set; }
    public virtual DbSet<Service> Services { get; set; }

    public PhotoStudioContext(DbContextOptions<PhotoStudioContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Client>(entity => {
            entity.ToTable("Client");

            entity.Property(e => e.Address).HasColumnType("NVARCHAR(300)");
            entity.Property(e => e.FirstName).HasColumnType("NVARCHAR(50)");
            entity.Property(e => e.LastName).HasColumnType("NVARCHAR(50)");
            entity.Property(e => e.Patronymic).HasColumnType("NVARCHAR(50)");
            entity.Property(e => e.Phone).HasColumnType("NVARCHAR(15)");
        });

        modelBuilder.Entity<Order>(entity => {
            entity.ToTable("Order");

            entity.Property(e => e.AcceptanceDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("TIMESTAMP");

            entity.Property(e => e.IssuanceDate).HasColumnType("DATE");

            entity.HasOne(d => d.Client).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ClientId);
        });

        modelBuilder.Entity<OrderItem>(entity => {
            entity.ToTable("OrderItem");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId);

            entity.HasOne(d => d.Service).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ServiceId);
        });

        modelBuilder.Entity<Service>(entity => {
            entity.ToTable("Service");

            entity.Property(e => e.Description).HasColumnType("NVARCHAR(500)");
            entity.Property(e => e.Name).HasColumnType("NVARCHAR(255)");
            entity.Property(e => e.Price).HasColumnType("DECIMAL(10, 2)");
        });
    }
}
