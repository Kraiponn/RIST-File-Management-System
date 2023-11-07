using System.Net;
using AutoMapper;
using file_management.Data;
using file_management.Models.Domains;
using file_management.Models.DTOs;
using file_management.repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace file_management.Controllers
{
	[ApiController]
	[Route("api/v1/documents")]
	public class DocumentController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly IDocumentRepository _documentRepository;
		private readonly IWebHostEnvironment _webHost;
		private readonly IHttpContextAccessor _httpAcessor;
		private readonly IFileManagerRepository _fileManager;
		private readonly ILogger<DocumentController> _logger;
		private APIResponseDto _apiResponseDto;

		public DocumentController(
			IMapper mapper,
			IDocumentRepository documentRepository,
			IWebHostEnvironment webHost,
			IHttpContextAccessor httpAcessor,
			IFileManagerRepository fileManager,
			ILogger<DocumentController> logger
			)
		{
			_mapper = mapper;
			_documentRepository = documentRepository;
			_webHost = webHost;
			_httpAcessor = httpAcessor;
			_fileManager = fileManager;
			_logger = logger;
			_apiResponseDto = new APIResponseDto();
		}

		/***************************************************************************************************************
       *   @Description     Created new document
       *   @Route              POST : api/v1/documents
       *   @Access            Private
       ***************************************************************************************************************/
		[HttpPost]
		public async Task<ActionResult<APIResponseDto>> Create([FromForm] CreateDocumentRequestDto dto, IFormFile file)
		{
			try
			{
				// Validate file extensions
				this.ValidateFile(file);

				if (!ModelState.IsValid)
				{
					var errorMessage = string.Join(" , ", ModelState.Values
													.SelectMany(v => v.Errors)
													.Select(e => e.ErrorMessage));

					_apiResponseDto.isSuccess = false;
					_apiResponseDto.statusCode = HttpStatusCode.BadRequest;
					_apiResponseDto.errorMessage = new List<string> { errorMessage };

					return BadRequest(_apiResponseDto);
				}

				var fileExtension = Path.GetExtension(file.FileName);
				var filePrefixed = fileExtension.Substring(1).ToUpper();
				var fileName = $"{filePrefixed}-{Guid.NewGuid()}";
				var uploadPath = this.GetUploadPath(fileExtension);
				var localPath = Path.Combine(_webHost.WebRootPath, uploadPath);

				var fileDto = new FileRequestDto
				{
					File = file,
					FileName = fileName + fileExtension,
					Extension = fileExtension,
					Path = localPath,
					SizeInBytes = file.Length
				};

				// Record to Database
				var domainModel = new Document
				{
					DocumentId = fileName,
					Name = dto.Name,
					Description = dto.Description ?? "",
					Path = Path.Combine(uploadPath, fileName + fileExtension),
					Extension = fileExtension,
					SizeInBytes = file.Length,
					DocumentCategoryId = dto.DocumentCategoryId
				};

				domainModel = await _documentRepository.CreateAsync(domainModel);

				if (domainModel == null)
				{
					_apiResponseDto.isSuccess = false;
					_apiResponseDto.statusCode = HttpStatusCode.BadRequest;
					_apiResponseDto.errorMessage = new List<string> { "Something went wrong. Please try again." };

					return BadRequest(_apiResponseDto);
				}

				// File uploaded 
				await _fileManager.UploadFileAsync(fileDto);

				_apiResponseDto.data = _mapper.Map<DocumentDto>(domainModel);
				return Created("", _apiResponseDto);
			}
			catch (Exception ex)
			{
				_apiResponseDto.isSuccess = false;
				_apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
				_apiResponseDto.errorMessage = new List<string> { ex.Message };

				return BadRequest(_apiResponseDto);
			}
		}

		/***************************************************************************************************************
        *   @Description     Get all documents
        *   @Route              GET : api/v1/documents?
        *                                       &documentId=?&name=?&startActivedDate=?&endActivedDate=?&documentCategoryId=?
        *                                       &sortBy=x&isAscending=true&pageNo=1&pageSize=25
        *   @Access            Public
        ***************************************************************************************************************/
		[HttpGet]
		public async Task<ActionResult<APIResponseDto>> GetAll(
			[FromQuery] string? documentId = null,
			[FromQuery] string? name = null,
			[FromQuery] DateTime? startActivedDate = null,
			[FromQuery] DateTime? endActivedDate = null,
			[FromQuery] Guid? documentCategoryId = null,
			[FromQuery] string? sortBy = null,
			[FromQuery] bool? isAscending = null,
			[FromQuery] int pageNo = 1,
			[FromQuery] int pageSize = 25
		)
		{

			try
			{
				(long total, List<Document> data, int _pageNo, int _pageSize) = await _documentRepository.GetAllAsync(
					documentId,
					name,
					startActivedDate,
					endActivedDate,
					documentCategoryId,
					sortBy,
					isAscending: isAscending ?? false,
					pageNo,
					pageSize
				);

				// Convert domain model to DTO
				var documentsDto = _mapper.Map<List<DocumentDto>>(data);

				// Setting pagination response
				var pagination = new PaginateResponseDto
				{
					total = total,
					results = documentsDto,
					pageNo = pageNo,
					pageSize = pageSize,
					APIBaseUrl = $"{_httpAcessor?.HttpContext?.Request.Scheme}://{_httpAcessor?.HttpContext?.Request.Host}"
				};

				// Set the results for http response
				_apiResponseDto.data = pagination;

				return Ok(_apiResponseDto);
			}
			catch (Exception ex)
			{
				_apiResponseDto.isSuccess = false;
				_apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
				_apiResponseDto.errorMessage = new List<string> { ex.Message };

				return BadRequest(_apiResponseDto);
			}
		}

		/***************************************************************************************************************
        *   @Description     Get a document by id
        *   @Route              GET : api/v1/documents/{documentId}
        *   @Access            Public
        ***************************************************************************************************************/
		[HttpGet]
		[Route("{documentId}")]
		public async Task<ActionResult<APIResponseDto>> GetDocumentById([FromRoute] string documentId)
		{
			try
			{
				var existingDocument = await _documentRepository.GetByIdAsync(documentId);

				if (existingDocument == null)
				{
					_apiResponseDto.isSuccess = false;
					_apiResponseDto.statusCode = System.Net.HttpStatusCode.NotFound;
					_apiResponseDto.errorMessage = new List<string> { $"Document not found with id of {documentId}" };

					return NotFound(_apiResponseDto);
				}

				var apiBaseUrl = $"{Request.Scheme}://{Request.Host}";
				var documentDto = _mapper.Map<DocumentDto>(existingDocument);

				documentDto.APIBaseUrl = apiBaseUrl;
				_apiResponseDto.data = documentDto;

				return Ok(_apiResponseDto);
			}
			catch (Exception ex)
			{
				_apiResponseDto.isSuccess = false;
				_apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
				_apiResponseDto.errorMessage = new List<string> { ex.Message };

				return BadRequest(_apiResponseDto);
			}
		}

		/***************************************************************************************************************
       *   @Description     Updated a document by id
       *   @Route              PUT : api/v1/documents/{documentId}
       *   @Access            Private
       ***************************************************************************************************************/
		[HttpPut]
		[Route("{documentId}")]
		public async Task<ActionResult<APIResponseDto>> Update(
			[FromRoute] string documentId,
			[FromForm] UpdateDocumentRequestDto updateDocumentRequestDto,
			IFormFile? file
		)
		{
			try
			{
				// Update data on database
				var existingDocument = await _documentRepository.GetByIdAsync(documentId);

				if (existingDocument == null)
				{
					_apiResponseDto.isSuccess = false;
					_apiResponseDto.statusCode = System.Net.HttpStatusCode.NotFound;
					_apiResponseDto.errorMessage = new List<string> { $"File not found with id of {documentId}" };

					return NotFound(_apiResponseDto);
				}

				// Check new attached file
				if (file?.Length > 0 && file != null)
				{
					// Validate file extensions
					this.ValidateFile(file);

					if (!ModelState.IsValid)
					{
						var errorMessage = string.Join(" , ", ModelState.Values
														.SelectMany(v => v.Errors)
														.Select(e => e.ErrorMessage));

						_apiResponseDto.isSuccess = false;
						_apiResponseDto.statusCode = HttpStatusCode.BadRequest;
						_apiResponseDto.errorMessage = new List<string> { errorMessage };

						return BadRequest(_apiResponseDto);
					}

					// Remove old file from the upload path
					_fileManager.RemoveFile(Path.Combine(_webHost.WebRootPath, existingDocument.Path));

					var fileExtension = Path.GetExtension(file.FileName);
					var filePrefixed = fileExtension.Substring(1).ToUpper();
					var fileName = existingDocument.DocumentId.ToString();
					var uploadPath = this.GetUploadPath(fileExtension);
					var localPath = Path.Combine(_webHost.WebRootPath, uploadPath);

					var fileDto = new FileRequestDto
					{
						File = file,
						FileName = fileName + fileExtension,
						Extension = fileExtension,
						Path = localPath,
						SizeInBytes = file.Length
					};

					// Uploaded new file to api path
					await _fileManager.UploadFileAsync(fileDto);

					// Set update document dto to update to database
					updateDocumentRequestDto.Path = Path.Combine(uploadPath, fileName + fileExtension);
					updateDocumentRequestDto.Extension = fileExtension;
					updateDocumentRequestDto.SizeInBytes = file.Length;
				}

				updateDocumentRequestDto.ActivedDate = DateTime.Now;
				updateDocumentRequestDto.DocumentCategoryId =
										updateDocumentRequestDto.DocumentCategoryId ?? existingDocument.DocumentCategoryId;

				// Update document data on database
				var updatedResult = await _documentRepository.UpdateAsync(documentId, updateDocumentRequestDto);

				// Convert domain model to dto
				var documentDto = _mapper.Map<DocumentDto>(updatedResult);

				documentDto.APIBaseUrl = $"{Request.Scheme}://{Request.Host}";
				_apiResponseDto.data = documentDto;

				return Ok(_apiResponseDto);
			}
			catch (Exception ex)
			{
				_apiResponseDto.isSuccess = false;
				_apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
				_apiResponseDto.errorMessage = new List<string> { ex.Message };

				return BadRequest(_apiResponseDto);
			}
		}

		/***************************************************************************************************************
        *   @Description     Remove a document by id
        *   @Route              DELETE : api/v1/documents/{documentId}
        *   @Access            Private
        ***************************************************************************************************************/
		[HttpDelete]
		[Route("{documentId}")]
		public async Task<ActionResult<APIResponseDto>> Delete([FromRoute] string documentId)
		{
			try
			{
				// Remove from database
				var existingDocument = await _documentRepository.DeleteAsync(documentId);

				if (existingDocument == null)
				{
					_apiResponseDto.isSuccess = false;
					_apiResponseDto.statusCode = System.Net.HttpStatusCode.NotFound;
					_apiResponseDto.errorMessage = new List<string> { $"File not found with id of {documentId}" };

					return NotFound(_apiResponseDto);
				}

				// Convert domain model to dto
				var documentDto = _mapper.Map<DocumentDto>(existingDocument);
				// Get upload path for remove a file
				var filePath = Path.Combine(_webHost.WebRootPath, documentDto.Path);

				_fileManager.RemoveFile(filePath);
				_apiResponseDto.data = documentDto;

				return Ok(_apiResponseDto);
			}
			catch (Exception ex)
			{
				_apiResponseDto.isSuccess = false;
				_apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
				_apiResponseDto.errorMessage = new List<string> { ex.Message };

				return BadRequest(_apiResponseDto);
			}
		}

		/***************************************************************************************************************
        *   @Description     Download file
        *   @Route              GET : api/v1/documents/downlaodfile/{documentId}
        *   @Access            Public
        ***************************************************************************************************************/
		[HttpGet]
		[Route("downloadfile/{documentId}")]
		public async Task<IActionResult> DownloadFile([FromRoute] string documentId)
		{
			try
			{
				var existingDocument = await _documentRepository.GetByIdAsync(documentId);

				if (existingDocument == null)
				{
					_apiResponseDto.isSuccess = false;
					_apiResponseDto.statusCode = System.Net.HttpStatusCode.NotFound;
					_apiResponseDto.errorMessage = new List<string> { $"File not found with id of {documentId}" };

					return NotFound(_apiResponseDto);
				}

				(byte[] content, string contentType, string filePath) =
													await _fileManager.DownloadFileAsync(existingDocument.DocumentId, existingDocument.Path);

				return File(content, contentType, Path.GetFileName(filePath));
			}
			catch (Exception ex)
			{
				_apiResponseDto.isSuccess = false;
				_apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
				_apiResponseDto.errorMessage = new List<string> { ex.Message };

				return BadRequest(_apiResponseDto);
			}
		}

		/**************************************************************************************************************
        *   Helper method for validate file extensions
        */
		private void ValidateFile(IFormFile file)
		{
			var allowedExtensions = new string[] { ".pdf", ".csv", ".xlsx", ".xls", ".docx", ".doc", ".pptx", ".ppt", ".txt", ".jpg", ".jpeg", ".png" };
			var extensionName = Path.GetExtension(file.FileName);

			if (allowedExtensions.Contains(extensionName.ToLower()) == false)
			{
				ModelState.AddModelError("File", "Unsupported file extensions");
			}

			// File not more than 10Mb
			// if (file.Length > 10485760)
			// {
			//     ModelState.AddModelError("File", "File size more than 10Mb, Please upload a smaller size file.");
			// }
		}

		/**************************************************************************************************************
       *   Helper method - Seperated of the each file type to each path
       */
		private string GetUploadPath(string fileExtension)
		{
			return fileExtension.ToLower() switch
			{
				".pdf" => @"Uploads\PDFs",
				".docx" => @"Uploads\DOCs",
				".doc" => @"Uploads\DOCs",
				".xlsx" => @"Uploads\XLSs",
				".xls" => @"Uploads\XLSs",
				".pptx" => @"Uploads\PPTs",
				".ppt" => @"Uploads\PPTs",
				".txt" => @"Uploads\TXTs",
				".jpg" => @"Uploads\Images",
				".jpeg" => @"Uploads\Images",
				".png" => @"Uploads\Images",
				_ => @"Uploads\PDFs"
			};
		}
	}
}