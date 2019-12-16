using System;

namespace CourierAPI.Core.DTOs
{
    public class MerchantDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string MerchantIdentity { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string BankAccountNo { get; set; }
        public string TradeLicenseNo { get; set; }

    }
}