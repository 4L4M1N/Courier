using System.ComponentModel.DataAnnotations.Schema;

namespace CourierAPI.Core.Models
{
    public class Branch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CourierId { get; set; }
        [ForeignKey("CourierId")]
        public CommonInfo CommonInfo { get; set;}
    }
}