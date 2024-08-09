using System.Runtime.Serialization;

namespace MerakiEMS.Api.Controllers
{
    [Serializable]
    internal class InvalidResetTokenException : Exception
    {
        public InvalidResetTokenException()
        {
        }

        public InvalidResetTokenException(string? message) : base(message)
        {
        }

        public InvalidResetTokenException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected InvalidResetTokenException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}