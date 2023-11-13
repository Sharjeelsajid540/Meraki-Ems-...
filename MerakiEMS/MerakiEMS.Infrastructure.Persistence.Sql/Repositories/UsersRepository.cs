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
using System.Runtime.Intrinsics.X86;

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
            try
            {
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

        public async Task<List<UserListResponse>> UserList()
        {
            var list = new List<UserListResponse>();
            var response = await _context.User.ToListAsync();
            foreach (var item in response)
            {
                UserListResponse user = new UserListResponse();
                user.UserID = item.ID;
                user.UserName = item.Name;
                list.Add(user);

            }
            return list;
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

        public async Task<UserAttendance> FinePaid(FineRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            var Fine = await _context.UserAttendance
                .Where(s => s.ID == req.ID)
                .FirstOrDefaultAsync();

            if (Fine != null)
            {

                if (req.FinePaid == "Paid" || req.FinePaid == "Resolved")
                {
                    Fine.FinePaid = req.FinePaid;
                    Fine.PaidDate = Time;
                }
                else
                {
                    Fine.FinePaid = req.FinePaid;
                    Fine.PaidDate = null;
                }

                await _context.SaveChangesAsync();
            }

            return Fine;
        }
        public async Task<int> FineCount(int UserID)
        {
            var fineData = await _context.UserAttendance.Where(s => s.UserID == UserID && s.FinePaid == "Pending").ToListAsync();
            return fineData.Count;
        }
        public async Task<IEnumerable<UserAttendance>> GetProductsAsync(int pageNumber, int pageSize)
        {
            return await _context.UserAttendance
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

    }
}
