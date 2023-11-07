using file_management.Data;
using file_management.Models.Domains;
using file_management.repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace file_management.repository
{
    public class DocumentCategoryRepository : IDocumentCategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public DocumentCategoryRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /*******************************************************************************
        *   Add data
        */
        public async Task<DocumentCategory> CreateAsync(DocumentCategory entity)
        {
            await _dbContext.DocumentCategories.AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return entity;
        }

        /*******************************************************************************
        *   Remove data
        */
        public async Task<DocumentCategory?> DeleteAsync(Guid documentCategoryId)
        {
            var existingDocCategory = await _dbContext.DocumentCategories.FirstOrDefaultAsync(x => x.DocumentCategoryId == documentCategoryId);

            if (existingDocCategory == null)
            {
                return null;
            }

            _dbContext.DocumentCategories.Remove(existingDocCategory);
            await _dbContext.SaveChangesAsync();

            return existingDocCategory;
        }

        /*******************************************************************************
        *   Get all data by filter keys
        */
        public async Task<(long, List<DocumentCategory>, int, int)> GetAllAsync(
            string? filterOn = null,
            string? filterQuery = null,
            string? sortBy = null,
            bool isAscending = true,
            int pageNo = 1,
            int pageSize = 25)
        {
            var query = _dbContext.DocumentCategories.AsQueryable();

            // Filter search key
            if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    query = query.Where(x => x.Name.Contains(filterQuery));
                }
            }

            // Sorting
            if (string.IsNullOrWhiteSpace(sortBy) == false)
            {
                if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                    query = isAscending ? query.OrderBy(x => x.Name) : query.OrderByDescending(x => x.Name);
            }
            else
            {
                query = isAscending ? query.OrderBy(x => x.DocumentCategoryId) : query.OrderByDescending(x => x.DocumentCategoryId);
            }

            var total = await query.CountAsync();
            var skipResults = (pageNo - 1) * pageSize;

            var results = await query.Skip(skipResults).Take(pageSize).ToListAsync();

            return (total, results, pageNo, pageSize);
        }

        /*******************************************************************************
        *   Get a single data
        */
        public async Task<DocumentCategory?> GetByIdAsync(Guid documentCategoryId)
        {
            return await _dbContext.DocumentCategories
                // .Include("Documents")
                .FirstOrDefaultAsync(x => x.DocumentCategoryId == documentCategoryId);
        }

        /*******************************************************************************
        *   Edit data
        */
        public async Task<DocumentCategory?> UpdateAsync(Guid documentCategoryId, DocumentCategory entity)
        {
            var existingDocCategory = await _dbContext.DocumentCategories.FirstOrDefaultAsync(x => x.DocumentCategoryId == documentCategoryId);

            if (existingDocCategory == null)
            {
                return null;
            }

            existingDocCategory.Name = entity.Name ?? existingDocCategory.Name;
            existingDocCategory.Description = entity.Description ?? existingDocCategory.Description;
            await _dbContext.SaveChangesAsync();

            return existingDocCategory;
        }
    }
}