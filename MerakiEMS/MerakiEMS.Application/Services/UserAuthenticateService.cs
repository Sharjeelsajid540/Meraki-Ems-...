
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
using System.Security.Cryptography;
using Org.BouncyCastle.Asn1.Ocsp;
using Microsoft.AspNetCore.Mvc;
using DocumentFormat.OpenXml.Wordprocessing;

namespace MerakiEMS.Application.Services
{
    public class UserAuthenticateService : IUserAuthenticateService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IEmailService _emailService;
       

        public UserAuthenticateService(IUsersRepository usersRepository,IEmailService emailService)
        {
            _usersRepository = usersRepository;
            _emailService = emailService;
            
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

        public async Task<ApiResponse<string>> ForgotPassword(ForgotPasswordRequest model)
        {
            try
            {
                var response= new ApiResponse<string>();
                // Generate a unique token
                string resetToken = GenerateResetToken();

                // Save the token and user's email in the database
                var result = await _usersRepository.SaveResetToken(model.Email, resetToken);
                if (result == true)
                {
                    // Send the password reset email
                    _emailService.SendPasswordResetEmailAsync(model.Email, resetToken);
                   response.IsRequestSuccessful = true;
                    response.IsSuccess = true;
                    response.SuccessMessage = "email send successfully";
                }
                else
                {
                    response.IsRequestSuccessful = false;
                    response.IsSuccess = false;
                    response.SuccessMessage = "invalid email";

                }
                return response;
            }
            catch (Exception ex)
            {
                // Handle exceptions, log, or rethrow if necessary
                throw new PasswordResetException("Failed to initiate password reset", ex);
            }
        }

        private string GenerateResetToken()
        {
            const string allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const int tokenLength = 32; // Adjust the length as needed

            using (var rng = RandomNumberGenerator.Create())
            {
                var tokenChars = new char[tokenLength];
                var bytes = new byte[tokenLength];

                rng.GetBytes(bytes);

                for (int i = 0; i < tokenLength; i++)
                {
                    tokenChars[i] = allowedChars[bytes[i] % allowedChars.Length];
                }

                return new string(tokenChars);
            }
        }




        public async Task ResetPassword(ResetPasswordRequest model)
        {

            if (await _usersRepository.IsValidResetToken( model.ResetToken))
            {
               await _usersRepository.ResetUserPassword(model);
            }
            else
            {
                throw new InvalidResetTokenException();
            }
        }


        public async Task<GetUserImageResponse> GetUserImage(int id)
        {
            var response = await _usersRepository.GetUserImage(id)
        ;
            return response;
        }

    }
}