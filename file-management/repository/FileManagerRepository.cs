using file_management.Models.DTOs;
using file_management.repository.IRepository;
using Microsoft.AspNetCore.StaticFiles;

namespace file_management.repository
{
    public class FileManagerRepository : IFileManagerRepository
    {
        private readonly IWebHostEnvironment webHost;

        public FileManagerRepository(IWebHostEnvironment webHost)
        {
            this.webHost = webHost;
        }

        /**********************************************************************************************
        *   @Desc       Upload the file
        *   @Param      FileRequestDto
        *   @Return     Boolean
        */
        public async Task<bool> UploadFileAsync(FileRequestDto fileRequestDto)
        {
            if (!Directory.Exists(fileRequestDto.Path))
            {
                Directory.CreateDirectory(fileRequestDto.Path);
            }

            var fullPath = Path.Combine(fileRequestDto.Path, fileRequestDto.FileName);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await fileRequestDto.File.CopyToAsync(stream);
            await stream.FlushAsync();

            return true;
        }

        /**********************************************************************************************
        *   @Desc       Download a file
        *   @Param      string
        *   @Param      string
        *   @Return     (binary of file, content type of http header, file name) of tuple types
        */
        public async Task<(byte[], string, string)> DownloadFileAsync(string fileName, string uploadPath)
        {
            // var filePath = Path.Combine(Directory.GetCurrentDirectory(), uploadPath);
            var filePath = Path.Combine(this.webHost.WebRootPath, uploadPath);
            var provider = new FileExtensionContentTypeProvider();

            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            var bytes = await File.ReadAllBytesAsync(filePath);

            return (bytes, contentType, filePath);
        }

        /**********************************************************************************************
        *   @Desc       Remove a file
        *   @Param      string
        *   @Return     No
        */
        public void RemoveFile(string filePath)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }
}