using System.ComponentModel.DataAnnotations;

namespace file_management.Models.DTOs
{
    public class CreateDocumentRequestDto
    {
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
        public DateTime? ActivedDate { get; set; }

        [Required]
        public Guid DocumentCategoryId { get; set; }
    }
}