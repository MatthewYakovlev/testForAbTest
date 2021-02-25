using System;
using Microsoft.EntityFrameworkCore;

namespace ab_test_react.Data.Models
{
    [Keyless]
    public class UserDataModel
    {
        public string UserId { get; set; }
        public DateTime DateRegistration { get; set; }
        public DateTime DateLastActivity { get; set; }
    } 
}