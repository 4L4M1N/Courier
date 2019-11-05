namespace CourierAPI.Models
{
    public class Merchant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string MerchantIdentity { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string BankAccountNo { get; set; }
        public string TradeLicenseNo { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}