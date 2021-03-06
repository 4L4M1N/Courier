import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from '../models/division';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService {
  baseURL = 'http://localhost:5000/api/dropdown/';

  constructor(private http: HttpClient) { }

  GetDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(this.baseURL + 'divisions');
  }
  GetZonesOfADivison(divisionId): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.baseURL + 'divisions/' + divisionId);
  }
  GetDivisionOfAZone(divisionId): Observable<Division> {
    return this.http.get<Division>(this.baseURL + 'divisions/' + divisionId);
  }
  CreateDivision(DivisionName) {
    console.log(DivisionName);
    return this.http.post(this.baseURL + 'division/create', DivisionName);
  }

  CreateZone(sendZone: Zone) {
    console.log(sendZone);
    return this.http.post(this.baseURL + 'zone/create', sendZone);
  }


}
