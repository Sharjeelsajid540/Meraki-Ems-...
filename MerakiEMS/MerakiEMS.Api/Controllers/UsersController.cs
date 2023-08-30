using Microsoft.AspNetCore.Mvc;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Models;

namespace MerakiEMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    

    public class UsersController : ControllerBase
    {

        private readonly IUserAuthenticateService _authenticateService;
        

        public UsersController(IUserAuthenticateService authenticateService)
        {
            _authenticateService = authenticateService;
           
        }




        [HttpPost]
        [Route("Register")]
        
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _authenticateService.AuthenticateUser(request);
            
            return Ok(response);              
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult>Login(LoginRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _authenticateService.LoginUser(request);
            return Ok(response);

        }
    }
}
