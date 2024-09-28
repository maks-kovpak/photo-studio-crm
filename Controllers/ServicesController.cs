using Microsoft.AspNetCore.Mvc;

using PhotoStudio.DAL;
using PhotoStudio.Models;
using PhotoStudio.Response;

namespace PhotoStudio.Controllers;


[ApiController]
[Route("/api/services")]
public class ServicesController : ControllerBase {
    private readonly PhotoStudioContext _context;

    public ServicesController(PhotoStudioContext context) {
        _context = context;
    }

    [HttpGet]
    public TableDefinition<Service> Get() {
        var columns = new[] {
            new ColumnDefintion { Title = "ID", DataIndex = "id", Editable = false },
            new ColumnDefintion { Title = "Name", DataIndex = "name", Editable = true, Dtype = "text" },
            new ColumnDefintion { Title = "Description", DataIndex = "description", Editable = true, Dtype = "text" },
            new ColumnDefintion { Title = "Price", DataIndex = "price", Editable = true, Dtype = "price" },
        };

        var data = _context.Services.Select(service => service).ToArray();

        return new TableDefinition<Service> {
            Data = data,
            Columns = columns
        };
    }
}
