using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace file_management.Models.DTOs
{
    public class FileRequestDto
    {
        public IFormFile File { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
        public string Path { get; set; }
        public long SizeInBytes { get; set; }
    }
}