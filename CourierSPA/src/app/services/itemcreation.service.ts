import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemCreation } from '../models/ItemCreation';

@Injectable({
  providedIn: 'root'
})
export class ItemcreationService {
  baseURL = 'http://localhost:5000/api/dropdown/';

constructor(private http: HttpClient) { }

CreateItem(itemcreation: ItemCreation ) {
  return this.http.post(this.baseURL + 'item/create', itemcreation);
}

CreateItemAttribute(itemcreation: ItemCreation) {
  return this.http.post(this.baseURL + 'itemattribute/create', itemcreation);
}

}
