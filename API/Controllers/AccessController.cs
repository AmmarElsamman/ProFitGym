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

    private static readonly TimeSpan DuplicateWindow = TimeSpan.FromMinutes(5);

    // POST: api/access/validate
    [HttpPost("validate")]
    public async Task<ActionResult<AccessValidationResultDto>> ValidateEntry(AccessValidationRequestDto request)
    {

        var scanned = request.ClientId.Trim();
        var id = scanned.StartsWith("CLIENT-", StringComparison.OrdinalIgnoreCase)
            ? scanned["CLIENT-".Length..]
            : scanned;

        var client = await context.Clients
                .FirstOrDefaultAsync(c => c.Id == id);

        AccessValidationResultDto result = client == null
            ? new AccessValidationResultDto { Allowed = false, Message = "Client not found" }
            : await accessValidationService.ValidateClientAccessAsync(client);

        var shouldLog = true;

        if (client != null && result.Allowed)
        {
            var since = DateTime.UtcNow - DuplicateWindow;
            shouldLog = !await context.AttendanceLogs.AnyAsync(a =>
                a.ClientId == client.Id && a.Allowed && a.Timestamp >= since);
        }

        if (shouldLog)
        {
            context.AttendanceLogs.Add(new AttendanceLog
            {
                ClientId = client?.Id,
                ClientName = client?.FullName,
                ScannedCode = scanned.Length > 100 ? scanned[..100] : scanned,
                Allowed = result.Allowed,
                Message = result.Message
            });
            await context.SaveChangesAsync();
        }

        return Ok(result);
    }

}
