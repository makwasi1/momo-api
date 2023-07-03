import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as auth from 'firebase/auth';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://momocard.herokuapp.com/api/';
  token: any;

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login', {"phone_number":model});
  }

  getTokenId(){
    getAuth().currentUser?.getIdToken().then((idToken) => {
      console.log(idToken);
      this.token = idToken;
    });

  }

  //get user details
  getUserDetails(phone: string): Observable<any> {
    return this.http.get(this.baseUrl+'user/'+phone);
  }
  
  //delete user
  deleteUser(phone: string): Observable<any> {
    return this.http.delete(this.baseUrl+'user/'+phone);
  }
}
