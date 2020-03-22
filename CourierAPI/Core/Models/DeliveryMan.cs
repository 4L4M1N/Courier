using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace CourierAPI.Core.Models
{
    public class DeliveryMan
    {
        public int Id { get; set; }
        public string DelivManIdentity  { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string NID { get; set; }

        public string Address { get; set; }
        public string ECPhone { get; set; }
        public string ECName{ get; set; }
        public string ECAddress{ get; set; }
        public int ZoneId { get; set; }
        [ForeignKey("ZoneId")]
        public Zone Zone { get; set; }
       
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }
   
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; }
    }
}