using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _authenticateService.LoginUser(request);
            return Ok(response);

        }
    }
}
