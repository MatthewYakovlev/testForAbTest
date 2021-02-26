using System.Collections.Generic;

namespace ab_test_react.Data.Models
{
    public class CalculateResponse
    {
        public double RollingRetention { get; set; }
        
        public List<double> UsersLifetime { get; set; }
    }
}