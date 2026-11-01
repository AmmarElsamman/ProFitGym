using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RenewClientDto
{
    [Range(1, 12)]
    public int Months { get; set; }
}
