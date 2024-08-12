using System.Runtime.Serialization;

namespace MerakiEMS.Application.Services
{
    [Serializable]
    internal class PasswordResetException : Exception
    {
        public PasswordResetException()
        {
        }

        public PasswordResetException(string? message) : base(message)
        {
        }

        public PasswordResetException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected PasswordResetException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}