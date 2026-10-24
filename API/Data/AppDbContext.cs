using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Client> Clients { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id = "user", Name = "User", NormalizedName = "USER" },
                new IdentityRole { Id = "moderator", Name = "Moderator", NormalizedName = "MODERATOR" },
                new IdentityRole { Id = "admin", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}
