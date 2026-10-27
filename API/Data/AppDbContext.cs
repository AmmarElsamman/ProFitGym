using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Client> Clients { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        var utcConverter = new ValueConverter<DateTime, DateTime>(
            v => v.Kind == DateTimeKind.Local ? v.ToUniversalTime() : DateTime.SpecifyKind(v, DateTimeKind.Utc),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id = "user", Name = "User", NormalizedName = "USER" },
                new IdentityRole { Id = "moderator", Name = "Moderator", NormalizedName = "MODERATOR" },
                new IdentityRole { Id = "admin", Name = "Admin", NormalizedName = "ADMIN" }
            );

        builder.Entity<Client>(e =>
        {
            e.Property(c => c.JoinDate).HasConversion(utcConverter);
            e.Property(c => c.SubscriptionDate).HasConversion(utcConverter);
            e.Property(c => c.ExpirationDate).HasConversion(utcConverter);

        });
    }
}
