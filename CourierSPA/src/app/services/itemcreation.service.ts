import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ItemAttribute } from '../models/ItemAttribute';
import { throwError, Observable } from 'rxjs';
import { Iitem } from '../models/Iitem';

@Injectable({
  providedIn: 'root'
})
export class ItemcreationService {
  baseURL = 'http://localhost:5000/api/dropdown/';

constructor(private http: HttpClient) { }

CreateItem(itemName) {
  return this.http.post(this.baseURL + 'item/create', itemName);
}

CreateItemAttribute(sendItemAttribute: ItemAttribute) {
  console.log(sendItemAttribute);
  return this.http.post(this.baseURL + 'itemattribute/create', sendItemAttribute);
}

UpdateItemAttribute(id: number, sendItemAttribute: ItemAttribute) {
  console.log(sendItemAttribute);
  return this.http.put(this.baseURL + 'itemattribute/update/' + id , sendItemAttribute);
}


GetAllItemAttribute(): Observable<ItemAttribute[]> {
  return this.http.get<ItemAttribute[]>(this.baseURL + 'itemattribute');
}
GetItems(): Observable<Iitem[]> {
  return this.http.get<Iitem[]>(this.baseURL + 'item');
}
GetItemAttributesOfAnItem(itemId): Observable<ItemAttribute[]>
{
  console.log(itemId);
  // let params = new HttpParams();
  // params = params.append('itemId', itemId.toString());
  return this.http.get<ItemAttribute[]>(this.baseURL + 'itemattribute/' + itemId);
}
GetItemAttributesOfAnItemMerchant(itemId, merchantIdentity): Observable<ItemAttribute[]>
{
  let query = encodeURIComponent('itemId') + '=' + encodeURIComponent(itemId)
  + '&' + encodeURIComponent('merchantIdentity') + '=' + encodeURIComponent(merchantIdentity);
  return this.http.get<ItemAttribute[]>(this.baseURL + 'itemattribute' + '?' + query);
}
GetItemAttributeDetails(itemAttributeId): Observable<ItemAttribute>
{
  return this.http.get<ItemAttribute>(this.baseURL + 'itemattributedetails/' + itemAttributeId);
}


private handleError(err: HttpErrorResponse) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}

}
