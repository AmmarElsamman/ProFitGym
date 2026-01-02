using System;

namespace API.DTOs;

public class AccessValidationResultDto
{
    public bool Allowed { get; set; }
    public string Message { get; set; } = "";
    public string? ClientName { get; set; }
    public DateTime? ExpirationDate { get; set; }

}
