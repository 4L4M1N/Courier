namespace CourierAPI.Core.Filters
{
    public class ItemAttributesFilter
    {
        #nullable enable
        public int? ItemId { get; set; }
        public string? MerchantIdentity { get; set; }
        public bool WithItem { get; set; }
    }
}