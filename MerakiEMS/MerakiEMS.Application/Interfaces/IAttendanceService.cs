using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Interfaces
{
    public interface IAttendanceService
    {
        Task<CheckInResponse> InsertAttendance(CheckInRequest req);
        Task<CheckoutResponse> UpdateAttendance(CheckOutRequest req);
        Task<List<AttendanceListResponse>> GetAttendanceList(AttendanceFilter req);
        Task<List<AttendanceListResponse>> GetSingleAttendanceList(UserAttendanceRequest req);
        Task<CheckStatusResponse> CheckCheckIn(CheckStatusRequest req);
        Task<CheckStatusResponse> CheckCheckOut(CheckStatusRequest req);
    }
}
