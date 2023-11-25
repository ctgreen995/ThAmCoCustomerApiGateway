using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Database.Data;

public partial class SmartMerchantDbContext : DbContext
{
    public SmartMerchantDbContext()
    {
    }

    public SmartMerchantDbContext(DbContextOptions<DbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CostData> CostData { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:SmartMerchantDbConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
