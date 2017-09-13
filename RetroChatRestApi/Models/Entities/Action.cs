using System;
using System.Collections.Generic;

namespace RetroChatRestApi.Models.Entities
{
    public partial class Action
    {
        public int Id { get; set; }
        public int? Like { get; set; }
        public string Comment { get; set; }
        public int PostId { get; set; }

        public Post Post { get; set; }
    }
}
