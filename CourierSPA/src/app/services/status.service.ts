import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchants } from '../models/Merchants';
import { IStatus } from '../models/IStatus';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  baseURL = 'http://localhost:5000/api/dropdown/';
constructor(private http: HttpClient) { }
GetAllStaus() {
  return this.http.get(this.baseURL + 'allstatus');
}

}
