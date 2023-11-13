using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Interfaces
{
    public interface IAdminService
    {
        Task<ApiResponse<string>> AddUser(AddEmployeeRequest req);
        Task<UpdateUserResponse> DeleteUser(int id);
        Task<UpdateUserResponse> UpdateUser(UpdateUserRequest user);
        Task<List<ManagerListResponse>> GetManagerList();
        Task<List<Role>> GetRoleList();
        
    }
}
