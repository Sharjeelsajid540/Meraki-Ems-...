using MerakiEMS.Application.Contracts.Requests;
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
    public class AdminRepository : IAdminRepository
    {
        private readonly UserContext _context;

        public AdminRepository(UserContext context)
        {
            _context = context;
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
            catch (Exception ex)
            {
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
    }
}
