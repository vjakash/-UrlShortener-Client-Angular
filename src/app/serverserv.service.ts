import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServerservService {
  urls = [];
  selectedUrl;
  constructor(private http: HttpClient,private router: Router) {
    this.getUrlsByEmail();
  }
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
  updateSelectedUrl(index) {
    this.selectedUrl = this.urls[index].short_url;
  }

  getUserData(): Observable<any> {
    let token = this.getToken();
    return this.http.post(
      `${environment.url}/getuserdata`,
      { email: localStorage.getItem('email') },
      {
        headers: new HttpHeaders({
          authorization: token,
        }),
      }
    );
  }
  getUrlsByEmail() {
    let token = this.getToken();
    this.http
      .post(
        `${environment.url}/geturlsbyemail`,
        { email: localStorage.getItem('email') },
        {
          headers: new HttpHeaders({
            authorization: token,
          }),
        }
      )
      .subscribe((data) => {
        // console.log(data);
        this.urls = <any>data;
      },(err)=>{
        alert(err.error.message);
        this.removeCurrentEmail();
        this.deleteToken();
        this.router.navigate(["/"]);
      });
  }
  createShortUrl(data) {
    // console.log(data);
    let token = this.getToken();
    return this.http.post(
      `${environment.url}/shortenurl`,
      { email: localStorage.getItem('email'), url: data.url },
      {
        headers: new HttpHeaders({
          authorization: token,
        }),
      }
    );
  }
  createCustomUrl(oldUrl, newUrl) {
    console.log(oldUrl, newUrl);
    let token = this.getToken();
    return this.http.post(
      `${environment.url}/createcustomurl`,
      { email: localStorage.getItem('email'), oldUrl, newUrl },
      {
        headers: new HttpHeaders({
          authorization: token,
        }),
      }
    );
  }
}
