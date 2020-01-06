export interface Booking {
    merchantId: string;
    itemAttributeId: number;
    divisionId: number;
    zoneId: number;
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    totalAmount: number;
    discount: number;
    conditionCharge: number;
    itemPrice: number;
    isConditionCharge: boolean;
    isOutCity: boolean;
    isInCity: boolean;
    merchantIdentity: string;
    merchantBill: number;
    courierBill: number;
    receiverBill: number;
}
