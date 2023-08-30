using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;

namespace MerakiEMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
       private readonly IPostsService _postsService;
        public PostsController(IPostsService postsService)
        {
            _postsService = postsService;
        }
        [HttpGet]
        [Route("GetAllPosts")]
        public async Task<List<PostResponse>> GetPosts()
        {
            var response = await _postsService.GetAllPosts();
            return response;
            
        }

        [HttpGet]
        [Route("GetPost")]
        public async Task<Posts> GetSinglePost(int id)
        {
            var response = await _postsService.GetPostById(id);
            return (response);
        }
        [Authorize]
        [HttpPost]
        [Route("AddPost")]
        public async Task<ApiResponse<string>> AddPosts(Posts post)
        {
            var response = await _postsService.AddPost(post);
            return response;
        }
        [Authorize]
        [HttpPut]
        [Route("UpdatePost")]
        public async Task<ApiResponse<string>> UpdatePosts(Posts post, int id)
        {
            var response = await _postsService.UpdatePost(post, id);
            return response;
        }
        [Authorize]
        [HttpDelete]
        [Route("DeletePost")]
        public async Task<ApiResponse<string>> DeletePosts(int id)
        {
            var response = await _postsService.DeletePost(id);
            return response;
        }

    }
}
