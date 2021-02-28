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
        
        [HttpGet("Calculate")]
        public CalculateResponse Calculate()
        {
            int dayCount = 7;
            int usersComebackCount = _context.Users
                .Where(u => u.DateLastActivity >= u.DateRegistration.AddDays(dayCount)).ToList().Count;
            
            int usersRecentlyInstalledCount = _context.Users
                .Where(u => DateTime.Today.AddDays(-dayCount) >= u.DateRegistration ).ToList().Count;
            
            List<double> lifetimes = new List<double>();
            _context.Users.ToList().ForEach(delegate(UserDataModel user)
            {
                lifetimes.Add((user.DateLastActivity - user.DateRegistration).TotalDays);
            });
            
            CalculateResponse response = new CalculateResponse();
            response.RollingRetention = (double)usersComebackCount / usersRecentlyInstalledCount * 100.0;
            response.UsersLifetime = lifetimes;
            
            return response;
        }

        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser(UserDataModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var model = new UserDataModel
            {
                UserId = user.UserId,
                DateRegistration = user.DateRegistration,
                DateLastActivity = user.DateLastActivity
            };

            _context.Users.Add(model);
            await _context.SaveChangesAsync();
            
            return Ok();
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]UserDataModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            user.UserId = id;
            _context.Update(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}