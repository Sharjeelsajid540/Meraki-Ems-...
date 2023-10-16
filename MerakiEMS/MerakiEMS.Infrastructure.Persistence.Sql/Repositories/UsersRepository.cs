using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using System.Security.Cryptography;
using Org.BouncyCastle.Ocsp;
using System;
using MerakiEMS.Application.Common.Configuration;
using FluentValidation;
using System.Xml.Linq;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly UserContext _context;
        private IConfiguration _config;

        public UsersRepository(UserContext context, IConfiguration config)
        {
            _context = context;
            _config = config;

        }


        public async Task<User> CheckUser(User user)
        {

            var userr = await _context.User
                .Where(s => s.Name == user.Name).FirstOrDefaultAsync();

            if (userr == null)
            {
                await _context.AddAsync(user);
                await _context.SaveChangesAsync();
                return user;
            }
            return null;
        }


        public async Task<List<GetUsersResponse>> GetAllUsers()
        {



            List<GetUsersResponse> users = new List<GetUsersResponse>();
            //User user = new User();
            try {
                var user = await _context.User.OrderByDescending(s => s.ID).ToListAsync();

                foreach (var u in user)
                {
                    var response = new GetUsersResponse();
                    try
                    {
                        var userRoleid = await _context.UserRole.Where(s => s.UserID == u.ID).FirstOrDefaultAsync();
                        var userRole = await _context.Role.Where(s => s.ID == userRoleid.RoleID).FirstOrDefaultAsync();

                        var manager = await _context.User.Where(s => s.ID == u.ManagerID).FirstOrDefaultAsync();



                        response.UserID = u.ID;
                        response.Name = u.Name;
                        response.CNIC = u.CNIC;
                        response.Address = u.Address;
                        response.ContactNo = u.ContactNo;
                        response.Email = u.Email;
                        response.EContactNo = u.EContactNo;
                        response.Manager = manager == null ? null : manager.Name;
                        response.ManagerID = manager == null ? 0 : manager.ManagerID;
                        response.Role = userRole == null ? null : userRole.RoleName;
                        response.RoleID = userRole == null ? 0 : userRole.ID;
                        response.Manager = manager == null ? null : manager.Name;
                        response.ManagerID = u.ManagerID;
                        response.Role = userRole.RoleName;
                        response.RoleID = userRole.ID;
                        response.Image = u.Image;
                    }
                    catch (Exception ex)
                    {
                        response.Message = ex.Message;
                    }
                    users.Add(response);
                }

                return users;
            }
            catch (Exception ex)
            {
                var response = new GetUsersResponse();
                response.Message = ex.Message;
                users.Add(response);
                return users;


            }
        }
        public async Task<GetUsersResponse> GetUser(int id)
        {

            //User user = new User();
            var user = await _context.User.Where(s => s.ID == id).FirstOrDefaultAsync();


            var userRoleid = _context.UserRole.Where(s => s.UserID == user.ID).FirstOrDefault();
            var userRole = _context.Role.Where(s => s.ID == userRoleid.RoleID).FirstOrDefault();

            var manager = _context.User.Where(s => s.ID == user.ManagerID).FirstOrDefault();

            var response = new GetUsersResponse();
            response.UserID = user.ID;
            response.Name = user.Name;
            response.CNIC = user.CNIC;
            response.Address = user.Address;
            response.ContactNo = user.ContactNo;
            response.Email = user.Email;
            response.EContactNo = user.EContactNo;
            response.Manager = manager == null ? null : manager.Name;
            response.ManagerID = manager == null ? 0 : manager.ManagerID;
            response.Role = userRole.RoleName;
            response.RoleID = userRole.ID;
            response.Image = user.Image;


            return response;
        }


        public async Task<LeaveEmailResponse> SendLeaveEmail(EmailID req)
        {
            
            var userIdsWithRole1 = await _context.UserRole
                .Where(ur => ur.RoleID == 1 && ur.UserID != req.ID)
                .Select(ur => ur.UserID)
                .ToListAsync();

            
            var user = await _context.User
                .Where(u => u.ID == req.ID)
                .FirstOrDefaultAsync();

            
            if (user != null)
            {
                
                var manager = await _context.User
                    .Where(u => u.ID == user.ManagerID)
                    .FirstOrDefaultAsync();

                if (manager != null)
                {
                  
                    var leaveData = await _context.Leave
                        .Where(x => x.UserID == req.ID)
                        .FirstOrDefaultAsync();

                    if (leaveData != null)
                    {
                       
                        var response = new LeaveEmailResponse();
                        response.ID = req.ID;
                        response.ManagerName = manager.Name;
                        response.EmpName = user.Name;
                        response.Description = req.Description;
                        response.From = req.From;
                        response.To = req.To;

                        
                        var userEmails = await _context.User
                            .Where(u => userIdsWithRole1.Contains(u.ID))
                            .Select(u => u.Email)
                            .ToListAsync();

                        response.Emails = userEmails;


                        return response;
                    }
                }
            }

            return null;
        }


        public async Task<User> UpdateUser(UpdateUserRequest user)
        {
            try
            {


                var res = await _context.User.Where(s => s.ID == user.ID).FirstOrDefaultAsync();

                res.CNIC = user.CNIC;
                res.Name = user.Name;
                res.Email = user.Email;
                res.EContactNo = user.EContactNo;
                res.ContactNo = user.ContactNo;
                res.Address = user.Address;
                res.ManagerID = user.ManagerID;
                res.Image = user.Image;


                _context.User.Update(res);
                await _context.SaveChangesAsync();

                var urole = await _context.UserRole.Where(s => s.UserID == user.ID).FirstOrDefaultAsync();
                urole.RoleID = user.RoleID;
                _context.UserRole.Update(urole);
                await _context.SaveChangesAsync();
                return res;
            }
            catch (Exception ex) {
                throw ex;
            }
        }

        public async Task<User> DeleteUser(int id)
        {
            try
            {


                var res = await _context.User.Where(s => s.ID == id).FirstOrDefaultAsync();



                _context.User.Remove(res);
                await _context.SaveChangesAsync();
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<Leave> AdminLeaveRequest(AdminRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            var CheckIn = await _context.Leave.Where
            (s => s.ID == req.ID).FirstOrDefaultAsync();
            if (CheckIn != null)
            {
                CheckIn.AdminRequestViewer = req.AdminRequestViewer;
                CheckIn.Status = req.Status;
                CheckIn.Comments = req.Comments;
                CheckIn.UpdatedAt = Time;


                await _context.SaveChangesAsync();
            }
            return CheckIn;
        }


        public async Task<Leave> RequestLeave(LeaveRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            Leave leave = new Leave
            { ID = req.ID,
                UserID = req.UserID,
                Name = req.Name,
                From = req.From,
                To = req.To,
                Description = req.Description,
                Comments = req.Comments,
                UpdatedAt = req.UpdatedAt,
                LeaveType = req.LeaveType,
                CreatedAt = Time,
                AdminRequestViewer = "",
                Status = "Pending"
            };

            _context.Leave.Add(leave);
            await _context.SaveChangesAsync();
            return leave;
        }


        public async Task<Performance> AddPerform(PerformanceRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);

        
            var user = await _context.User
               .Where(u => u.Name == req.Name)
               .FirstOrDefaultAsync();

           

            if (user == null )
            {

                
                return null;
            }

            Performance perform = new Performance();


                perform.UserID = user.ID;
                perform.EmployeeName = user.Name; 
                perform.Severity = req.Severity;
                perform.Date = Time;
                perform.Comments = req.Comments;
            

            await _context.Performance.AddAsync(perform); 
            await _context.SaveChangesAsync();
            return perform;
        }

        public async Task<List<Performance>> GetPerform()
        {
            var response = await _context.Performance.OrderByDescending(s => s.Date).ToListAsync();
            return response;
        }



        public async Task<List<Leave>> GetLeave()
        {
            var response = await _context.Leave.OrderByDescending(s => s.ID).ToListAsync();
            return response;
        }



        public async Task<List<Leave>> GetAllLeaves(UserID user)
        {
            var response = await _context.Leave.Where(s => s.UserID == user.ID).OrderByDescending(s => s.From).ToListAsync();
            return response;
        }

        public async Task<User> InsertUser(AddEmployeeRequest req)
        {
            User user = new User();
            UserRole role = new UserRole();
            user.Name = req.Name;
            user.Password = req.Password;
            user.Email = req.Email;
            user.Address = req.Address;
            user.CNIC = req.CNIC;
            user.ContactNo = req.ContactNo;
            user.EContactNo = req.EContactNo;
            user.ManagerID = req.ManagerID;
            user.Image = req.Image;

            var check = await _context.User
               .Where(s => s.Name == user.Name).FirstOrDefaultAsync();
            if (check == null)
            {
                _context.User.Add(user);
                await _context.SaveChangesAsync();
                var userr = await _context.User
               .Where(s => s.Name == user.Name && s.Password == user.Password).FirstOrDefaultAsync();
                if (userr == null)
                {
                    return null;
                }
                else
                {
                    role.UserID = userr == null ? 0 : userr.ID;
                    role.RoleID = req.RoleID;
                }
                _context.UserRole.Add(role);
                await _context.SaveChangesAsync();

                return new User();
            }
            else
            {
                return null;
            }
        }
        public async Task<List<Role>> RoleList()
        {

            var response = await _context.Role.ToListAsync();
            return response;
        }
        public async Task<List<ManagerListResponse>> MangerList()
        {
            var list = new List<ManagerListResponse>();
            var response = await _context.UserRole.ToListAsync();
            foreach (var item in response)
            {
                if (item.RoleID == 1 || item.RoleID == 3)
                {
                    var name = await _context.User.Where(s => s.ID == item.UserID).FirstOrDefaultAsync();
                    ManagerListResponse manager = new ManagerListResponse();
                    manager.ManagerID = item.UserID;
                    manager.ManagerName = name.Name;
                    list.Add(manager);

                }


            }
            return list;
        }

        public async Task<List<UserListResponse>> UserList()
        {
            var list = new List<UserListResponse>();
            var response = await _context.UserRole.ToListAsync();
            foreach (var item in response)
            {
                if (item.RoleID == 2 || item.RoleID == 3)
                {
                    var name = await _context.User.Where(s => s.ID == item.UserID).FirstOrDefaultAsync();
                    UserListResponse user = new UserListResponse();
                    user.UserID = item.UserID;
                    user.UserName = name.Name;
                    list.Add(user);

                }


            }
            return list;
        }
        public async Task<List<UserAttendance>> AttendanceList()
        {

            var response = await _context.UserAttendance.OrderByDescending(s => s.CheckInTime).ToListAsync();
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




        public async Task<LoginResponse> CheckLogin(User user)
        {
            LoginResponse response = new LoginResponse();
            var userr = await _context.User
           .Where(s => s.Name == user.Name && s.Password == user.Password).FirstOrDefaultAsync();
            if (userr == null)
            {
                return null;
            }
            else
            {
                response.Name = userr.Name;
                response.Id = userr.ID;

            }
            var rl = await _context.UserRole.Where(s => s.UserID == userr.ID).FirstOrDefaultAsync();
            if (rl == null)
            {
                return null;
            }
            var userRole = await _context.Role
               .Where(s => s.ID == rl.RoleID).FirstOrDefaultAsync();
            if (userRole == null)
            {
                return null;
            }
            else
            {
                response.UserRole = userRole.RoleName;
                response.RoleID = userRole.ID;

            }
            var rp = await _context.RolePermissions.Where(s => s.RoleID == userRole.ID).ToListAsync();
            if (rp == null)
            {
                return null;
            }

            foreach (var r in rp)
            {
                var userPrem = await _context.Permissions
                   .Where(s => s.ID == r.PermissionID).FirstOrDefaultAsync();
                if (userPrem == null)
                {
                    return null;
                }
                else
                {
                    if (response.UserPermissions == null)
                    {
                        response.UserPermissions = new List<string>();
                        response.PermissionID = new List<int>();
                    }

                    response.UserPermissions.Add(userPrem.Permission);
                    response.PermissionID.Add(userPrem.ID);
                }
            }

            return response;
        }
        public async Task<string> GenerateToken(LoginResponse response)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], null,
            expires: DateTime.UtcNow.AddMinutes(2),
            signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
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
                var allowedTime = TimeZoneInfo.ConvertTimeToUtc(arrivalTime, pakistanTimeZone);

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
                        attendance.IsLate = allowedTime <= Time;


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
                var workingHours = TimeSpan.FromHours(AppSettings.Configuration.AttendanceConfig.DutyHours);
                var CheckIn =await _context.UserAttendance.Where
                        (s => s.ID == req.AttendanceID).FirstOrDefaultAsync();
                if (CheckIn.CheckOutTime == null)
                {
                    var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
                    var checkOutTime = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);

                    CheckIn.WorkingHours = checkOutTime - CheckIn.CheckInTime;
                    CheckIn.CheckOutTime = checkOutTime;
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
        public async Task<AddTicketResponse> AddTicket(Tickets ticket)
        {
            try
               
            {
                var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
                var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
                ticket.Status = "Pending";
                ticket.CreatedAt = Time;
                ticket.UpdatedAt = Time;
                _context.Tickets.Add(ticket);
                AddTicketResponse res = new AddTicketResponse();
                await _context.SaveChangesAsync();
                return res;

            }
            catch(Exception ex)
            {
                throw (ex);
                return null;
            }
            
        }
        public async Task<List<Tickets>> GetAllTickets()
        {
            var response = await _context.Tickets.OrderByDescending(s => s.CreatedAt).ToListAsync();
            if(response == null)
            {
                return null;
            }
            else
            {
                return response;
            }
        }
        public async Task<List<Tickets>> GetTickets(int id)
        {
            var response = await _context.Tickets.Where(s => s.RequesterID == id).ToListAsync();
            if (response == null)
            {
                return null;
            }
            else
            {
                return response;
            }
        }
        public async Task<AddTicketResponse> UpdateTickets(UpdateTicketRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            AddTicketResponse res = new AddTicketResponse();
            var response = await _context.Tickets.Where(s => s.ID == req.ID).FirstOrDefaultAsync();
            if (response == null)
            {
                return null;
            }
            else
            {
                response.Status = req.Status;
                response.Reviewer = req.Reviewer;
                response.UpdatedAt = Time;
                await _context.SaveChangesAsync();
                return res;
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
            var response = await _context.UserAttendance.Where(s => s.UserID == req.UserID && s.CreatedAt == date && s.CheckInTime!=null && s.CheckOutTime==null).FirstOrDefaultAsync();
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
