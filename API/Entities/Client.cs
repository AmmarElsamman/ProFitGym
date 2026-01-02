using API.Enums;

namespace API.Entities;

public class Client
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string FullName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public ClientStatus Status { get; set; } = ClientStatus.Active;
    public DateTime JoinDate { get; set; } = DateTime.UtcNow;
    public DateTime SubscriptionDate { get; set; } = DateTime.UtcNow;
    public DateTime ExpirationDate { get; set; }
}
