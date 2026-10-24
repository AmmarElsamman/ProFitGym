using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class LoginDto
{
    [Required]
    public required string DisplayName { get; set; }

    [Required]
    public required string Password { get; set; }

}
