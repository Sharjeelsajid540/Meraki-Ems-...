using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using Microsoft.AspNetCore.Mvc;

namespace MerakiEMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : Controller
    {
        private readonly IAttendanceService _attendanceService;
        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;

        }
        [HttpPost]
        [Route("UserCheckOut")]
        public async Task<CheckoutResponse> UpdateUserAttendance(CheckOutRequest req)
        {
            var response = await _attendanceService.UpdateAttendance(req);
            return response;
        }
        [HttpPost]
        [Route("UserCheckIn")]
        public async Task<CheckInResponse> AddUserAttendance(CheckInRequest req)
        {


            var response = await _attendanceService.InsertAttendance(req);

            return response;
        }
        [HttpPost]
        [Route("AllUserAttendance")]
        public async Task<List<AttendanceListResponse>> GetUserAttendance(AttendanceFilter req)
        {

            var responses = await _attendanceService.GetAttendanceList(req);


            return responses;
        }
        [HttpPost]
        [Route("UserAttendance")]
        public async Task<List<AttendanceListResponse>> GetSingleUserAttendance(UserAttendanceRequest req)
        {
            var response = await _attendanceService.GetSingleAttendanceList(req);
            return response;
        }
        [HttpPost]
        [Route("CheckCheckIn")]
        public async Task<CheckStatusResponse> CheckCheckIn(CheckStatusRequest req)
        {
            var response = await _attendanceService.CheckCheckIn(req);
            return response;
        }

        [HttpPost]
        [Route("CheckCheckOut")]
        public async Task<CheckStatusResponse> CheckCheckOut(CheckStatusRequest req)
        {
            var response = await _attendanceService.CheckCheckOut(req);
            return response;
        }
    }
}
