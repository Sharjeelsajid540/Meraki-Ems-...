using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Ocsp;
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
        private readonly DateTime? Date;

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

                return user;
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
                    var name = await _context.User
                        .Where(s => s.ID == item.UserID)
                        .FirstOrDefaultAsync();

                    if (name != null)
                    {
                        ManagerListResponse manager = new ManagerListResponse();
                        manager.ManagerID = item.UserID;
                        manager.ManagerName = name.Name;
                        list.Add(manager);
                    }
                }
            }

            return list;
        }

        public async Task<User> AddEmployee(AddEmployeeRequest req)
        {
            {
                
                var existingUser = await _context.User
                    .FirstOrDefaultAsync(u => u.Name == req.Name);

                if (existingUser != null)
                {
                    
                    return null;
                }

                
                User user = new User
                {
                    Name = req.Name,
                    Password = req.Password,
                    Email = req.Email,
                    Address = req.Address,
                    CNIC = req.CNIC,
                    ContactNo = req.ContactNo,
                    EContactNo = req.EContactNo,
                    ManagerID = req.ManagerID,
                    Image = req.Image
                };

                
                _context.User.Add(user);
                await _context.SaveChangesAsync();

                
                var newUser = await _context.User
                    .FirstOrDefaultAsync(u => u.Name == user.Name && u.Password == user.Password);

                if (newUser == null)
                {
                  
                    return null;
                }

               
                UserRole role = new UserRole
                {
                    UserID = newUser.ID,
                    RoleID = req.RoleID
                };

                
                _context.UserRole.Add(role);
                await _context.SaveChangesAsync();

                return newUser;
            }
        }

        public async Task<Interviews> InsertCandidate(AddCandidateRequest req)
        {
            {
                var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
                var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
                var user = await _context.User
                   .Where(u => string.Equals(u.Name, req.Name))
                   .FirstOrDefaultAsync();
                if (user == null)
                {
                    return null;
                }
                Interviews perform = new Interviews();
                
                perform.EmployeeName = user.Name;
                perform.ContactNo = req.ContactNo;
                perform.Date = Time;
                perform.Email = req.Email;
                perform.Comments = req.Comments;
                perform.Rating = req.Rating;

                await _context.Interviews.AddAsync(perform);
                await _context.SaveChangesAsync();
                return perform;
            }
        }




        public async Task<Interviews> UpdateCandidate(UpdateCandidateRequest req)
        {
            try
            {
                var perform = await _context.Interviews.Where(s => s.ID == req.PerformanceID).FirstOrDefaultAsync();

                if (perform != null)
                {
                    perform.EmployeeName = req.EmployeeName;
                    perform.ContactNo = req.ContactNo;
                    perform.Date = req.Date; 
                    perform.Email = req.Email;
                    perform.Comments = req.Comments;
                    perform.Rating = req.Rating;
                    perform.Discipline = req.Discipline;
                    perform.ProfessionalAttitude = req.ProfessionalAttitude;
                    perform.File = req.File;
                    perform.Status = req.Status;
                    perform.Experience = req.Experience;
                    perform.OverallRating = req.OverallRating;
                    perform.ProgrammingLanguage = req.ProgrammingLanguage;


                    _context.Interviews.Update(perform);
                    await _context.SaveChangesAsync();

                    return perform;
                }
                else
                {
                   
                    throw new Exception("Interview record not found.");
                }
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }


        public async Task<Interviews> DeleteCandidate(int id)
        {
            try
            {
                
                var interviewToDelete = await _context.Interviews.Where(s => s.ID == id).FirstOrDefaultAsync();

                if (interviewToDelete == null)
                {
                   
                    return null;
                }

               
                _context.Interviews.Remove(interviewToDelete);
                await _context.SaveChangesAsync();

                return interviewToDelete;
            }
            catch (Exception ex)
            {
               
                throw ex;
            }
        }

        public async Task<List<Interviews>> GetCandidate(bool isDataFilter, string? Name)
        {
            IQueryable<Interviews> query = _context.Interviews; 

            if (isDataFilter)
            {
                if (Name != null)
                {
                    query = query.Where(s => s.EmployeeName.Contains(Name));
                }
            }

            query = query.OrderByDescending(s => s.ID);
            
            var response = await query.ToListAsync();
            return response;
        }


        public async Task<Interviews> Addapplicant(AddApplicantRequest req)
        {
            Interviews user = new Interviews
            {
                EmployeeName = req.EmployeeName,
                ID = req.ID,
                
                ContactNo = req.ContactNo,
                Comments = req.Comments,
                Date = DateTime.Now.Date,
                Email = req.Email,
                File = req.File,
                Rating = req.Rating,
                Status = req.Status,
                Experience = req.Experience,
                ProgrammingLanguage = req.ProgrammingLanguage,
                OverallRating = req.OverallRating,
                Discipline = req.Discipline,
                ProfessionalAttitude = req.ProfessionalAttitude,
            };
                var result = await _context.Interviews.AddAsync(user);
                await _context.SaveChangesAsync();
        

           
            return user;
        }

        //public async Task<Interviews> Deleteapplicant(int id)
        //{
        //    try
        //    {

        //        var interviewToDelete = await _context.Interviews.Where(s => s.ID == id).FirstOrDefaultAsync();

        //        if (interviewToDelete == null)
        //        {

        //            return null;
        //        }


        //        _context.Interviews.Remove(interviewToDelete);
        //        await _context.SaveChangesAsync();

        //        return interviewToDelete;
        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}

        public async Task<bool> DeleteCandidate(Interviews leaveToDelete)
        {

            _context.Interviews.Remove(leaveToDelete);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Interviews> GetUserByID(int id)
        {
            return await _context.Interviews.FirstOrDefaultAsync(s => s.ID == id);
        }

        public async Task<InterviewListResponse> GetapplicantByID(int id)
        {
         InterviewListResponse user = new InterviewListResponse();
            var response = _context.Interviews.FirstOrDefault(v => v.ID == id);

            if (response != null)
            {
                
                user.ID = response.ID;
                user.File = response.File;
                
            }

            return user;
        }
        public async Task<List<UserAttendance>> GenerateExcell(GenerateExcellRequest req)
        {
            // Fetch all UserAttendance records within the specified date range
            var attendanceSheet = await _context.UserAttendance
                .Where(y => y.CreatedAt >= req.FromDate && y.CreatedAt <= req.ToDate)
                .ToListAsync();

            // If no names are provided, return all attendance records within the date range
            if (req.Name == null || !req.Name.Any())
            {
                return attendanceSheet;
            }

            // Extract the list of names from req.Name
            var nameValues = req.Name.Select(nv => nv.Value).ToList();

            // Filter the fetched records by the names specified in the request
            var filteredAttendanceSheet = attendanceSheet
                .Where(y => y.Name != null && nameValues.Contains(y.Name))
                .ToList();

            return filteredAttendanceSheet;
        }





        public async Task<List<UserListResponse>> Getuserid()
        {
            List<UserListResponse> userList = new List<UserListResponse>();
            var responses = await _context.User.ToListAsync();

            foreach (var response in responses)
            {
                UserListResponse user = new UserListResponse();
                user.UserID = response.ID;
                user.UserName = response.Name;
                userList.Add(user);
            }

            return userList;
        }

    }
}

