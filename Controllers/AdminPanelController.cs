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
    [Route("[controller]")]
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
            var result = new List<UserDataModel>();
            result = _context.Users.ToList();
            
            return result;
        }

        [HttpPost]
        [Route("CreateUser")]
        public UserDataModel CreateUser(UserDataModel user)
        {
            var model = new UserDataModel();
            model.UserId = user.UserId.ToString();
            model.DateRegistration = user.DateRegistration;
            model.DateLastActivity = user.DateLastActivity;

            _context.Users.Add(model);
            _context.SaveChanges();
            return model;
        }
    }
}