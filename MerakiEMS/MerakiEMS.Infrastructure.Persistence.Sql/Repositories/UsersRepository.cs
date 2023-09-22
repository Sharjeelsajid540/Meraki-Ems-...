﻿using Microsoft.EntityFrameworkCore;
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
            var user = await _context.User.OrderByDescending(s => s.ID).ToListAsync();
          
            foreach (var u in user)
            {
                var userRoleid =  _context.UserRole.Where(s => s.UserID == u.ID).FirstOrDefault();
                var userRole = _context.Role.Where(s => s.ID == userRoleid.RoleID).FirstOrDefault();

                var manager =  _context.User.Where(s => s.ID == u.ManagerID).FirstOrDefault();

                var response = new GetUsersResponse();
                response.UserID = u.ID;
                response.Name = u.Name;
                response.CNIC = u.CNIC;
                response.Address = u.Address;
                response.ContactNo = u.ContactNo;
                response.Email = u.Email;
                response.EContactNo = u.EContactNo;
                response.Manager = manager.Name;
                response.ManagerID = manager.ManagerID;
                response.Role = userRole.RoleName;
                response.RoleID = userRole.ID;
                users.Add(response);
            }
            return users;
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
                response.Manager = manager.Name;
                response.ManagerID = manager.ManagerID;
                response.Role = userRole.RoleName;
                response.RoleID = userRole.ID;
                
            
            return response;
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
            var CheckIn = _context.Leave.Where
            (s => s.ID == req.ID).FirstOrDefault();

            /*CheckIn.UserID = req.UserID;*/
            CheckIn.AdminRequestViewer = req.AdminRequestViewer;
            CheckIn.Status = req.Status;
            CheckIn.Comments = req.Comments;
            CheckIn.UpdatedAt = DateTime.Now;


            await _context.SaveChangesAsync(); // Add the Leave entity to the context
             // Save changes to the database
            return CheckIn; // Return the added Leave entity
        }


        public async Task<Leave> RequestLeave(LeaveRequest lev)
        {
            Leave leave = new Leave
            {   ID =lev.ID,
                UserID = lev.UserID,
                Name = lev.Name,
                From = lev.From,
                To = lev.To,
                Description = lev.Description,
                Comments = lev.Comments,
                UpdatedAt = lev.UpdatedAt,
                CreatedAt = DateTime.Now,
            AdminRequestViewer = "",
            Status = "Pending"
            };

            _context.Leave.Add(leave); // Add the Leave entity to the context
            await _context.SaveChangesAsync(); // Save changes to the database
            return leave; // Return the added Leave entity
        }

        public async Task<List<Leave>> GetLeave()
        {
            var response = await _context.Leave.OrderByDescending(s=>  s.ID).ToListAsync();
            return response;
        }

        public async Task<List<Leave>> GetAllLeaves(UserID user)
        {
            var response = await _context.Leave.Where(s=> s.UserID == user.ID).OrderByDescending(s => s.CreatedAt).ToListAsync();
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
            
            var check = await _context.User
               .Where(s => s.Name == user.Name).FirstOrDefaultAsync();
            if(check == null)
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
                    role.UserID = userr.ID;
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
            foreach ( var item in response)
            {
                if(item.RoleID == 1)
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
        public async Task<List<UserAttendance>> AttendanceList()
        {

            var response = await _context.UserAttendance.OrderByDescending(s=> s.CheckInTime).ToListAsync();
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
    .Where(s=> s.Name== user.Name && s.Password==user.Password).FirstOrDefaultAsync();
    if(userr == null)
    {
        return null;
    }
    else
    {
        response.Name=userr.Name;
                response.Id = userr.ID;
                
            }
            var rl = await _context.UserRole.Where(s=> s.UserID == userr.ID).FirstOrDefaultAsync();
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
            var rp = await _context.RolePermissions.Where(s=> s.RoleID == userRole.ID).ToListAsync();
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
                ) ;
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        

        public async Task<CheckInResponse> InsertAttendance(CheckInRequest req)
        {
            CheckInResponse response = new CheckInResponse();
            UserAttendance attendance = new UserAttendance();
            try {
                var check = _context.UserAttendance.Where(s => s.UserID == req.UserID).OrderByDescending(s => s.CheckInTime).FirstOrDefault();
                if (check == null || check.CheckOutTime != null)
                {
                    var date = DateTime.Now;
                    var dateCheck = _context.UserAttendance.Where(s => s.UserID == req.UserID && s.CreatedAt==date.Date).OrderByDescending(s => s.CreatedAt).FirstOrDefault();

                    if (dateCheck == null)
                    {
                        var name = _context.User.Where
                        (s => s.ID == req.UserID).FirstOrDefault();

                        attendance.CheckInTime = DateTime.Now;
                        attendance.CreatedAt = attendance.CheckInTime?.Date;
                        attendance.UserID = req.UserID;
                        attendance.Name = name.Name;

                        await _context.UserAttendance.AddAsync(attendance);
                        await _context.SaveChangesAsync();
                        var AId = _context.UserAttendance.Where
                            (s => s.UserID == req.UserID)
                            .OrderByDescending(s => s.ID).FirstOrDefault();
                        response.AttendanceID = AId.ID;

                        return response;
                    }
                    else
                    {
                        var AId = _context.UserAttendance.Where
                            (s => s.UserID == req.UserID)
                            .OrderByDescending(s => s.ID).FirstOrDefault();
                        response.AttendanceID = AId.ID;
                        response.SuccessMessage = "Already CheckedIN!";
                        return response;
                    }

                }
                else
                {
                    response.SuccessMessage = "Already CheckedIN!";
                    var AId = _context.UserAttendance.Where
                            (s => s.UserID == req.UserID)
                            .OrderByDescending(s => s.ID).FirstOrDefault();
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
            
            
                
               var CheckIn = _context.UserAttendance.Where
                    (s => s.ID == req.AttendanceID).FirstOrDefault();
            if(CheckIn.CheckOutTime == null)
            {
                CheckIn.WorkingHours = DateTime.Now - CheckIn.CheckInTime;
                CheckIn.CheckOutTime = DateTime.Now;



                await _context.SaveChangesAsync();
                return CheckIn;
            }
            else
            {
                return null;
            }
            
            
            


            
           

        }


    }
}
