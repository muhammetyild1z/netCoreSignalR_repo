using signalR_ex.Models;

namespace signalR_ex.Hubs
{
    public interface ITypeSafeHub
    {
        Task ReceiverMessageForAllClient(string message);
        Task ReceiverMessageForModelClient(ProductModel productModel);
        Task ReceiverMessageForCallerClient(string message);
        Task ReceiverMessageForOtherClient(string message);
        Task ReceiverMessageForSpecificClient(string message);
        Task ReceiverMessageForGroupClient(string message);
        Task ReceiverconnectionCountForAllClient(int clientCount);
    }
}
