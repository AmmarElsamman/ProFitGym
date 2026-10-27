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
        try
        {
            if (client.Status != ClientStatus.Active)
            {
                return AccessDenied(
                    client.Status == ClientStatus.Frozen ? "Membership is frozen." : "Membership is inactive.",
                    clientName: client.FullName, expirationDate: client.ExpirationDate);
            }

            if (GymTime.EndOfDayUtc(client.ExpirationDate) < DateTime.UtcNow)
            {
                return AccessDenied("Your subscription has expired.", clientName: client.FullName, expirationDate: client.ExpirationDate);
            }

            return AccessGranted("Access granted.", clientName: client.FullName, expirationDate: client.ExpirationDate);
        }
        catch (Exception)
        {
            return AccessDenied("System error. Please contact reception.");
        }
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
