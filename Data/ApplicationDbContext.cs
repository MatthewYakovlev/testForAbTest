using Microsoft.EntityFrameworkCore;
using ab_test_react.Data.Models;

namespace  ab_test_react.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=abtest;Username=postgres;Password=abtest");
        }
        public DbSet<UserDataModel> Users { get; set; }
    }    
}