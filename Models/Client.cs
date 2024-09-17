namespace PhotoStudio.Models;

public partial class Client {
    public int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Patronymic { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string Phone { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
