using System.ComponentModel.DataAnnotations;

namespace file_management.Models.DTOs
{
    public class UpdateDocumentCategoryRequestDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Document category name must be more than 100 characters.")]
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}