using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IAccessValidationService
{
    AccessValidationResultDto ValidateClientAccessAsync(Client client);
}
