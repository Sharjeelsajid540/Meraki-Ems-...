using MerakiEMS.Domain.Entities.Models;
using Microsoft.EntityFrameworkCore;


namespace MerakiEMS.Infrastructure.Persistence.Sql.Context
{
    public class UserContext:DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
           : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<RolePermissions> RolePermissions { get; set; }
        public DbSet<UserAttendance> UserAttendance { get; set; }
        public DbSet<Leave> Leave { get; set; }
        public DbSet<Tickets> Tickets { get; set; }
        public DbSet<Leave> UserID { get; set; }

        public DbSet<Performance> Performance { get; set; }
    }
}
