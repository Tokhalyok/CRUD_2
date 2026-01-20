using Microsoft.EntityFrameworkCore;
using ProductApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Подключение к БД
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// Настройка CORS для Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

app.Run();