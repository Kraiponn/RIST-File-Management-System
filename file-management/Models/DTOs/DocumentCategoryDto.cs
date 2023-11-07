using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace file_management.Models.DTOs
{
    public class DocumentCategoryDto
    {
        public Guid DocumentCategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // public virtual ICollection<Document> Documents { get; } = new List<Document>();
    }
}