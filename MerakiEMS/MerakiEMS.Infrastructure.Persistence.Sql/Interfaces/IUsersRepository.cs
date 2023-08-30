using MerakiEMS.Application.Contracts.Requests;
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
        Task<Users> CheckUser( Users user);
         Task<string> GenerateToken( Users user );
        Task<Users> CheckLogin(Users user);
    }
    
}
