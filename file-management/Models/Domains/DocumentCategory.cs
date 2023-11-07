using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace file_management.Models.Domains
{
    public class DocumentCategory
    {
        public Guid DocumentCategoryId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        // public virtual ICollection<Document> Documents { get; } = new List<Document>();
    }
}