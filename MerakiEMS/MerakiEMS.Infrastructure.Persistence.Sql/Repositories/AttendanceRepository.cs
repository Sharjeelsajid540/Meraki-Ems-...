using MerakiEMS.Application.Common.Configuration;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly UserContext _context;
        public AttendanceRepository(UserContext context)
        {
            _context = context;
           
        }
        public async Task<List<UserAttendance>> AttendanceList(AttendanceFilter req)
        {
            IQueryable<UserAttendance> query = _context.UserAttendance;

            if (req.IsLateFilter)
            {
                query = query.Where(s => s.IsLate == true);
            }

            if (req.FineStatus)
            {
                query = query.Where(s => s.FinePaid == "Pending");
            }

            if (req.Name != null)
            {
                query = query.Where(s => s.Name == req.Name);
            }

            if (req.Date != null)
            {
                query = query.Where(s => s.CreatedAt == req.Date);
            }

            query = query.OrderByDescending(s => s.CheckInTime);

            var response = await query.ToListAsync();
            return response;
        }

        public async Task<List<UserAttendance>> SingleAttendanceList(UserAttendanceRequest req)
        {

            try
            {
                var data = await _context.UserAttendance
                    .Where(x => x.UserID == req.UserID)
                    .OrderByDescending(s => s.CheckInTime)
                    .ToListAsync();
                return data;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return null;
        }
        public async Task<CheckInResponse> InsertAttendance(CheckInRequest req)
        {
            CheckInResponse response = new CheckInResponse();
            UserAttendance attendance = new UserAttendance();

            try
            {
                var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
                var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
                var arrivalTime = DateTime.Parse(AppSettings.Configuration.AttendanceConfig.ArrivalTime);
                var minLate = TimeSpan.Parse(AppSettings.Configuration.AttendanceConfig.MinLate);
                var check = _context.UserAttendance
                    .Where(s => s.UserID == req.UserID && s.CreatedAt == Time.Date)

                    .FirstOrDefault();

                if (check == null)
                {
                    var name = _context.User
                        .Where(s => s.ID == req.UserID)
                        .FirstOrDefault();
                    attendance.CheckInTime = Time;
                    attendance.CreatedAt = Time.Date;
                    attendance.UserID = req.UserID;
                    attendance.Name = name.Name;
                    attendance.IsLate = arrivalTime.Add(minLate) <= Time;
                    attendance.IsLate = arrivalTime <= Time;

                    if (arrivalTime.Add(minLate) <= Time)
                    {
                        attendance.FinePaid = "Pending";
                    }
                    await _context.UserAttendance.AddAsync(attendance);
                    await _context.SaveChangesAsync();

                    var AId = _context.UserAttendance
                        .Where(s => s.UserID == req.UserID)
                        .OrderByDescending(s => s.ID)
                        .FirstOrDefault();

                    response.AttendanceID = AId.ID;

                    return response;
                }
                else
                {
                    response.SuccessMessage = "Already CheckedIN!";
                    var AId = _context.UserAttendance
                        .Where(s => s.UserID == req.UserID)
                        .OrderByDescending(s => s.ID)
                        .FirstOrDefault();

                    response.AttendanceID = AId.ID;
                    return response;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<UserAttendance> EditAttendance(CheckOutRequest req)
        {
            try
            {
                var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
                var workingHours = TimeSpan.FromHours(AppSettings.Configuration.AttendanceConfig.DutyHours);
                var todayDate = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
                var CheckIn = await _context.UserAttendance.Where
                        (s => s.UserID == req.UserID && s.CreatedAt == todayDate.Date && s.CheckOutTime == null).FirstOrDefaultAsync();
                if (CheckIn != null)
                {
                    CheckIn.WorkingHours = todayDate - CheckIn.CheckInTime;
                    CheckIn.CheckOutTime = todayDate;
                    CheckIn.IsHourCompleted = workingHours < CheckIn.WorkingHours;

                    _context.Update(CheckIn);

                    await _context.SaveChangesAsync();
                    return CheckIn;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CheckStatusResponse> CheckCheckIn(CheckStatusRequest req)
        {
            var result = new CheckStatusResponse();
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            var date = Time.Date;
            var response = await _context.UserAttendance.Where(s => s.UserID == req.UserID && s.CheckInTime != null && s.CreatedAt == date).FirstOrDefaultAsync();
            if (response == null)
            {
                result.Status = false;

            }
            else
            {
                result.Status = true;
            }
            return result;
        }

        public async Task<CheckStatusResponse> CheckCheckOut(CheckStatusRequest req)
        {
            var result = new CheckStatusResponse();
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            var date = Time.Date;
            var response = await _context.UserAttendance.Where(s => s.UserID == req.UserID && s.CreatedAt == date && s.CheckInTime != null && s.CheckOutTime == null).FirstOrDefaultAsync();
            if (response == null)
            {
                result.Status = false;

            }
            else
            {
                result.Status = true;
            }
            return result;
        }
    }
}
