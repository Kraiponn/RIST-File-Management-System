
namespace file_management.Models.DTOs
{
    public class PaginateResponseDto
    {
        public long total { get; set; }
        public object results { get; set; }
        public int pageNo { get; set; }
        public int pageSize { get; set; }
        public string? APIBaseUrl { get; set; }
    }
}