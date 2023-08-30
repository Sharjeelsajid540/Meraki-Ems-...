using Microsoft.AspNetCore.Mvc;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Interfaces
{
    public interface IPostsService
    {
        Task<ApiResponse<string>> AddPost(Posts post);
        Task<ApiResponse<string>> DeletePost(int id);
        Task<Posts>GetPostById(int id);
        Task<List<PostResponse>>GetAllPosts();
        Task<ApiResponse<string>> UpdatePost(Posts post,int id);

    }
}
