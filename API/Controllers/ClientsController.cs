using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ClientsController(AppDbContext context, IQRCodeService qrCodeService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Client>>> GetClients() // * ActionResult allows returning different HTTP responses
        {
            var clients = await context.Clients.ToListAsync();
            return clients;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(string id)
        {
            var client = await context.Clients.FindAsync(id);
            if (client == null) return NotFound(); // Returns a 404 Not Found response
            return client;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<Client>> RegisterClient(RegisterClientDto registerDto)
        {

            if (await EmailExists(registerDto.Email))
            {
                return BadRequest("Email is already in use.");
            }

            var client = new Client
            {
                FullName = registerDto.FullName,
                DateOfBirth = registerDto.DateOfBirth,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                SubscriptionDate = registerDto.SubscriptionDate,
                ExpirationDate = registerDto.SubscriptionDate.AddMonths(registerDto.MembershipDurationInMonths)
            };

            context.Clients.Add(client);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }

        // GET: api/client/{id}/qrcode
        [HttpGet("{id}/qrcode")]
        public async Task<ActionResult> GetClientQRCode(string id, [FromQuery] bool download = false)
        {
            var client = await context.Clients.FindAsync(id);
            
            if (client == null)
                return NotFound();

            byte[] qrCodeBytes = qrCodeService.GenerateQRCode(id, 20);

            if (download)
            {
                return File(
                    qrCodeBytes, 
                    "image/png", 
                    $"{client.FullName}_QRCode.png"
                );
            }

            return File(qrCodeBytes, "image/png");
        }

        private async Task<bool> EmailExists(string email)
        {
            return await context.Clients.AnyAsync(c => c.Email.ToLower() == email.ToLower());
        }

    }
}
