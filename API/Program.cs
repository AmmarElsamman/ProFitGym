using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
   opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")); 
});
builder.Services.AddCors();
#pragma warning disable CA1416 // Validate platform compatibility
builder.Services.AddScoped<IQRCodeService, QRcodeService>();
builder.Services.AddScoped<IAccessValidationService, AccessValidationService>();
#pragma warning restore CA1416 // Validate platform compatibility

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
   .WithOrigins("http://localhost:4200" , "https://localhost:4200")); 
   
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
