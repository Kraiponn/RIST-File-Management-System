
using file_management.Models.DTOs;

namespace file_management.repository.IRepository
{
    public interface IFileManagerRepository
    {
        Task<bool> UploadFileAsync(FileRequestDto fileRequestDto);
        Task<(byte[], string, string)> DownloadFileAsync(string fileName, string uploadPath);
        void RemoveFile(string filePath);
    }
}