using MailKit.Security;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System.Net.Mail;
using MailKit.Net.Smtp;
using MerakiEMS.Application.Services;
using UAParser;
using Org.BouncyCastle.Asn1.Ocsp;
using System.IO;

namespace MerakiEMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserAuthenticateService _authenticateService;


        public UserController(IUserAuthenticateService authenticateService)
        {
            _authenticateService = authenticateService;

        }

        [HttpPut]
        [Route("FinePaid")]
        public async Task<FineResponse> FinePaid(FineRequest req)
        {
            var response = await _authenticateService.FinePaid(req);

            return response;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _authenticateService.LoginUser(request);
            return Ok(response);

        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<List<GetUsersResponse>> GetAllUsers()
        {
            var response = await _authenticateService.GetAllUsers();
            return response;
        }
       
        [HttpPost]
        [Route("GetUser")]
        public async Task<GetUsersResponse> GetUser(int id)
        {
            var response = await _authenticateService.GetUser(id);
            return response;
        }
       
        [HttpGet]
        [Route("Test")]
        public async Task<string> Test()
        {
            var response = "Successful";
            return response;
        }

        [HttpGet]
        [Route("ComputerName")]
        public string GetComputerName()
        {
            return Environment.MachineName;
        }
      
        [HttpGet]
        [Route("UserList")]
        public async Task<List<UserListResponse>> UserList()
        {
            var response = await _authenticateService.GetUserList();
            return response;
        }

        [HttpPost]
        [Route("FineCount")]
        public async Task<int> FineCount(int UserID)
        {
            var response = await _authenticateService.FineCount(UserID);
            return response;
        }

        [HttpGet] 
        [Route("ProductsList")]
        public async Task<IActionResult> GetProductsAsync([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            var products = await _authenticateService.GetProductsAsync(pageNumber, pageSize);

            return Ok(products);
        }
       
    }
    
}
