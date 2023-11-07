using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace file_management.Models.DTOs
{
    public class APIResponseDto
    {
        public bool isSuccess { get; set; } = true;
        public HttpStatusCode statusCode { get; set; } = HttpStatusCode.OK;
        public IEnumerable<string> errorMessage { get; set; } = new List<string>();
        public object data { get; set; }
    }
}