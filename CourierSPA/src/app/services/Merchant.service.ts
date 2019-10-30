import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchants } from '../models/Merchants';

@Injectable({
  providedIn: 'root'
})

export class MerchantService {
  baseURL = 'http://localhost:5000/api/Merchant/';

constructor(private http: HttpClient) { }

Create(merchant: Merchants ) {
  return this.http.post(this.baseURL + 'create', merchant);
}

GetAllMerchants(): Observable<Merchants[]> {
  return this.http.get<Merchants[]>(this.baseURL + 'GetAllMerchants');
}

GetMerchant(id): Observable<Merchants> {
  return this.http.get<Merchants>(this.baseURL + 'GetMerchant/' + id);
}
}