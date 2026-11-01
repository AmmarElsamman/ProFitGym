using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Enums;
using API.Extensions;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class AccessValidationService() : IAccessValidationService
{
    public async Task<AccessValidationResultDto> ValidateClientAccessAsync(Client client)
    {
        return client.GetClientStatus() switch
        {
            ClientStatus.Cancelled => AccessDenied("Membership is cancelled.", client.FullName, client.ExpirationDate),
            ClientStatus.Frozen => AccessDenied("Membership is frozen.", client.FullName, client.ExpirationDate),
            ClientStatus.Expired => AccessDenied("Your subscription has expired.", client.FullName, client.ExpirationDate),
            _ => AccessGranted("Access granted.", client.FullName, client.ExpirationDate),
        };
    }

    private static AccessValidationResultDto AccessGranted(
        string message,
        string? clientName = null,
        DateTime? expirationDate = null)
    {
        return new AccessValidationResultDto
        {
            Allowed = true,
            Message = message,
            ClientName = clientName,
            ExpirationDate = expirationDate
        };
    }

    private static AccessValidationResultDto AccessDenied(
        string message,
        string? clientName = null,
        DateTime? expirationDate = null)
    {
        return new AccessValidationResultDto
        {
            Allowed = false,
            Message = message,
            ClientName = clientName,
            ExpirationDate = expirationDate
        };
    }
}
