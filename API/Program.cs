using System.Text;
using API.Data;
using API.Data.Repositories;
using API.Entities;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
   opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(options =>
   {
      var tokenKey = builder.Configuration["TokenKey"]
         ?? throw new Exception("Token key not found");
      options.TokenValidationParameters = new TokenValidationParameters
      {
         ValidateIssuerSigningKey = true,
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
         ValidateIssuer = false,
         ValidateAudience = false
      };
   });
#pragma warning disable CA1416 // Validate platform compatibility
builder.Services.AddScoped<IQRCodeService, QRcodeService>();
builder.Services.AddScoped<IAccessValidationService, AccessValidationService>();
#pragma warning restore CA1416 // Validate platform compatibility
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddIdentityCore<AppUser>(opt =>
{
   opt.Password.RequireDigit = false;
   opt.Password.RequiredUniqueChars = 0;
   opt.Password.RequireUppercase = false;
   opt.Password.RequireNonAlphanumeric = false;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
   var services = scope.ServiceProvider;
   try
   {
      var context = services.GetRequiredService<AppDbContext>();
      await context.Database.MigrateAsync();
   }
   catch (Exception ex)
   {
      var logger = services.GetRequiredService<ILogger<Program>>();
      logger.LogError(ex, "Database migration failed");
      throw;
   }
}

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
   .WithOrigins("http://localhost:4200", "https://localhost:4200"));


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
