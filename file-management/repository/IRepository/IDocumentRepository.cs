using file_management.Models.Domains;
using file_management.Models.DTOs;

namespace file_management.repository.IRepository
{
    public interface IDocumentRepository
    {
        Task<Document> CreateAsync(Document entity);
        Task<(long, List<Document>, int, int)> GetAllAsync(
            string? queryByDocumentId = null,
            string? queryByName = null,
            DateTime? queryByStartActivedDate = null,
            DateTime? queryByEndActivedDate = null,
            Guid? queryByDocumentCategoryId = null,
            string? sortBy = null,
            bool isAscending = true,
            int pageNo = 1,
            int pageSize = 25
        );
        Task<Document?> GetByIdAsync(string documentId);
        Task<Document?> UpdateAsync(string documentId, UpdateDocumentRequestDto dto);
        Task<Document?> DeleteAsync(string documentId);
    }
}