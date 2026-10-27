using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IAccessValidationService
{
    Task<AccessValidationResultDto> ValidateClientAccessAsync(Client client);
}
