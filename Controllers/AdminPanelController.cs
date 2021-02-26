using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ab_test_react.Data;
using ab_test_react.Data.Models;

namespace ab_test_react.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminPanelController : ControllerBase
    {
        protected ApplicationDbContext _context;

        public AdminPanelController(ApplicationDbContext context)
        {
            _context = context;
        }
        

        [HttpGet("GetUsers")]
        public IEnumerable<UserDataModel> GetUsers()
        {
            return _context.Users.OrderBy((o)=> o.DateRegistration);
        }

        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser(UserDataModel user)
        {
            var model = new UserDataModel
            {
                UserId = user.UserId.ToString(),
                DateRegistration = user.DateRegistration,
                DateLastActivity = user.DateLastActivity
            };

            _context.Users.Add(model);
            await _context.SaveChangesAsync();
            
            return Ok();
        }
    }
}