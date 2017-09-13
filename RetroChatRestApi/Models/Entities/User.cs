using System;
using System.Collections.Generic;

namespace RetroChatRestApi.Models.Entities
{
    public partial class User
    {
        public User()
        {
            Post = new HashSet<Post>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
        public string Text { get; set; }

        public ICollection<Post> Post { get; set; }
    }
}
