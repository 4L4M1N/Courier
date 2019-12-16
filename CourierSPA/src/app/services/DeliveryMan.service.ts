import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDeliveryMan } from '../models/IDeliveryMan';

@Injectable({
  providedIn: 'root'
})
export class DeliveryManService {
  baseURL = 'https://courierapidevelopment.azurewebsites.net/api/deliveryman/';

constructor(private http: HttpClient) { }

Create(deliveryMan: IDeliveryMan) {
  return this.http.post(this.baseURL + 'create', deliveryMan);
}
GetAllDelivaryMan() {
  return this.http.get(this.baseURL + 'all');
}


}
