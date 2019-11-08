using AutoMapper;
using CourierAPI.DTOs;
using CourierAPI.Models;

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