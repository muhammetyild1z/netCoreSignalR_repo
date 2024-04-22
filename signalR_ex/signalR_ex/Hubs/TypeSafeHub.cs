using Microsoft.AspNetCore.SignalR;
using signalR_ex.Models;
using System.Security.Cryptography.X509Certificates;

namespace signalR_ex.Hubs
{
    public class TypeSafeHub : Hub<ITypeSafeHub>
    {

        private static int connectedClientCount = 0;
        public async Task BrodcastMessageToAllClient(string message)
        {
            // hangi client tetiklerse tetiklerse tum clientere gonder 
            await Clients.All.ReceiverMessageForAllClient(message);
        }

        public async Task BrodcastMessageToCallerClient(String message)
        {
            // sadece tetikleyen clente cevap ver
            await Clients.Caller.ReceiverMessageForCallerClient(message);
        } 
        public async Task BrodcastMessageToOtherClient(String message)
        {
            // cagiran client harici tum clientlere gonder
            await Clients.Others.ReceiverMessageForOtherClient(message);
        } 
        public async Task BrodcastMessageToSpecificClient(String message, string connectionId)
        {
            // belirli client id ye ver gonder
            await Clients.Client(connectionId).ReceiverMessageForSpecificClient(message);
        }

        public async Task BrodcastMessageToGroupClient(string groupName, string message)
        {
            // belirli gruba ait tum clientlere mesaj gonder
            await Clients.Group(groupName).ReceiverMessageForGroupClient(message);
        }
        public async Task BrodcastMessageToModelClient(ProductModel productModel)
        {
            // tum clientlere model degerini gonder
            await Clients.All.ReceiverMessageForModelClient(productModel);
        }
         public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync( Context.ConnectionId, groupName);
            await Clients.Caller.ReceiverMessageForCallerClient($"katildin {groupName} ");
            await Clients.Others.ReceiverMessageForOtherClient($"{Context.ConnectionId}katildi ");
        }
        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.ReceiverMessageForCallerClient($"ayrildin {groupName} ");
            await Clients.Others.ReceiverMessageForOtherClient($"{Context.ConnectionId} ayrildi  ");
        }
        public override async Task OnConnectedAsync()
        {
            connectedClientCount++;
            await Clients.All.ReceiverconnectionCountForAllClient(connectedClientCount);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            connectedClientCount--;
            await Clients.All.ReceiverconnectionCountForAllClient(connectedClientCount);
            await base.OnDisconnectedAsync(exception);
        }

       

    }
}
