import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualCardService {
  baseUrl = 'https://momocard.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  //get card details from the server
  getCardDetails(phone: string): Observable<any> {
    return this.http.get(this.baseUrl+'vcard/carddetails/'+phone);
  }

  //update card details from the server
  updateCardDetails(phone: string): Observable<any> {
    return this.http.put(this.baseUrl+'vcard/updatecardstatus/'+phone, {phone_number: phone});
  }

  //get prefund from card
  getPrefund(phone: string): Observable<any> {
    return this.http.get(this.baseUrl+'vcard/requestprefund/'+phone);
  }

  //top up card
  topUpCard(phone: string, amount: number): Observable<any> {
    return this.http.post(this.baseUrl+'vcard/topup/', {phone_number:phone,amount: amount});
  }


}
