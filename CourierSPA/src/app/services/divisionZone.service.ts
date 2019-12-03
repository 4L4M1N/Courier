import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from '../models/division';

@Injectable({
  providedIn: 'root'
})
export class DivisionZoneService {
  
  baseURL = 'http://localhost:5000/api/dropdown/';

constructor(private http: HttpClient) { }

GetDivisions(): Observable<Division[]> {
  return this.http.get<Division[]>(this.baseURL + 'divisions');
}

}
