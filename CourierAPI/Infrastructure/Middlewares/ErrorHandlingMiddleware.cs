using System;
using System.Net;
using System.Threading.Tasks;
using CourierAPI.Helpers;
using CourierAPI.Infrastructure.HttpResponseExModels;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace CourierAPI.Infrastructure.Middlewares
{
    public class ErrorHandlingMiddleware
    {
         private readonly RequestDelegate next;
    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task Invoke(HttpContext context /* other dependencies */)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        var code = HttpStatusCode.InternalServerError; // 500 if unexpected
        var exceptionPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        
        // if (ex is NotFoundErrorException) code = HttpStatusCode.Unauthorized;
        // else if (ex is ValidationException) code = HttpStatusCode.Unauthorized;
        // else if (ex is MyException)             code = HttpStatusCode.BadRequest;

        var result = JsonConvert.SerializeObject(new { error = ex.Message });
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;
        return context.Response.WriteAsync(result);
    }
    }
}