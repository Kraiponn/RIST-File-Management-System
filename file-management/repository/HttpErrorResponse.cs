using System.Net;
using file_management.Models.DTOs;
using file_management.repository.IRepository;

namespace file_management.repository
{
    public class HttpErrorResponse : IHttpErrorResponse
    {
        public APIResponseDto GetResponse(
            List<string> errorMessage,
            bool isSuccess = false,
            HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        {
            var apiResponse = new APIResponseDto
            {
                isSuccess = isSuccess,
                statusCode = statusCode,
                errorMessage = errorMessage
            };

            return apiResponse;
        }
    }
}