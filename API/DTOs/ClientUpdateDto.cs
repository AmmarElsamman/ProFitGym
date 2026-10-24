using System;
using API.Entities;
using API.Enums;

namespace API.DTOs;

public class ClientUpdateDto
{
    public string? FullName { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public ClientStatus? Status { get; set; }
    public DateTime? SubscriptionDate { get; set; }
    public DateTime? ExpirationDate { get; set; }

}
