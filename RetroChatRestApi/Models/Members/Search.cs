﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroChatRestApi.Models.Members
{
    public class Search
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
    }
}
