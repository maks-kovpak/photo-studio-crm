namespace PhotoStudio.Models;

public partial class OrderItem {
    public int Id { get; set; }
    public int ServiceId { get; set; }
    public int OrderId { get; set; }
    public int Quantity { get; set; }

    public virtual Order Order { get; set; } = null!;
    public virtual Service Service { get; set; } = null!;
}
