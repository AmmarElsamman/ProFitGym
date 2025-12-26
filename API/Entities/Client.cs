namespace API.Entities;

public class Client
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string FullName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string? Email { get; set; }
    public required string PhoneNumber { get; set; }

    public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
    public DateTime ExpirationDate { get; set; }
}
