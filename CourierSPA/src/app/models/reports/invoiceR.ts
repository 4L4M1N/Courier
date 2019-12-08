export class InvoiceR {
    companyName: string;
    companyAddress: string;
    merchantName: string;
    merchantAddress: string;
    merchantPhone: string;
    merchantEmail: string;
    receiverName: string;
    reciverAddress: string;
    receiverPhone: string;
    division: string;
    zone: string;
    total: number;
    discount: number;
}
export class ItemAttributes {
    itemAttributeId: number;
    itemSize: string;
    inCityRate: number;
    outCityRate: number;
    regularRate: number;
    conditionCharge: number;
    bookingCharge: number;
    discount: number;
}
