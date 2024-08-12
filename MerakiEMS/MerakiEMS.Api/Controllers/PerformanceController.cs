using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace MerakiEMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerformanceController : Controller
    {
        private readonly IPerformanceService _performanceService;


        public PerformanceController(IPerformanceService performanceService)
        {
            _performanceService = performanceService;

        }
        [HttpPost]
        [Route("AddPerform")]
        public async Task<ApiResponse<string>> AddPerform(PerformanceRequest req)
        {
            var response = await _performanceService.AddPerform(req);

            return response;
        }
        [HttpGet]
        [Route("GetPerformance")]
        public async Task<IActionResult> GetPerform()
        {
            var response = await _performanceService.GetPerform();
            return Ok(response);
        }
        [HttpPost]
        [Route("UpdatePerformance")]
        public async Task<ApiResponse<string>> UpdatePerformance(UpdatePerformanceRequest request)
        {
            var response = await _performanceService.UpdatePerformance(request);

            return (response);
        }
        [HttpPost]
        public async Task<ApiResponse<bool>> DeletePerformance(int id)
        {
            var response = await _performanceService.DeletePerformance(id);
            return response;
        }



    }
}
