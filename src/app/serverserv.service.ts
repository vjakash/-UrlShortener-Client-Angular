import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerservService {
  constructor(private http: HttpClient) {}
  login(data): Observable<any> {
    return this.http.post(`${environment.url}/login`, data);
  }
  register(data): Observable<any> {
    return this.http.post(`${environment.url}/register`, data);
  }
  findAccount(data): Observable<any> {
    return this.http.post(`${environment.url}/findbyemail`, data);
  }
  sendVerifictionMail(data): Observable<any> {
    return this.http.post(`${environment.url}/forgot`, data);
  }
  // updateResetValInService(data){
  //   localStorage.setItem('resetToken',data['token'])
  //   localStorage.setItem('resetEmail',data['email'])
  //   localStorage.setItem('expiry',data['expiry'])
  //   localStorage.setItem('timestamp',data['timestamp'])
  // }
  // getResetDataFromLocalStorage(){
  //   let data={
  //     resetToken:localStorage.getItem('resetToken'),
  //     resetEmail:localStorage.getItem('resetEmail'),
  //     expiry:localStorage.getItem('expiry'),
  //     timestamp:localStorage.getItem('timestamp')
  //   }
  //   return data;
  // }
  resetPassword(data): Observable<any> {
    return this.http.post(`${environment.url}/resetpassword`, data);
  }
  verifyLink(token, email): Observable<any> {
    console.log(token, email);
    return this.http.get(`${environment.url}/verify/${token}/${email}`);
  }
  verifyAccount(token, email): Observable<any> {
    // console.log(token,email);
    return this.http.get(`${environment.url}/accountverify/${token}/${email}`);
  }
  updateCurrentEmail(email) {
    localStorage.setItem('email', email);
  }
  removeCurrentEmail() {
    localStorage.removeItem('email');
  }
  updateToken(token) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserData(): Observable<any> {
    let token=this.getToken();
    return this.http.post(`${environment.url}/getuserdata`,{email:localStorage.getItem('email')},{
      headers:new HttpHeaders({
        'authorization':token
      })
    });
  }
  createShortUrl(data){
    console.log(data);
    let token=this.getToken();
    return this.http.post(`${environment.url}/shortenurl`,{email:localStorage.getItem('email'),url:data.url},{
      headers:new HttpHeaders({
        'authorization':token
      })
    });
  }
  createCustomUrl(oldUrl,newUrl){
    console.log(oldUrl,newUrl)
    let token=this.getToken();
    return this.http.post(`${environment.url}/createcustomurl`,{email:localStorage.getItem('email'),oldUrl,newUrl},{
      headers:new HttpHeaders({
        'authorization':token
      })
    });
  }
}
