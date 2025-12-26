using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")] // localhost:5001/api/clients
    [ApiController]
    public class ClientsController(AppDbContext context) : ControllerBase
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

    }
}
