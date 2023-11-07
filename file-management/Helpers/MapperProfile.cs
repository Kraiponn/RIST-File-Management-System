using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using file_management.Models.Domains;
using file_management.Models.DTOs;
using Microsoft.Data.SqlClient;

namespace file_management
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<DocumentCategory, DocumentCategoryDto>();
            CreateMap<DocumentCategoryDto, DocumentCategory>();
            CreateMap<CreateDocumentCategoryRequestDto, DocumentCategory>();
            CreateMap<UpdateDocumentCategoryRequestDto, DocumentCategory>();

            CreateMap<Document, DocumentDto>();
            CreateMap<DocumentDto, Document>();
            CreateMap<CreateDocumentRequestDto, Document>();

            // CreateMap<DocumentCategory, DocumentCategoryDto>()
            //     .ForMember(x => x.Documents, opt => opt.Ignore());
            // CreateMap<DocumentCategory, DocumentCategoryDto>().ReverseMap();
            // CreateMap<CreateDocumentCategoryRequestDto, DocumentCategory>().ReverseMap();
            // CreateMap<UpdateDocumentCategoryRequestDto, DocumentCategory>().ReverseMap();

            // CreateMap<Document, DocumentDto>().ReverseMap();
            // CreateMap<CreateDocumentRequestDto, Document>().ReverseMap();
        }
    }
}