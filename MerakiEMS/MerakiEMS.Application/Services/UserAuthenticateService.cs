
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

        public async Task<ApiResponse<string>>AuthenticateUser(RegisterRequest request)
        {
            var response = new ApiResponse<string>();
            try
            {
                Users entityUser = new();
                {
                    entityUser.Email = request.Email;
                    entityUser.Password = request.Password;
                    entityUser.Username = request.Username;
                    entityUser.IsActive = true;
                }
                var res = await _usersRepository.CheckUser(entityUser);

                if (res != null)
                {
                    var token = await _usersRepository.GenerateToken(res);
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "User Registered Successfully";
                    response.Token = token;
                    


                }
                else
                {
                    response.IsRequestSuccessful = false;
                    response.Errors = new List<string> { { $"User Already Exist!" } };
                }
            }
            catch (Exception ex)
            {
                response.IsRequestSuccessful = false;
                response.Errors = new List<string> { { $"Something went wrong Error:  Please check Message for more details" } };


            }
                return response;



        }
        public async Task<LoginResponse>LoginUser(LoginRequest request)
        {
            var response = new LoginResponse();
            try
            {
                Users entityUser = new();
                {
                    entityUser.Email = request.Email;
                    entityUser.Password = request.Password;
                }
                var res = await _usersRepository.CheckLogin(entityUser);
                if (res != null) {
                    var token = _usersRepository.GenerateToken(res);
                    response.IsSuccess = true;
                    response.Message = "Login Successfull";
                    response.Email = res.Email;
                    response.Username = res.Username;
                    response.IsActive = res.IsActive;
                    response.Token = token.Result;

                    return response;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Errors = new List<string> { { "Invalid Email or password! Please try again" } };
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