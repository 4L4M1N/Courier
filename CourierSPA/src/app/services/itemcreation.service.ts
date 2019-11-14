import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemAttribute } from '../models/ItemAttribute';

@Injectable({
  providedIn: 'root'
})
export class ItemcreationService {
  baseURL = 'http://localhost:5000/api/dropdown/';

constructor(private http: HttpClient) { }

CreateItem(itemName) {
  return this.http.post(this.baseURL + 'item/create', itemName);
}

CreateItemAttribute(itemAttribute: ItemAttribute) {
  return this.http.post(this.baseURL + 'itemattribute/create', itemAttribute);
}

}
