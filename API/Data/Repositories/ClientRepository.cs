using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class ClientRepository(AppDbContext context, IQRCodeService qrCodeService) : IClientRepository
{
    public async Task DeleteClient(Client client)
    {
        context.Clients.Remove(client);
    }

    public async Task<bool> EmailExists(string email)
    {
        return await context.Clients.AnyAsync(c => c.Email.ToLower() == email.ToLower());
    }

    public async Task<Client?> GetClientByIdAsync(string id)
    {
        return await context.Clients.FindAsync(id);
    }

    public async Task<string?> GetClientQrCode(string id)
    {
        var client = await context.Clients.FindAsync(id);
        if (client == null) return null;

        return qrCodeService.GenerateQRCodeBase64(id, 20);
    }

    public async Task<IReadOnlyList<Client>> GetClientsAsync()
    {
        return await context.Clients.ToListAsync();
    }

    public async Task RegisterClient(Client client)
    {
        await context.Clients.AddAsync(client);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(Client client)
    {
        context.Entry(client).State = EntityState.Modified;
    }
}
