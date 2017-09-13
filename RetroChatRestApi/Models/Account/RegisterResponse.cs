using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroChatRestApi.Models.Account
{
    public class RegisterResponse
    {
        public int Id { get; set; }
        public bool Success { get; set; }
        public string UserName { get; set; }
        public string Text { get; set; }
    }
}
