using System.Net;
using file_management.Models.DTOs;

namespace file_management.repository.IRepository
{
    public interface IHttpErrorResponse
    {
        APIResponseDto GetResponse(
            List<string> errorMessage,
            bool isSuccess = false,
            HttpStatusCode statusCode = HttpStatusCode.BadRequest
        );
    }
}