using Microsoft.AspNetCore.Mvc;

using PhotoStudio.DAL;
using PhotoStudio.Models;
using PhotoStudio.ResponseComponents;

namespace PhotoStudio.Controllers;


[ApiController]
[Route("/api/clients")]
public class ClientsController : ControllerBase {
    private readonly PhotoStudioContext _context;

    public ClientsController(PhotoStudioContext context) {
        _context = context;
    }

    [HttpGet]
    public TableDefinition<Client> Get() {
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
}
