using System;
using API.Entities;
using API.Enums;

namespace API.Extensions;

public static class ClientExtensions
{
    public static ClientStatus GetClientStatus(this Client client, DateTime? utcNow = null)
    {
        if (client.Status == ClientStatus.Cancelled) return ClientStatus.Cancelled;
        if (client.Status == ClientStatus.Frozen) return ClientStatus.Frozen;

        return GymTime.EndOfDayUtc(client.ExpirationDate) < (utcNow ?? DateTime.UtcNow)
           ? ClientStatus.Expired
           : ClientStatus.Active;
    }
}
