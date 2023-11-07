using file_management;
using file_management.Data;
using file_management.repository;
using file_management.repository.IRepository;
using Microsoft.EntityFrameworkCore;
// using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add logger
// var logger = new LoggerConfiguration()
//     .MinimumLevel.Information()
//     .WriteTo.Console()
//     .WriteTo.File("Logs/FMN_Log.txt", rollingInterval: RollingInterval.Day)
//     .CreateLogger();

// builder.Logging.ClearProviders();
// builder.Logging.AddSerilog(logger);

// Add connection db
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevelopmentConnection"));
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

// Default Policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("*")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddScoped<IDocumentCategoryRepository, DocumentCategoryRepository>();
builder.Services.AddScoped<IDocumentRepository, DocumentRepository>();
builder.Services.AddScoped<IFileManagerRepository, FileManagerRepository>();
builder.Services.AddScoped<IHttpErrorResponse, HttpErrorResponse>();
builder.Services.AddAutoMapper(typeof(MapperProfile));
// builder.Services.AddAutoMapper(typeof(Program).Assembly);
// builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHttpContextAccessor();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Middlewares
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseAuthorization();

// Config the path for manage the files
app.UseStaticFiles(
// new StaticFileOptions
// {
//     FileProvider = new PhysicalFileProvider(
//         Path.Combine(Directory.GetCurrentDirectory(), "Uploads")
//     ),
//     RequestPath = "/Uploads"
// }
);

app.MapControllers();

app.Run();
