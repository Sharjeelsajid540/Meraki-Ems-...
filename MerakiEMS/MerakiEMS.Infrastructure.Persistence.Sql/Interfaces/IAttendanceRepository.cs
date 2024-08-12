using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IAttendanceRepository
    {
        Task<CheckInResponse> InsertAttendance(CheckInRequest req);
        Task<UserAttendance> EditAttendance(CheckOutRequest req);
        Task<List<UserAttendance>> AttendanceList(AttendanceFilter req);
        Task<List<UserAttendance>> SingleAttendanceList(UserAttendanceRequest req);
        Task<CheckStatusResponse> CheckCheckIn(CheckStatusRequest req);
        Task<CheckStatusResponse> CheckCheckOut(CheckStatusRequest req);
    }
}
