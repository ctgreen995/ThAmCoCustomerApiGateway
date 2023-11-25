using AutoMapper;
using Database.Models;
using DTO;

namespace Profiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<CostDTO, CostData>().ReverseMap();

        }
    }
}