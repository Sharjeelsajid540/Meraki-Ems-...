using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IPostRepository
    {
        Task<Posts> Insert(Posts post);
        Task<Posts> Update(Posts post, int id);
        Task<Posts> Delete(int id);
        Task<Posts> GetPost(int id);
        Task<List<Posts>> GetPosts();
    }
}
