using Microsoft.AspNetCore.Mvc;

using PhotoStudio.DAL;
using PhotoStudio.Models;
using PhotoStudio.Response;

namespace PhotoStudio.Controllers;


public record ServicePatchBody(
    string? Name,
    string? Description,
    int? Price
);

[ApiController]
[Route("/api/services")]
public class ServicesController : MainController {
    public ServicesController(PhotoStudioContext context) : base(context) { }

    [HttpGet]
    public TableDefinition<Service> GetAllServices() {
        var columns = new[] {
            new ColumnDefinition { Title = "ID", DataIndex = "id", Editable = false },
            new ColumnDefinition { Title = "Name", DataIndex = "name", Editable = true, DType = "text" },
            new ColumnDefinition { Title = "Description", DataIndex = "description", Editable = true, DType = "text" },
            new ColumnDefinition { Title = "Price", DataIndex = "price", Editable = true, DType = "price" },
        };

        var data = _context.Services.Select(service => service).ToArray();

        return new TableDefinition<Service> {
            Data = data,
            Columns = columns
        };
    }

    [HttpPatch("/api/services/{id:int}")]
    public ObjectResult UpdateService(int id, ServicePatchBody body) {
        var service = _context.Services.Find(id);
        return PartialUpdate(service, body);
    }
}
