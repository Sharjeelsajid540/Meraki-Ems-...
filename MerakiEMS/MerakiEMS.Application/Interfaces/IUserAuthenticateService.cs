using Microsoft.AspNetCore.Mvc;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace MerakiEMS.Application.Interfaces
{
    public interface IUserAuthenticateService
    {
        Task<LoginResponse> LoginUser(LoginRequest request);
        Task<List<GetUsersResponse>> GetAllUsers();
        Task<GetUsersResponse> GetUser(int id);
        Task<FineResponse> FinePaid(FineRequest req);
        Task<List<UserListResponse>> GetUserList();
        Task<int> FineCount(int UserID);
        Task<IEnumerable<UserAttendance>> GetProductsAsync(int pageNumber, int pageSize);
    }
}
