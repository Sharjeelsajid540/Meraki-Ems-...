
using MailKit.Security;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using MimeKit;
using Microsoft.AspNetCore.Http;
using UAParser;
using MerakiEMS.Application.Common.Configuration;

namespace MerakiEMS.Application.Services
{
    public class UserAuthenticateService : IUserAuthenticateService
    {
        private readonly IUsersRepository _usersRepository;

        public UserAuthenticateService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public async Task<List<GetUsersResponse>> GetAllUsers()
        {
            var response = await _usersRepository.GetAllUsers();
            return response;
        }
        public async Task<GetUsersResponse> GetUser(int id)
        {
            var response = await _usersRepository.GetUser(id);
            return response;
        }

        public async Task<FineResponse> FinePaid(FineRequest req)
        {
            FineResponse response = new FineResponse();
            try
            {
                var res = await _usersRepository.FinePaid(req);
                if (res != null)
                {
                    response.SuccessMessage = "Fine Request Updated Successfull";
                    response.IsRequestSuccessfull = "true";

                }
                else
                {
                    response.IsRequestSuccessfull = "false";
                    response.SuccessMessage = "Fine Request Failed!";
                }
                return response;
            }
            catch (Exception ex)
            {
                response.IsRequestSuccessfull = "false";
                response.Errors = new List<string> { ex.Message };
                return response;

            }
        }

        public async Task<LoginResponse> LoginUser(LoginRequest request)
        {
            LoginResponse response = new LoginResponse();
            try
            {
                User entityUser = new();
                {
                    entityUser.Name = request.Name;
                    entityUser.Password = request.Password;
                }
                var res = await _usersRepository.CheckLogin(entityUser);
                if (res != null)
                {
                    var token = _usersRepository.GenerateToken(res);
                    res.IsSuccess = true;
                    res.Message = "Login Successfull";

                    res.Token = token.Result;

                    return res;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Errors = new List<string> { { "Invalid Name or password! Please try again" } };
                }
            }
            catch (Exception ex)
            {

                response.IsSuccess = false;
                response.Errors = new List<string> { { $"Something went wrong Error:  Please check Message for more details" } };

            }
            return response;
        }

        public async Task<List<UserListResponse>> GetUserList()
        {
            var response = await _usersRepository.UserList();
            return response;
        }

        public async Task<int> FineCount(int UserID)
        {
            var res = await _usersRepository.FineCount(UserID);
            return res;
        }
        public async Task<IEnumerable<UserAttendance>> GetProductsAsync(int pageNumber, int pageSize)
        {
            return await _usersRepository.GetProductsAsync(pageNumber, pageSize);
        }
        
    }
}