using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroChatRestApi.Hubs
{
    
    public class ChatHub : Hub
    {
        
        public void BroadCastMessage(string message)
        {
            Clients.All.MessageReciever(message);
        }

        // TODO: add private messages between users
    }
}
