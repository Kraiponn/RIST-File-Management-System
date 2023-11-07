using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using file_management.Models.Domains;

namespace file_management.repository.IRepository
{
    public interface IDocumentCategoryRepository
    {
        Task<DocumentCategory> CreateAsync(DocumentCategory entity);
        Task<(long, List<DocumentCategory>, int, int)> GetAllAsync(
            string? filterOn = null,
            string? filterQuery = null,
            string? sortBy = null,
            bool isAscending = true,
            int pageNo = 1,
            int pageSize = 25
        );
        Task<DocumentCategory?> GetByIdAsync(Guid documentCategoryId);
        Task<DocumentCategory?> UpdateAsync(Guid documentCategoryId, DocumentCategory entity);
        Task<DocumentCategory?> DeleteAsync(Guid documentCategoryId);
    }
}