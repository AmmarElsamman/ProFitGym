using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccessController(IAccessValidationService accessValidationService, AppDbContext context) : BaseApiController
{
    // POST: api/access/validate
    [HttpPost("validate")]
    public async Task<ActionResult<AccessValidationResultDto>> ValidateEntry(AccessValidationRequestDto request)
    {
        var client = await context.Clients
                .FirstOrDefaultAsync(c => c.Id == request.ClientId);

        if (client == null)
        {
            return BadRequest(new AccessValidationResultDto
            {
                Allowed = false,
                Message = "Client not found"
            });
        }

        var result = accessValidationService.ValidateClientAccessAsync(client);
        return Ok(result);
    }

}
