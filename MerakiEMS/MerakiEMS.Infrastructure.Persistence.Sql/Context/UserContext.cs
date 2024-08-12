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
        public DbSet<Interviews> Interviews { get; set; }

        public DbSet<Performance> Performance { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the User entity
            modelBuilder.Entity<User>(entity =>
            {
                // Primary key
                entity.HasKey(u => u.ID);

                // Email should be unique
                entity.HasIndex(u => u.Email).IsUnique();

                // Other properties
                entity.Property(u => u.Email).IsRequired();
                entity.Property(u => u.Password).IsRequired();
                entity.Property(u => u.ResetToken);
                entity.Property(u => u.ResetTokenExpiration);

                // Relationships or additional configurations can be added here
            });

            // Additional entity configurations can be added here...

            base.OnModelCreating(modelBuilder);
        }
    }
}
