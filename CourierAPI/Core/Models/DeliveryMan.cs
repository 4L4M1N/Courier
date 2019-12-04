namespace CourierAPI.Core.Models
{
    public class DeliveryMan
    {
        public int Id { get; set; }
        public string DelivManIdentity  { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}