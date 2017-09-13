using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RetroChatRestApi.Models;
using RetroChatRestApi.Models.Entities;
using RetroChatRestApi.Models.Account;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RetroChatRestApi.Controllers
{
    public class AccountController : Controller
    {
        RetroChatContext context;

        public AccountController(RetroChatContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public string Login()
        {
            return "Hello World!";
        }

        [HttpPost]
        public IActionResult Login(Login model)
        {
            LoginResponse response = context.Login(model);
            return Json(response);
        }

        [HttpPost]
        public IActionResult Register(Register model)
        {
            RegisterResponse response = context.Register(model);
            return Json(response);
        }
    }
}
