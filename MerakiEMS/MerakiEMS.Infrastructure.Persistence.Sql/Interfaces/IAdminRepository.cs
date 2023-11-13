using MerakiEMS.Application.Contracts.Requests;
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
    public interface IAdminRepository
    {
        Task<User> InsertUser(AddEmployeeRequest req);
        Task<List<Role>> RoleList();
        Task<User> UpdateUser(UpdateUserRequest user);
        Task<User> DeleteUser(int id);
        Task<List<ManagerListResponse>> MangerList();
    }
}
