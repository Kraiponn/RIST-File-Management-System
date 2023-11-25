
namespace file_management.Models.DTOs
{
    public class UpdateDocumentRequestDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Path { get; set; }
        public string? Extension { get; set; }
        public long? SizeInBytes { get; set; }
        public DateTime? ActivedDate { get; set; }
		public IFormFile? File { get; set; }

        public Guid? DocumentCategoryId { get; set; }
    }
}