import { Time } from '@angular/common';

export class BookingDetailsReport {
    BookingId: string;
    MerchantName: string;
    ReceiverName: string;
    BookingDate: string;
    DeliveredDate: string;
    Status: string;
    Zone: string;
    CourierBill: number;
    MerchantBill: number;
    ReceiverBill: number;
    //DeliveryMan: string;
}
