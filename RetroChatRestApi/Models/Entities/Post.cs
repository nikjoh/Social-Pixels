using System;
using System.Collections.Generic;

namespace RetroChatRestApi.Models.Entities
{
    public partial class Post
    {
        public Post()
        {
            Action = new HashSet<Action>();
        }

        public int Id { get; set; }
        public string Image { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }
        public ICollection<Action> Action { get; set; }
    }
}
