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

namespace MerakiEMS.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IUsersRepository
    { 
        Task<User> CheckUser( User user);
         Task<string> GenerateToken( LoginResponse response );
        Task<LoginResponse> CheckLogin(User user);
        Task<List<GetUsersResponse>> GetAllUsers();
        Task<GetUsersResponse> GetUser(int id);
        Task<List<UserListResponse>> UserList();
        Task<UserAttendance> FinePaid(FineRequest req);
        Task<int> FineCount(int UserID);
        Task<IEnumerable<UserAttendance>> GetProductsAsync(int pageNumber, int pageSize);
        
    }
    
}
