using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using file_management.Models.Domains;

namespace file_management.Models.DTOs
{
    public class DocumentDto
    {
        public string DocumentId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Path { get; set; }
        public string Extension { get; set; }
        public long SizeInBytes { get; set; }
        public DateTime ActivedDate { get; set; }

        public Guid DocumentCategoryId { get; set; }
        public DocumentCategory DocumentCategory { get; set; }

        public string? APIBaseUrl { get; set; }
    }
}