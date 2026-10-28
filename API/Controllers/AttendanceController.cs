using API.Data;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController(AppDbContext context) : BaseApiController
    {
        //GET api/attendance?date=2026-10-27
        [HttpGet]
        public async Task<ActionResult> GetAttendance([FromQuery] DateOnly? date)
        {
            var (start, end) = GymTime.DayRangeUtc(date ?? GymTime.TodayInCairo());

            var entries = await context.AttendanceLogs
                .Where(a => a.Timestamp >= start && a.Timestamp < end)
                .OrderByDescending(a => a.Timestamp)
                .Take(100)
                .Select(a => new { a.Id, a.ClientId, a.ClientName, a.ScannedCode, a.Allowed, a.Message, a.Timestamp })
                .ToListAsync();

            return Ok(entries); 
        }

    }
}
