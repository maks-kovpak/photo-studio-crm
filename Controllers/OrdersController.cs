using Microsoft.AspNetCore.Mvc;

using PhotoStudio.DAL;
using PhotoStudio.Models;
using PhotoStudio.Response;

namespace PhotoStudio.Controllers;


[ApiController]
[Route("/api/orders")]
public class OrdersController : ControllerBase {
    private readonly PhotoStudioContext _context;

    public OrdersController(PhotoStudioContext context) {
        _context = context;
    }

    [HttpGet]
    public TableDefinition<Order> Get() {
        var columns = new[] {
            new ColumnDefintion { Title = "ID", DataIndex = "id", Editable = false },
            new ColumnDefintion { Title = "Client", DataIndex = "clientId", Editable = true, Dtype = "select" },
            new ColumnDefintion { Title = "Acceptance Date", DataIndex = "acceptanceDate", Editable = true, Dtype = "date" },
            new ColumnDefintion { Title = "Issuance Date", DataIndex = "issuanceDate", Editable = true, Dtype = "date" },
        };

        var data = _context.Orders.Select(order => order).ToArray();

        return new TableDefinition<Order> {
            Data = data,
            Columns = columns
        };
    }
}
