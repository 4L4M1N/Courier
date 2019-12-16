using AutoMapper;
using CourierAPI.Core.DTOs;
using CourierAPI.Core.Models;

namespace CourierAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Merchant, MerchantDTO>();
        }
    }
}