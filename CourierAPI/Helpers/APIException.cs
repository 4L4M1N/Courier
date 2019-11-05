using System;
using System.Globalization;

namespace CourierAPI.Helpers
{
    public class APIException : Exception
    {
        public APIException() : base(){ }
        public APIException(string message): base(message){ }
        public APIException(string message, params object[] args) 
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}