namespace PhotoStudio.Models;

public partial class Order {
    public int Id { get; set; }
    public int ClientId { get; set; }
    public DateTime AcceptanceDate { get; set; }
    public DateTime? IssuanceDate { get; set; }

    public virtual Client Client { get; set; } = null!;
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
