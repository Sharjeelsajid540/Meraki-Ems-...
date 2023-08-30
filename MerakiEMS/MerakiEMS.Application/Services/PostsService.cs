using Microsoft.AspNetCore.Mvc;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Services
{
    public class PostsService : IPostsService
    {
        private readonly IPostRepository _postRepository;
        public PostsService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }
        public async Task<ApiResponse<string>> AddPost(Posts post)
        {
            var response = new ApiResponse<string>();
            if (post == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "Post can not be empty";
            }
            else
            {
                var postt = await _postRepository.Insert(post);
                response.IsRequestSuccessful = true;
                response.SuccessResponse = "Post added successfully";
            }

            return response;

        }
        public async Task<List<PostResponse>> GetAllPosts()
        {

           List<PostResponse> responses = new List<PostResponse>();
            var res = await _postRepository.GetPosts();
            if (res == null)
            {
                return null;
            }
            else
            {
                var ID = 0;
                foreach (var post in res)
                {
                    
                        ID++;
                        var response = new PostResponse();
                        response.Title = post.Title;
                        response.Body = post.Body;
                        response.IsActive = post.IsActive;
                        response.ID = ID;
                        response.PId = post.ID;
                    response.DateTime= post.DateTime;
                        responses.Add(response);
                    
                }
                return responses;
             
            }
        }
        public async Task<Posts> GetPostById(int id)
        {

            
            var res = await _postRepository.GetPost(id);
            if (res == null)
            {
                return null;
            }
            else
            {
                return res;
            }
        }
        public async Task<ApiResponse<string>> UpdatePost(Posts post, int id)
        {

            var response = new ApiResponse<string>();
            var res = await _postRepository.Update(post,id);
            if (res == null)
            {
                response.IsRequestSuccessful=false;
                response.SuccessResponse = "No post found With this ID!";
                return response;
            }
            else
            {
                response.IsRequestSuccessful = true;
                response.SuccessResponse = "Post Updated Successfully";
                return response;
            }
        }
        public async Task<ApiResponse<string>> DeletePost(int id)
        {

            var response = new ApiResponse<string>();
            var res = await _postRepository.Delete(id);
            if (res == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "No post found With this ID!";
                return response;
            }
            else
            {
                response.IsRequestSuccessful = true;
                response.SuccessResponse = "Post Deleted Successfully";
                return response;
            }
        }
    }
}
