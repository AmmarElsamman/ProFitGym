using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ClientsController(IClientRepository clientRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Client>>> GetClients() // * ActionResult allows returning different HTTP responses
        {
            return Ok(await clientRepository.GetClientsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(string id)
        {
            var client = await clientRepository.GetClientByIdAsync(id);
            if (client == null) return NotFound(); // Returns a 404 Not Found response
            return client;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Client>> RegisterClient(RegisterClientDto registerDto)
        {

            if (await clientRepository.EmailExists(registerDto.Email))
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


            await clientRepository.RegisterClient(client);
            if (await clientRepository.SaveAllAsync()) return client;

            return BadRequest("Failed to register client.");
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(string id)
        {
            var client = await clientRepository.GetClientByIdAsync(id);
            if (client == null) return NotFound(); // Returns a 404 Not Found response

            await clientRepository.DeleteClient(client);
            if (await clientRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to delete client.");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClient(string id, ClientUpdateDto clientUpdateDto)
        {
            var clientId = id;
            if (clientId == null) return BadRequest("NO ID FOUND IN URL");

            var client = await clientRepository.GetClientByIdAsync(clientId);
            if (client == null) return BadRequest("Cound not get client");

            client.FullName = clientUpdateDto.FullName ?? client.FullName;
            client.DateOfBirth = clientUpdateDto.DateOfBirth ?? client.DateOfBirth;
            client.Email = clientUpdateDto.Email ?? client.Email;
            client.PhoneNumber = clientUpdateDto.PhoneNumber ?? client.PhoneNumber;
            client.Status = clientUpdateDto.Status ?? client.Status;
            client.SubscriptionDate = clientUpdateDto.SubscriptionDate ?? client.SubscriptionDate;
            client.ExpirationDate = clientUpdateDto.ExpirationDate ?? client.ExpirationDate;

            clientRepository.Update(client);

            if (await clientRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update client.");
        }


        // GET: api/clients/{id}/qrcode
        [HttpGet("{id}/qrcode")]
        public async Task<ActionResult<string>> GetClientQRCode(string id, [FromQuery] bool download = false)
        {
            var qrCode = await clientRepository.GetClientQrCode(id);
            if (qrCode == null) return NotFound();

            return Ok(new { qrCode });
        }


    }
}
