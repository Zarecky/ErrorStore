using Microsoft.EntityFrameworkCore;

namespace ErrorStore.Models
{
    public class ErrorStoreContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Error> Errors { get; set; }
        public DbSet<ErrorHistory> ErrorHistory { get; set; }

        public ErrorStoreContext(DbContextOptions<ErrorStoreContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}