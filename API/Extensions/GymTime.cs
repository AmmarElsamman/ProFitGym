namespace API.Extensions;

public static class GymTime
{
    private static readonly TimeZoneInfo _cairoTimeZone =
        TimeZoneInfo.FindSystemTimeZoneById("Africa/Cairo");
    
    public static DateTime EndOfDayUtc(DateTime utcValue)
    {
        var utc = DateTime.SpecifyKind(utcValue, DateTimeKind.Utc);
        var cairoLocal = TimeZoneInfo.ConvertTimeFromUtc(utc, _cairoTimeZone);
        var endOfDay = cairoLocal.Date.AddDays(1).AddTicks(-1);
        return TimeZoneInfo.ConvertTimeToUtc(endOfDay, _cairoTimeZone);
    }
}