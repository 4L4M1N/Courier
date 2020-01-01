namespace CourierAPI.Core.Models
{
    public class RequestBooking
    {
        public int Id { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string BookingItems { get; set; }
        public bool IsRead { get; set; }
        public bool IsAccepted { get; set; }
    }
}