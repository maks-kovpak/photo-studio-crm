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
            new ColumnDefinition { Title = "ID", DataIndex = "id", Editable = false },
            new ColumnDefinition { Title = "Client", DataIndex = "clientId", Editable = true, DType = "select" },
            new ColumnDefinition { Title = "Acceptance Date", DataIndex = "acceptanceDate", Editable = true, DType = "date" },
            new ColumnDefinition { Title = "Issuance Date", DataIndex = "issuanceDate", Editable = true, DType = "date" },
        };

        var data = _context.Orders.Select(order => order).ToArray();

        return new TableDefinition<Order> {
            Data = data,
            Columns = columns
        };
    }
}
