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

    public static DateOnly TodayInCairo()
    {
        var cairoNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, _cairoTimeZone);
        return DateOnly.FromDateTime(cairoNow);
    }

    // Start and end of a Cairo calendar day, as UTC
    public static (DateTime StartUtc, DateTime EndUtc) DayRangeUtc(DateOnly day)
    {
        static DateTime ToUtc(DateTime local) =>
            TimeZoneInfo.ConvertTimeToUtc(
                _cairoTimeZone.IsInvalidTime(local) ? local.AddHours(1) : local,
                _cairoTimeZone);

        var start = ToUtc(day.ToDateTime(TimeOnly.MinValue));
        var end = ToUtc(day.AddDays(1).ToDateTime(TimeOnly.MinValue));
        return (start, end);
    }
}