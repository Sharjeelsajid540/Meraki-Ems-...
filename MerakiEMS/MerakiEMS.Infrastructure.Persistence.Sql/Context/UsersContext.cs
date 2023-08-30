using Microsoft.EntityFrameworkCore;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace MerakiEMS.Infrastructure.Persistence.Sql.Context
{
    public class UsersContext : DbContext
    {
        public UsersContext(DbContextOptions<UsersContext> options)
           : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
    }
}
