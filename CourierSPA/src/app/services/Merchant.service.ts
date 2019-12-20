import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchants } from '../models/Merchants';

@Injectable({
  providedIn: 'root'
})

export class MerchantService {
  baseURL = 'http://amin601-001-site1.gtempurl.com/api/merchant/';

constructor(private http: HttpClient) { }

Create(merchant: Merchants ) {
  return this.http.post(this.baseURL + 'create', merchant);
}

GetAllMerchants(): Observable<Merchants[]> {
  return this.http.get<Merchants[]>(this.baseURL + 'all');
}

GetMerchant(id): Observable<Merchants> {
  return this.http.get<Merchants>(this.baseURL + id);
}
}
