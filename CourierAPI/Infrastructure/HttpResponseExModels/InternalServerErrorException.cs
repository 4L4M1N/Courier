using System;

namespace CourierAPI.Infrastructure.HttpResponseExModels
{
    public class InternalServerErrorException : Exception
{
    public int Status { get; set; } = 500;

    public object Value { get; set; }
}
}