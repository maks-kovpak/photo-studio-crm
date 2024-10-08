using Microsoft.AspNetCore.Mvc;

using PhotoStudio.DAL;
using PhotoStudio.Models;
using PhotoStudio.Response;

namespace PhotoStudio.Controllers;


public record ClientPatchBody(
    string? FirstName,
    string? LastName,
    string? Patronymic,
    string? Address,
    string? Phone
);

[ApiController]
[Route("/api/clients")]
public class ClientsController : MainController {
    public ClientsController(PhotoStudioContext context) : base(context) { }

    [HttpGet]
    public TableDefinition<Client> GetAllClients() {
        var columns = new[] {
            new ColumnDefinition { Title = "ID", DataIndex = "id", Editable = false },
            new ColumnDefinition { Title = "First name", DataIndex = "firstName", Editable = true, DType = "text" },
            new ColumnDefinition { Title = "Last name", DataIndex = "lastName", Editable = true, DType = "text" },
            new ColumnDefinition { Title = "Patronymic", DataIndex = "patronymic", Editable = true, DType = "text" },
            new ColumnDefinition { Title = "Address", DataIndex = "address", Editable = true, DType = "text" },
            new ColumnDefinition { Title = "Phone", DataIndex = "phone", Editable = true, DType = "text" },
        };

        var data = _context.Clients.Select(client => client).ToArray();

        return new TableDefinition<Client> {
            Data = data,
            Columns = columns
        };
    }

    [HttpPatch("/api/clients/{id:int}")]
    public ObjectResult UpdateClient(int id, ClientPatchBody body) {
        var client = _context.Clients.Find(id);
        return PartialUpdate(client, body);
    }
}
