using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ab_test_react.Data.Models
{
    //[Keyless]
    public class UserDataModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        [MinLength(3)]
        public string UserId { get; set; }
        
        [Required]
        public DateTime DateRegistration { get; set; }
        
        [Required]
        public DateTime DateLastActivity { get; set; }
    } 
}