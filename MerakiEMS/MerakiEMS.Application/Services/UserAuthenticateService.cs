
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;



namespace MerakiEMS.Application.Services
{
    public class UserAuthenticateService : IUserAuthenticateService
    {
        private readonly IUsersRepository _usersRepository;
        
        public UserAuthenticateService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        //public async Task<ApiResponse<string>>AuthenticateUser(RegisterRequest request)
        //{
        //    var response = new ApiResponse<string>();
        //    try
        //    {
        //        Users entityUser = new();
        //        {
        //            entityUser.Email = request.Email;
        //            entityUser.Password = request.Password;
        //            entityUser.Username = request.Username;
        //            entityUser.IsActive = true;
        //        }
        //        var res = await _usersRepository.CheckUser(entityUser);

        //        if (res != null)
        //        {
        //            var token = await _usersRepository.GenerateToken(res);
        //            response.IsRequestSuccessful = true;
        //            response.SuccessResponse = "User Registered Successfully";
        //            response.Token = token;



        //        }
        //        else
        //        {
        //            response.IsRequestSuccessful = false;
        //            response.Errors = new List<string> { { $"User Already Exist!" } };
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsRequestSuccessful = false;
        //        response.Errors = new List<string> { { $"Something went wrong Error:  Please check Message for more details" } };


        //    }
        //        return response;



        //}

        public async Task<ApiResponse<string>> AddPost(AddEmployeeRequest req)
        {
            var response = new ApiResponse<string>();
            if (req == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "User fields can not be empty";
            }
            else
            {
                var postt = await _usersRepository.InsertUser(req);
                if (postt  == null) {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "User fields can not be empty";

                }
                else
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "User added successfully";
                }
                
            }

            return response;

        }

        public async Task<LoginResponse>LoginUser(LoginRequest request)
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
                if (res != null) {
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
                catch(Exception ex)
            {
                    
                response.IsSuccess = false;
                response.Errors = new List<string> { { $"Something went wrong Error:  Please check Message for more details" } };

            }
            return response;
        }
    }
}