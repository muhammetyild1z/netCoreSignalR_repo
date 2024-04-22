namespace signalR_ex.Models
{
    public class ProductModel
    {
        public record Product(int Id, string Name, decimal Price);
    }
}
