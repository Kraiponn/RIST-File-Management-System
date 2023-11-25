using file_management.Data;
using file_management.Models.Domains;
using file_management.Models.DTOs;
using file_management.repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;

namespace file_management.repository
{
	public class DocumentRepository : IDocumentRepository
	{
		private readonly ApplicationDbContext _dbContext;

		public DocumentRepository(ApplicationDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		/**********************************************************************************************
        *   @Desc        Add new document
        *   @Param      Document
        *   @Return     Document
        */
		public async Task<Document> CreateAsync(Document entity)
		{
			await _dbContext.Documents.AddAsync(entity);
			await _dbContext.SaveChangesAsync();

			return entity;
		}

		/**********************************************************************************************
        *   @Desc        Remove a document
        *   @Param      string
        *   @Return     Document | null
        */
		public async Task<Document?> DeleteAsync(string documentId)
		{
			var existingDocument = await _dbContext.Documents.FirstOrDefaultAsync(x => x.DocumentId == documentId);

			if (existingDocument == null) return null;

			_dbContext.Remove(existingDocument);
			await _dbContext.SaveChangesAsync();

			return existingDocument;
		}

		/**********************************************************************************************
        *   @Desc        Get many documents
        *   @Param      string
        *   @Param      string
        *   @Param      DateTime
        *   @Param      DateTime
        *   @Param      Guid
        *   @Param      string | null
        *   @Param      bool
        *   @Param      int
        *   @Param      int
        *   @Return     Tuple of (long, List<Document>, int, int) 
        */
		public async Task<(long, List<Document>, int, int)> GetAllAsync(
			string? queryByDocumentId = null,
			string? queryByName = null,
			DateTime? queryByStartActivedDate = null,
			DateTime? queryByEndActivedDate = null,
			Guid? queryByDocumentCategoryId = null,
			string? sortBy = null,
			bool isAscending = true,
			int pageNo = 1,
			int pageSize = 25)
		{
			var query = _dbContext.Documents.AsQueryable();

			// Filter
			if (
				!string.IsNullOrWhiteSpace(queryByName) &&
				queryByStartActivedDate != null &&
				queryByDocumentId != null &&
				queryByDocumentCategoryId != null)
			{
				query = queryByEndActivedDate switch
				{
					null => query.Where(q =>
								q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()) &&
								q.Name.ToLower().Contains(queryByName.ToLower()) &&
								q.ActivedDate.Date == queryByStartActivedDate.Value.Date &&
								q.DocumentCategoryId == queryByDocumentCategoryId),
					_ => query.Where(q =>
							q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()) &&
							q.Name.ToLower().Contains(queryByName.ToLower()) &&
							q.ActivedDate.Date >= queryByStartActivedDate.Value.Date &&
							q.ActivedDate.Date <= queryByEndActivedDate.Value.Date &&
							q.DocumentCategoryId == queryByDocumentCategoryId)
				};
			}
			else if (
				!string.IsNullOrWhiteSpace(queryByName) &&
				queryByStartActivedDate != null &&
				queryByDocumentCategoryId != null)
			{
				query = queryByEndActivedDate switch
				{
					null => query.Where(q =>
								q.ActivedDate.Date == queryByStartActivedDate.Value.Date &&
								q.DocumentCategoryId == queryByDocumentCategoryId),
					_ => query.Where(q =>
							q.ActivedDate.Date >= queryByStartActivedDate.Value.Date &&
							q.ActivedDate.Date <= queryByEndActivedDate.Value.Date &&
							q.DocumentCategoryId == queryByDocumentCategoryId)
				};
			}
			else if (
				!string.IsNullOrWhiteSpace(queryByName) &&
				queryByStartActivedDate != null &&
				queryByDocumentId != null)
			{
				// Console.WriteLine("Looper DocumentId and DocumentName");
				query = queryByEndActivedDate switch
				{
					null => query.Where(q =>
								q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()) &&
								q.Name.ToLower().Contains(queryByName.ToLower()) &&
								q.ActivedDate.Date == queryByStartActivedDate.Value.Date),
					_ => query.Where(q =>
							q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()) &&
							q.Name.ToLower().Contains(queryByName.ToLower()) &&
							q.ActivedDate.Date >= queryByStartActivedDate.Value.Date &&
							q.ActivedDate.Date <= queryByEndActivedDate.Value.Date)
				};
			}
			else if (
				queryByStartActivedDate != null &&
				queryByDocumentId != null &&
				queryByDocumentCategoryId != null)
			{
				query = queryByEndActivedDate switch
				{
					null => query.Where(q =>
								q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()) &&
								q.ActivedDate.Date == queryByStartActivedDate.Value.Date &&
								q.DocumentCategoryId == queryByDocumentCategoryId),
					_ => query.Where(q =>
							q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()) &&
							q.ActivedDate.Date >= queryByStartActivedDate.Value.Date &&
							q.ActivedDate.Date <= queryByEndActivedDate.Value.Date &&
							q.DocumentCategoryId == queryByDocumentCategoryId)
				};
			}
			else if (queryByStartActivedDate != null && queryByDocumentId != null)
			{
				// Console.WriteLine("Access Looping")
				query = queryByEndActivedDate switch
				{
					null => query.Where(q =>
								q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()) &&
								q.ActivedDate.Date == queryByStartActivedDate.Value.Date),
					_ => query.Where(q =>
							q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()) &&
							q.ActivedDate.Date >= queryByStartActivedDate.Value.Date &&
							q.ActivedDate.Date <= queryByEndActivedDate.Value.Date)
				};
			}
			else if (
				!string.IsNullOrWhiteSpace(queryByName) &&
				queryByStartActivedDate != null)
			{
				query = queryByEndActivedDate switch
				{
					null => query.Where(q =>
								q.Name.ToLower().Contains(queryByName.ToLower()) &&
								q.ActivedDate.Date == queryByStartActivedDate.Value.Date),
					_ => query.Where(q =>
							q.Name.ToLower().Contains(queryByName.ToLower()) &&
							q.ActivedDate.Date >= queryByStartActivedDate.Value.Date &&
							q.ActivedDate.Date <= queryByEndActivedDate.Value.Date)
				};
			}
			else if (
				queryByStartActivedDate != null &&
				queryByDocumentCategoryId != null)
			{
				query = queryByEndActivedDate switch
				{
					null => query.Where(q =>
								q.ActivedDate.Date == queryByStartActivedDate.Value.Date &&
								q.DocumentCategoryId == queryByDocumentCategoryId),
					_ => query.Where(q =>
							q.ActivedDate.Date >= queryByStartActivedDate.Value.Date &&
							q.ActivedDate.Date <= queryByEndActivedDate.Value.Date &&
							q.DocumentCategoryId == queryByDocumentCategoryId)
				};
			}
			else if (queryByStartActivedDate != null)
			{
				query = queryByEndActivedDate switch
				{
					null => query.Where(q =>
								q.ActivedDate.Date == queryByStartActivedDate.Value.Date),
					_ => query.Where(q =>
							q.ActivedDate.Date >= queryByStartActivedDate.Value.Date &&
							q.ActivedDate.Date <= queryByEndActivedDate.Value.Date)
				};
			}
			else
			{
				if (!string.IsNullOrEmpty(queryByDocumentId))
				{
					query = query.Where(q => q.DocumentId.ToLower().Contains(queryByDocumentId.ToLower()));
				}
			}

			// Sorting
			if (!string.IsNullOrWhiteSpace(sortBy))
			{
				if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
				{
					query = isAscending ? query.OrderBy(o => o.Name) : query.OrderByDescending(o => o.Name);
				}
				else
				{
					query = isAscending ? query.OrderBy(o => o.ActivedDate) : query.OrderByDescending(o => o.ActivedDate);
				}
			}

			var total = await query.CountAsync();
			var skipResults = (pageNo - 1) * pageSize;

			var documents = await query
										.Skip(skipResults)
										.Take(pageSize)
										.Include(x => x.DocumentCategory)
										.ToListAsync();

			return (total, documents, pageNo, pageSize);
		}

		/**********************************************************************************************
        *   @Desc        Get a document by document id
        *   @Param      Document Id
        *   @Return     Document or Null
        */
		public async Task<Document?> GetByIdAsync(string documentId)
		{
			var existingDocument = await _dbContext.Documents
																.Include(x => x.DocumentCategory)
																.FirstOrDefaultAsync(x => x.DocumentId == documentId);
			return existingDocument;
		}

		/**********************************************************************************************
        *   @Desc        Edit a document by document id
        *   @Param      string
        *   @Param      UpdateDocumentRequestDto
        *   @Return     Document | null
        */
		public async Task<Document?> UpdateAsync(string documentId, UpdateDocumentRequestDto dto)
		{
			var existingDocument = await _dbContext.Documents.FirstOrDefaultAsync(x => x.DocumentId == documentId);

			if (existingDocument == null) return null;

			existingDocument.Name = dto.Name ?? existingDocument.Name;
			existingDocument.Description = dto.Description ?? existingDocument.Description;
			existingDocument.Path = dto.Path ?? existingDocument.Path;
			existingDocument.Extension = dto.Extension ?? existingDocument.Extension;
			existingDocument.SizeInBytes = dto.SizeInBytes ?? existingDocument.SizeInBytes;
			existingDocument.ActivedDate = dto.ActivedDate ?? existingDocument.ActivedDate;
			existingDocument.DocumentCategoryId = dto.DocumentCategoryId ?? existingDocument.DocumentCategoryId;

			_dbContext.Documents.Update(existingDocument);
			await _dbContext.SaveChangesAsync();

			return existingDocument;
		}
	}
}