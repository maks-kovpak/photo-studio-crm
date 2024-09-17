using Microsoft.EntityFrameworkCore;

using PhotoStudio.DAL;


WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

string? connectionString = builder.Configuration.GetConnectionString("PhotoStudioDatabase");
builder.Services.AddDbContext<PhotoStudioContext>((options) => options.UseSqlite(connectionString));

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) { }

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}"
);

app.MapFallbackToFile("index.html");
app.Run();
