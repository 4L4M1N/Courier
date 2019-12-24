import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDeliveryMan } from '../models/IDeliveryMan';

@Injectable({
  providedIn: 'root'
})
export class DeliveryManService {
  baseURL = 'http://localhost:5000/api/deliveryman/';

constructor(private http: HttpClient) { }

Create(deliveryMan: IDeliveryMan) {
  return this.http.post(this.baseURL + 'create', deliveryMan);
}
GetAllDelivaryMan() {
  return this.http.get(this.baseURL + 'all');
}


}
