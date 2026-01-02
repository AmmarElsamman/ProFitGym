using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterClientDto
{
    [Required]
    public string FullName { get; set; } = "";
    public DateTime DateOfBirth { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";
    [Required]
    public string PhoneNumber { get; set; } = "";
    public DateTime SubscriptionDate { get; set; } = DateTime.UtcNow;
    public int MembershipDurationInMonths { get; set; } = 1;
}
