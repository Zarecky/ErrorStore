using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ErrorStore.Controllers.Responses;
using ErrorStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ErrorStore.Controllers
{
    public class UsersController : Controller
    {
        private ErrorStoreContext db;

        public UsersController(ErrorStoreContext db)
        {
            this.db = db;
        }

        // GET
        [HttpGet]
        public async Task<ActionResult<List<UserResponse>>> Get()
        {
            var users = await db.Users.ToListAsync();
            var usersResponses = new List<UserResponse>();
            users.ForEach(user =>
            {
                usersResponses.Add(new UserResponse { Id = user.Id, Name = user.Name, Surname = user.Surname});
            });
            return usersResponses;
        }
    }
}