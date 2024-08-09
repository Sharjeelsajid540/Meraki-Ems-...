using ClosedXML.Excel;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;

using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using System.Data;
using MiniExcelLibs;
using MerakiEMS.Infrastructure.Persistence.Sql.Repositories;
using DocumentFormat.OpenXml.Wordprocessing;

namespace MerakiEMS.Application.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;

        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }
        public async Task<UpdateUserResponse> UpdateUser(UpdateUserRequest user)
        {
            var response = new UpdateUserResponse();
            try
            {
                var res = await _adminRepository.UpdateUser(user);
                if (res == null)
                {
                    response.SuccessMessage = "Invalid User ID!";

                }
                else
                {
                    response.IsSuccess = true;
                    response.SuccessMessage = "User Updated Successfully";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.SuccessMessage += ex.Message;

            }
            return response;

        }
        public async Task<ApiResponse<string>> AddUser(AddEmployeeRequest req)
        {
            var response = new ApiResponse<string>();
            if (req == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "User fields can not be empty!";
            }
            else
            {
                var postt = await _adminRepository.InsertUser(req);
                if (postt == null)
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "User Already Exists!";

                }
                else
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "User added successfully";
                }

            }

            return response;

        }

        //public async Task<UpdateUserResponse> DeleteCandidate(int id)
        //{
        //    var response = new UpdateUserResponse();
        //    try
        //    {
        //        var res = await _adminRepository.DeleteCandidate();
        //        if (res == null)
        //        {
        //            response.SuccessMessage = "Invalid User ID!";

        //        }
        //        else
        //        {
        //            response.IsSuccess = true;
        //            response.SuccessMessage = "User Deleted Successfully";
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsSuccess = false;
        //        response.SuccessMessage += ex.Message;

        //    }
        //    return response;

        //}

        public async Task<List<Role>> GetRoleList()
        {
            var response = await _adminRepository.RoleList();
            return response;
        }
        public async Task<List<ManagerListResponse>> GetManagerList()
        {
            var response = await _adminRepository.MangerList();
            return response;
        }


        public async Task<ApiResponse<string>> AddCandidate(AddCandidateRequest req)
        {
            var response = new ApiResponse<string>();
            try
            {

                if (req == null)
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "Comments can not be empty!";
                }
                else
                {
                    var postt = await _adminRepository.InsertCandidate(req);
                    if (postt == null)
                    {
                        response.IsRequestSuccessful = false;
                        response.SuccessResponse = "User Not Found!";

                    }
                    else
                    {
                        response.IsRequestSuccessful = true;
                        response.SuccessResponse = "Comments added successfully";
                    }

                }
            }
            catch (Exception ex)
            {
                response.IsRequestSuccessful = false;
                response.Errors = new List<string> { ex.Message };
            }
            return response;

        }



        public async Task<ApiResponse<string>> UpdateCandidate(UpdateCandidateRequest req)
        {
            ApiResponse<string> response = new ApiResponse<string>();

            try
            {




                var res = await _adminRepository.UpdateCandidate(req);

                if (res == null)
                {
                    response.IsRequestSuccessful = false;
                    response.Errors = new List<string> { "Empty response from the repository." };
                }
                else
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessMessage = "User Updated Successfully";
                }

            }
            catch (Exception ex)
            {
                response.IsRequestSuccessful = false;
                response.Errors = new List<string> { "An error occurred while updating the user.", ex.Message };

            }

            return response;
        }




        public async Task<UpdateUserResponse> DeleteUser(int id)
        {
            var response = new UpdateUserResponse();
            try
            {
                var res = await _adminRepository.DeleteUser(id);
                if (res == null)
                {
                    response.SuccessMessage = "Invalid User ID!";

                }
                else
                {
                    response.IsSuccess = true;
                    response.SuccessMessage = "User Deleted Successfully";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.SuccessMessage += ex.Message;

            }
            return response;
        }

        public async Task<List<InterviewResponse>> GetCandidate(bool isDataFilter, string? Name)
        {
            List<InterviewResponse> result = new List<InterviewResponse>();

            try
            {
                var res = await _adminRepository.GetCandidate(isDataFilter, Name);
                if (res == null)
                {
                    return null;
                }
                else
                {


                    foreach (var performance in res)
                    {
                        var response = new InterviewResponse
                        {
                            ID = performance.ID,
                            EmployeeName = performance.EmployeeName,
                            ContactNo = performance.ContactNo,
                            Date = performance.Date?.ToString("yyyy-MM-dd"),
                            Comments = performance.Comments,
                            Email = performance.Email,
                            Rating = performance.Rating,
                            Discipline = performance.Discipline,
                            ProfessionalAttitude = performance.ProfessionalAttitude,
                            OverallRating = performance.OverallRating,
                            ProgrammingLanguage = performance.ProgrammingLanguage,
                            Experience = performance.Experience,
                            Status = performance.Status,

                        };
                        result.Add(response);
                    }

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }


        public async Task<ApiResponse<string>> Addapplicant(AddApplicantRequest req)
        {
            var response = new ApiResponse<string>();
            if (req == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "User fields can not be empty!";
            }
            else
            {
                var postt = await _adminRepository.Addapplicant(req);
                if (postt == null)
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "User Already Exists!";

                }
                else
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "User added successfully";
                }

            }

            return response;

        }

        public async Task<UpdateUserResponse> Deleteapplicant(int id)
        {
            {
                var response = new UpdateUserResponse();

                try
                {
                    var leaveToDelete = await _adminRepository.GetUserByID(id);

                    if (leaveToDelete == null)
                    {
                        response.ErrorMessage = "Leave with the provided ID not found.";
                        return response;
                    }



                    // Proceed with deletion
                    var deletionMessage = await _adminRepository.DeleteCandidate(leaveToDelete);

                    response.IsRequestSuccessful = true;
                    response.SuccessMessage = "Leave deleted successfully: " + deletionMessage;
                }
                catch (Exception ex)
                {
                    response.IsRequestSuccessful = false;
                    response.ErrorMessage = $"An error occurred: {ex.Message}";
                }

                return response;
            }
        }

        public async Task<InterviewListResponse> Getimageapplican(int id)
        {
            var response = await _adminRepository.GetapplicantByID(id);
            return response;
        }
        public async Task<string> GenerateExcelFile(GenerateExcellRequest req)
        {
            if (req == null)
            {
                // Handle null request gracefully
                return null;
            }

            // Fetch attendance records based on the request
            var attendanceRecords = await _adminRepository.GenerateExcell(req);

            if (attendanceRecords == null || !attendanceRecords.Any())
            {
                // Handle no records found gracefully
                return null;
            }

            // Determine the date range
            DateTime fromDate = req.FromDate.Date; // Ensure we're working with date only
            DateTime toDate = req.ToDate.Date; // Ensure we're working with date only

            // Prepare a list to hold the Excel data
            var values = new List<Dictionary<string, object>>();

            // Iterate through each date in the range
            for (DateTime date = fromDate; date <= toDate; date = date.AddDays(1))
            {
                string status;
                string checkInTime = "";
                string checkOutTime = "";
                string Name = "";

                // Check if the date is Saturday or Sunday
                if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday)
                {
                    status = "Holiday";
                }
                else
                {
                    // Find the record for the current date
                    var record = attendanceRecords.FirstOrDefault(r => r.CreatedAt.Date == date);

                    if (record != null)
                    {
                        // Record found, populate data
                        status = "Present";
                        checkInTime = record.CheckInTime?.ToString("HH:mm:ss") ?? "";
                        checkOutTime = record.CheckOutTime?.ToString("HH:mm:ss") ?? "";
                    }
                    else
                    {
                        // No record found, mark as leave
                        status = "Leave";
                    }
                }

                // Add data for the current date
                values.Add(new Dictionary<string, object> {
            { "Date", date.ToString("yyyy-MM-dd") },
            { "Name", Name }, // Initialize Name field; will be populated later
            { "CheckIn Time", checkInTime },
            { "CheckOut Time", checkOutTime },
            { "Status", status }
        });
            }

            // Convert data to Excel
            using (MemoryStream memoryStream = new MemoryStream())
            {
                MiniExcel.SaveAs(memoryStream, values);
                byte[] excelBytes = memoryStream.ToArray();

                // Convert the byte array to a Base64 string
                string base64String = Convert.ToBase64String(excelBytes);
                return base64String;
            }
        }



        public async Task<List<UserListResponse>> Getuserid()
        {
            var response = await _adminRepository.Getuserid();
            return response;
        }
    }
}
