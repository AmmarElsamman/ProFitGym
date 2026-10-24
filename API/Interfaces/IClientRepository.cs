using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IClientRepository
{
    void Update(Client client);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<Client>> GetClientsAsync();
    Task<Client?> GetClientByIdAsync(string id);
    Task<string?> GetClientQrCode(string id);
    Task RegisterClient(Client client);

    Task DeleteClient(Client client);

    Task<bool> EmailExists(string email);
}
