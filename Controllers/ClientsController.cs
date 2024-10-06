using Microsoft.AspNetCore.Mvc;

using PhotoStudio.DAL;
using PhotoStudio.Models;
using PhotoStudio.Response;

namespace PhotoStudio.Controllers;


public class ClientPatchBody {
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
}

[ApiController]
[Route("/api/clients")]
public class ClientsController : MainController {
    public ClientsController(PhotoStudioContext context) : base(context) { }

    [HttpGet]
    public TableDefinition<Client> GetAllClients() {
        var columns = new[] {
            new ColumnDefintion { Title = "ID", DataIndex = "id", Editable = false },
            new ColumnDefintion { Title = "First name", DataIndex = "firstName", Editable = true, Dtype = "text" },
            new ColumnDefintion { Title = "Last name", DataIndex = "lastName", Editable = true, Dtype = "text" },
            new ColumnDefintion { Title = "Patronymic", DataIndex = "patronymic", Editable = true, Dtype = "text" },
            new ColumnDefintion { Title = "Address", DataIndex = "address", Editable = true, Dtype = "text" },
            new ColumnDefintion { Title = "Phone", DataIndex = "phone", Editable = true, Dtype = "text" },
        };

        var data = _context.Clients.Select(client => client).ToArray();

        return new TableDefinition<Client> {
            Data = data,
            Columns = columns
        };
    }

    [HttpPatch("/api/clients/{id}")]
    public void UpdateClient(int id, ClientPatchBody body) {
        var client = _context.Clients.Find(id);
        PartialUpdate(client, body);
    }
}
