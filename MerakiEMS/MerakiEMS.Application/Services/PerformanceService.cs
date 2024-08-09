using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using MerakiEMS.Infrastructure.Persistence.Sql.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Services
{
    public class PerformanceService : IPerformanceService
    {
        private readonly IPerformanceRepository _performanceRepository;

        public PerformanceService(IPerformanceRepository performanceRepository)
        {
            _performanceRepository = performanceRepository;
        }
        public async Task<ApiResponse<string>> AddPerform(PerformanceRequest req)
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
                    var postt = await _performanceRepository.AddPerform(req);
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

        public async Task<ApiResponse<bool>> DeletePerformance(int id)
        {
            {
                var response = new ApiResponse<bool>();

                try
                {
                    var prformanceToDelete = await _performanceRepository.GetUserByID(id);

                    if (prformanceToDelete == null)
                    {
                        response.ErrorMessage = "peformance with the provided ID not found.";
                        return response;
                    }



                    // Proceed with deletion
                    var deletionMessage = await _performanceRepository.Deleteperformance(prformanceToDelete);

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

        public async Task<ApiResponse<List<PerformanceResponse>>> GetPerform()
        {
            List<PerformanceResponse> responses = new();
            ApiResponse<List<PerformanceResponse>> result = new();
            try
            {
                var res = await _performanceRepository.GetPerform();
                if (res == null)
                {
                    return null;
                }
                else
                {

                    foreach (var performance in res)
                    {
                        var response = new PerformanceResponse();
                        response.ID = performance.ID;
                        response.UserID = performance.UserID;
                        response.EmployeeName = performance.EmployeeName;
                        response.Severity = performance.Severity;
                        response.Date = performance.Date?.ToString(("yyyy-MM-dd"));
                        response.Comments = performance.Comments;
                        response.SpecifiedDate = performance.SpecifiedDate?.ToString(("yyyy-MM-dd"));
                        responses.Add(response);
                    }
                }
                result.IsRequestSuccessful = true;
                result.SuccessResponse = responses;

            }
            catch (Exception ex)
            {
                result.IsRequestSuccessful = false;
                result.Errors = new List<string> { ex.Message };
            }
            return result;

        }
        public async Task<ApiResponse<string>> UpdatePerformance(UpdatePerformanceRequest request)
        {
            ApiResponse<string> response = new();
            try
            {

                var res = await _performanceRepository.UpdatePerformance(request);
                if (res != false)
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "Performance Updated Successfully";
                }
                else
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "Failed to Update Performance";
                }
            }
            catch (Exception ex)
            {
                response.IsRequestSuccessful = false;
                response.Errors = new List<string> { ex.Message };
            }
            return response;
        }
    }
}
