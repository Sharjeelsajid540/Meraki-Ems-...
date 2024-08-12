using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _attendanceRepository;

        public AttendanceService(IAttendanceRepository attendanceRepository)
        {
            _attendanceRepository = attendanceRepository;
        }

        public async Task<List<AttendanceListResponse>> GetAttendanceList(AttendanceFilter req)
        {
            try
            {
                var res = await _attendanceRepository.AttendanceList(req);

                if (res == null)
                {
                    return null;
                }
                else
                {
                    var responses = new List<AttendanceListResponse>();

                    foreach (var result in res)
                    {
                        var response = new AttendanceListResponse();
                        response.Name = result.Name;
                        response.ID = result.ID;
                        response.UserID = result.UserID;
                        response.CheckInTime = result.CheckInTime?.ToString("HH:mm:ss");
                        response.CreatedAt = result.CreatedAt.ToString("MM-dd-yyyy");
                        response.CheckOutTime = result.CheckOutTime?.ToString("HH:mm:ss");
                        response.WorkingHours = result.WorkingHours?.ToString(@"hh\:mm\:ss");
                        response.IsLate = result.IsLate;
                        response.IsHourCompleted = result.IsHourCompleted;
                        response.FinePaid = result.FinePaid;
                        response.PaidDate = result.PaidDate?.ToString("MM-dd-yyyy");

                        responses.Add(response);
                    }

                    return responses;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<List<AttendanceListResponse>> GetSingleAttendanceList(UserAttendanceRequest req)
        {
            var res = await _attendanceRepository.SingleAttendanceList(req);

            List<AttendanceListResponse> responses = new List<AttendanceListResponse>();
            if (res == null)
            {
                return null;
            }
            else
            {

                foreach (var result in res)
                {
                    var response = new AttendanceListResponse();
                    response.Name = result.Name;
                    response.ID = result.ID;
                    response.UserID = result.UserID;
                    response.CheckInTime = result.CheckInTime?.ToString("HH:mm:ss");
                    response.CreatedAt = result.CreatedAt.ToString("MM-dd-yyyy");
                    response.CheckOutTime = result.CheckOutTime?.ToString("HH:mm:ss");
                    response.WorkingHours = result.WorkingHours?.ToString(@"hh\:mm\:ss");
                    response.IsHourCompleted = result.IsHourCompleted;
                    response.FinePaid = result.FinePaid;

                    response.IsLate = result.IsLate;

                    responses.Add(response);

                }
                return responses;

            }
        }
        public async Task<CheckInResponse> InsertAttendance(CheckInRequest req)
        {
            CheckInResponse response = new CheckInResponse();

            try
            {

                var res = await _attendanceRepository.InsertAttendance(req);

                if (res != null)
                {
                    if (res.SuccessMessage == "Already CheckedIN!")
                    {
                        response.SuccessMessage = res.SuccessMessage;
                        response.IsRequestSuccessfull = "false";
                        response.AttendanceID = res.AttendanceID;
                    }
                    else
                    {
                        response.AttendanceID = res.AttendanceID;
                        response.SuccessMessage = "CheckIn Successful";
                        response.IsRequestSuccessfull = "true";
                    }
                }
                else
                {
                    response.IsRequestSuccessfull = "false";
                    response.SuccessMessage = "Already CheckedIn!";
                    response.Errors = new List<string> { "Something Went wrong" };
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                response.IsRequestSuccessfull = "false";
                response.SuccessMessage = "Error occurred";
                response.Errors = new List<string> { ex.Message };
            }

            return response;
        }
        public async Task<CheckoutResponse> UpdateAttendance(CheckOutRequest req)
        {
            CheckoutResponse response = new CheckoutResponse();
            try
            {
                var res = await _attendanceRepository.EditAttendance(req);
                if (res != null)
                {
                    response.SuccessMessage = "CheckOut Successfull";
                    response.IsRequestSuccessfull = "true";

                }
                else
                {
                    response.IsRequestSuccessfull = "false";
                    response.SuccessMessage = "Already CheckedOut!";
                }
                return response;
            }
            catch (Exception ex)
            {
                response.IsRequestSuccessfull = "false";
                response.Errors = new List<string> { ex.Message };
                return response;

            }


        }
        public async Task<CheckStatusResponse> CheckCheckIn(CheckStatusRequest req)
        {
            var res = await _attendanceRepository.CheckCheckIn(req);
            return res;

        }

        public async Task<CheckStatusResponse> CheckCheckOut(CheckStatusRequest req)
        {
            var res = await _attendanceRepository.CheckCheckOut(req);
            return res;

        }
    }
}
