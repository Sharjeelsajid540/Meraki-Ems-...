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

        public async Task<User> InsertUser(AddEmployeeRequest req)
        {
            User user = new User();
            UserRole role = new UserRole();
            user.Name = req.Name;
            user.Password = req.Password;
            var check = await _context.User
               .Where(s => s.Name == user.Name && s.Password == user.Password).FirstOrDefaultAsync();
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
        public async Task<List<UserAttendance>> AttendanceList()
        {

            var response = await _context.UserAttendance.OrderByDescending(s=> s.CheckInTime).ToListAsync();
            return response;
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
                attendance.CheckInTime = req.CheckInTime;
                attendance.CreatedAt = req.CheckInTime.Date;
                attendance.UserID = req.UserID;


                await _context.UserAttendance.AddAsync(attendance);
                await _context.SaveChangesAsync();
                var AId = _context.UserAttendance.Where
                    (s => s.UserID == req.UserID).FirstOrDefault();
                response.AttendanceID = AId.ID;
                return response;
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
            CheckIn.WorkingHours = req.CheckOutTime - CheckIn.CheckInTime;
            CheckIn.CheckOutTime = req.CheckOutTime;
            CheckIn.UserID = req.UserID;
            CheckIn.ID = req.AttendanceID;
           
            await _context.SaveChangesAsync();
            
            


            
            return CheckIn;

        }


    }
}
