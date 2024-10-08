using System.Dynamic;

using Microsoft.AspNetCore.Mvc;

using PhotoStudio.DAL;

namespace PhotoStudio.Controllers;


[Controller]
public abstract class MainController : ControllerBase {
    protected readonly PhotoStudioContext _context;

    protected MainController(PhotoStudioContext context) {
        _context = context;
    }

    protected ObjectResult PartialUpdate<T, P>(T? entity, P body) where P : class {
        if (entity is null) {
            return NotFound(new {
                StatusCode = 404,
                ErrorMessage = "The item with this id does not exists"
            });
        }

        var patch = new ExpandoObject() as IDictionary<string, object>;

        foreach (var prop in body.GetType().GetProperties()) {
            var value = prop.GetValue(body);

            if (value is not null) {
                patch.Add(prop.Name, value);
            }
        }

        _context.Entry(entity).CurrentValues.SetValues(patch);
        _context.SaveChanges();

        return Ok(new { StatusCode = 200 });
    }
}
