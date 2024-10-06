using System.Text.Json.Serialization;

namespace PhotoStudio.Models;

public partial class OrderItem {
    public int Id { get; set; }
    public int ServiceId { get; set; }
    public int OrderId { get; set; }
    public int Quantity { get; set; }

    [JsonIgnore]
    public virtual Order Order { get; set; } = null!;

    [JsonIgnore]
    public virtual Service Service { get; set; } = null!;
}
