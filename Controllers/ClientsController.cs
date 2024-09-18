using Microsoft.AspNetCore.Mvc;

using PhotoStudio.DAL;

namespace PhotoStudio.Controllers;

[ApiController]
[Route("/api/clients")]
public class ClientsController : ControllerBase {
    private readonly PhotoStudioContext _context;

    public ClientsController(PhotoStudioContext context) {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<object> Get() {
        return _context.Clients.Select(client => client).ToArray();
    }
}
