using AutoMapper;
using file_management.Data;
using file_management.Models.Domains;
using file_management.Models.DTOs;
using file_management.repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace file_management.Controllers
{
    [ApiController]
    [Route("api/v1/document-categories")]
    public class DocumentCategoryController : ControllerBase
    {
        private readonly IDocumentCategoryRepository _dcRepository;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<DocumentCategoryController> _logger;
        private PaginateResponseDto _paginateResponseDto;
        private APIResponseDto _apiResponseDto;

        public DocumentCategoryController(
            IDocumentCategoryRepository dcRepository,
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<DocumentCategoryController> logger
            )
        {
            _dcRepository = dcRepository;
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
            _paginateResponseDto = new PaginateResponseDto();
            _apiResponseDto = new APIResponseDto();
        }

        /***************************************************************************************************************
        *   @Description     Created new document category
        *   @Route              POST : api/v1/document-categories
        *   @Access            Private
        ***************************************************************************************************************/
        [HttpPost]
        public async Task<ActionResult<APIResponseDto>> Create([FromBody] CreateDocumentCategoryRequestDto dto)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var domainModel = _mapper.Map<DocumentCategory>(dto);
                domainModel = await _dcRepository.CreateAsync(domainModel);

                if (domainModel == null)
                {
                    _apiResponseDto.isSuccess = false;
                    _apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
                    _apiResponseDto.errorMessage = new List<string> { "Something went wrong, Please try again." };

                    return BadRequest(_apiResponseDto);
                }

                var documentCategoryDto = _mapper.Map<DocumentCategoryDto>(domainModel);

                _apiResponseDto.data = documentCategoryDto;
                _apiResponseDto.statusCode = System.Net.HttpStatusCode.Created;
                await transaction.CommitAsync();

                return Created("", _apiResponseDto);
            }
            catch (Exception ex)
            {
                _apiResponseDto.isSuccess = false;
                _apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
                _apiResponseDto.errorMessage = new List<string> { ex.Message };

                await transaction.RollbackAsync();

                return BadRequest(_apiResponseDto);
            }
        }

        /***************************************************************************************************************
        *   @Description     Get all categories
        *   @Route              GET : api/v1/document-categories?
        *                                       filterOn=name&filterQuery=name&sortBy=x&isAscending=true&pageNo=1&pageSize=20
        *   @Access            Public
        ***************************************************************************************************************/
        [HttpGet]
        // public async Task<ActionResult<APIResponseDto>> GetAll(
        public async Task<ActionResult> GetAll(
            [FromQuery] string? filterOn = null,
            [FromQuery] string? filterQuery = null,
            [FromQuery] string? sortBy = null,
            [FromQuery] bool? isAscending = null,
            [FromQuery] int pageNo = 1,
            [FromQuery] int pageSize = 25
        )
        {
            try
            {
                (long total, List<DocumentCategory> data, int _pageNo, int _pageSize) = await _dcRepository.GetAllAsync(
                    filterOn,
                    filterQuery,
                    sortBy,
                    isAscending ?? false,
                    pageNo,
                    pageSize
                );

                var documentCategoryDto = _mapper.Map<List<DocumentCategoryDto>>(data);

                _paginateResponseDto.total = total;
                _paginateResponseDto.results = data;
                _paginateResponseDto.pageNo = _pageNo;
                _paginateResponseDto.pageSize = _pageSize;

                _apiResponseDto.data = _paginateResponseDto;

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
        *   @Description     Get a category by id
        *   @Route              GET : api/v1/document-categories/{documentCategoryId}
        *   @Access            Public
        ***************************************************************************************************************/
        [HttpGet]
        [Route("{documentCategoryId:Guid}")]
        public async Task<ActionResult<APIResponseDto>> GetDocCategoryById([FromRoute] Guid documentCategoryId)
        {
            try
            {
                var domainModel = await _dcRepository.GetByIdAsync(documentCategoryId);

                if (domainModel == null)
                {
                    _apiResponseDto.isSuccess = false;
                    _apiResponseDto.statusCode = System.Net.HttpStatusCode.NotFound;
                    _apiResponseDto.errorMessage = new List<string> { "Document category not found." };

                    return NotFound(_apiResponseDto);
                }

                var documentCategoryDto = _mapper.Map<DocumentCategoryDto>(domainModel);

                _apiResponseDto.data = documentCategoryDto;
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
       *   @Description     Updated a category by id
       *   @Route              PUT : api/v1/document-categories/{documentCategoryId}
       *   @Access            Private
       ***************************************************************************************************************/
        [HttpPut]
        [Route("{documentCategoryId:Guid}")]
        public async Task<ActionResult<APIResponseDto>> Update(
            [FromRoute] Guid documentCategoryId,
            [FromBody] UpdateDocumentCategoryRequestDto dto
        )
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var domainModel = _mapper.Map<DocumentCategory>(dto);
                domainModel = await _dcRepository.UpdateAsync(documentCategoryId, domainModel);

                if (domainModel == null)
                {
                    _apiResponseDto.isSuccess = false;
                    _apiResponseDto.statusCode = System.Net.HttpStatusCode.NotFound;
                    _apiResponseDto.errorMessage = new List<string> { "Document category not found, Please try again." };

                    return NotFound(_apiResponseDto);
                }

                var documentCategoryDto = _mapper.Map<DocumentCategoryDto>(domainModel);

                _apiResponseDto.data = documentCategoryDto; ;
                await transaction.CommitAsync();

                return Ok(_apiResponseDto);
            }
            catch (Exception ex)
            {
                _apiResponseDto.isSuccess = false;
                _apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
                _apiResponseDto.errorMessage = new List<string> { ex.Message };

                await transaction.RollbackAsync();

                return BadRequest(_apiResponseDto);
            }
        }

        /***************************************************************************************************************
        *   @Description     Remove a category by id
        *   @Route              DELETE : api/v1/document-categories/{documentCategoryId}
        *   @Access            Private
        ***************************************************************************************************************/
        [HttpDelete]
        [Route("{documentCategoryId:Guid}")]
        public async Task<ActionResult<APIResponseDto>> Delete([FromRoute] Guid documentCategoryId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var domainModel = await _dcRepository.DeleteAsync(documentCategoryId);

                if (domainModel == null)
                {
                    _apiResponseDto.isSuccess = false;
                    _apiResponseDto.statusCode = System.Net.HttpStatusCode.NotFound;
                    _apiResponseDto.errorMessage = new List<string> { $"Document category not found with id of {documentCategoryId}" };

                    return NotFound(_apiResponseDto);
                }

                var documentCategoryDto = _mapper.Map<DocumentCategoryDto>(domainModel);

                _apiResponseDto.data = documentCategoryDto;
                await transaction.CommitAsync();
                return Ok(_apiResponseDto);
            }
            catch (Exception ex)
            {
                _apiResponseDto.isSuccess = false;
                _apiResponseDto.statusCode = System.Net.HttpStatusCode.BadRequest;
                _apiResponseDto.errorMessage = new List<string> { ex.Message };

                await transaction.RollbackAsync();
                return BadRequest(_apiResponseDto);
            }
        }
    }
}