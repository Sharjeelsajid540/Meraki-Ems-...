using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly UsersContext _context;
        private IConfiguration _config;

        public UsersRepository(UsersContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public async Task<Users> CheckUser(Users user)
        {
            
            var userr = await _context.Users
                .Where(s => s.Username == user.Username).FirstOrDefaultAsync();
           
            
            if (userr == null)
            {   
                await _context.AddAsync(user);
                await _context.SaveChangesAsync();
                return user;




            }
            
            return null;
        }
        public async Task<Users> CheckLogin(Users user)
        {
            var userr = await _context.Users
                .Where(s=> s.Email== user.Email && s.Password==user.Password).FirstOrDefaultAsync();
            if(userr == null)
            {
                return null;
            }
            return userr;
        }
        public async Task<string> GenerateToken(Users users)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
           
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], null,
            expires: DateTime.UtcNow.AddMinutes(2),
            signingCredentials: credentials
                ) ;
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
