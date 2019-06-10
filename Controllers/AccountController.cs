using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ErrorStore.Controllers.Requests;
using ErrorStore.Controllers.Responses;
using ErrorStore.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ErrorStore.Controllers
{
    public class AccountController: Controller
    {
        private ErrorStoreContext db;

        public AccountController(ErrorStoreContext db)
        {
            this.db = db;
        }

        [HttpPost]
        public async Task<ActionResult<UserResponse>> Login([FromBody] LoginRequest request)
        {
            var user = await db.Users.FirstOrDefaultAsync(x => x.Login == request.Login && x.Password == request.Password);
            if (user == null) return StatusCode(400, "Invalid login or password");
            await Authenticate(user.Login);
            return new UserResponse { Name = user.Name, Surname = user.Surname };
        }
        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserResponse>> Login()
        {
            var login = User.Identity.Name;
            var user = await db.Users.FirstOrDefaultAsync(x => x.Login == login);
            return new UserResponse { Name = user.Name, Surname = user.Surname };
        }
        
        [HttpPost]
        public async Task<ActionResult<UserResponse>> Register([FromBody] RegisterRequest request)
        {
            var user = await db.Users.FirstOrDefaultAsync(x => x.Login == request.Login);
            if (user != null) return StatusCode(400, "User with the login already exists");
            user = new User
            {
                Login = request.Login,
                Password = request.Password,
                Name = request.Name,
                Surname = request.Surname
            };
            db.Users.Add(user);
            await db.SaveChangesAsync();
            await Authenticate(request.Login);
            return new UserResponse { Name = user.Name, Surname = user.Surname };
        }
        
        [HttpPut("api/[controller]/update-profile")]
        [Authorize]
        public async Task<ActionResult<UserResponse>> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            var login = User.Identity.Name;
            var users = await db.Users.AsNoTracking().ToListAsync();
            var user = users.Find(x => x.Login == login);
            if (user == null) return StatusCode(400, "There is not the user");
            
            var updatedUser = new User
            {
                Id = user.Id,
                Login = !string.IsNullOrEmpty(request.Login) ? request.Login : user.Login,
                Password = !string.IsNullOrEmpty(request.Password) ? request.Password : user.Password,
                Name = request.Name,
                Surname = request.Surname
            };
            db.Update(updatedUser);
            await db.SaveChangesAsync();
            
            return new UserResponse { Name = updatedUser.Name, Surname = updatedUser.Surname };
        }
        
        private async Task Authenticate(string login)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, login)
            };
            
            var identity = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity));
        }
        
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}