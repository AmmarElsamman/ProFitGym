using System;

namespace API.Entities;

public class AttendanceLog
{
    public int Id { get; set; }
    public string? ClientId { get; set; }
    public string? ClientName { get; set; }
    public required string ScannedCode { get; set; }
    public bool Allowed { get; set; }
    public required string Message { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
