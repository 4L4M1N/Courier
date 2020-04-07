using CourierAPI.Helpers;
using CourierAPI.Infrastructure.HttpResponseExModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CourierAPI.Infrastructure.ActionFilters
{
    public class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
{
    public int Order { get; set; } = int.MaxValue - 10;

    public void OnActionExecuting(ActionExecutingContext context) { }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Exception is InternalServerErrorException exception)
        {
            context.Result = new ObjectResult(exception.Value)
            {
                StatusCode = exception.Status,
            };
            context.ExceptionHandled = true;
        }
    }
}
}