import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  getCurrentUser(token: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+ token
    });

    return this.http.get(environment.current_user_url, {headers: headers});
  }

  doRegister(user:any){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization','Bearer '+ JSON.stringify(localStorage.getItem("_token")));
    return this.http.post(environment.wordpress_rest_api_url, user, { headers: headers});
  }

  register(user_data){

    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' :  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDgyMjYzNDMsIm5iZiI6MTU0ODIyNjM0MywiZXhwIjoxNTQ4ODMxMTQzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.AJOQf-hJTCYFmaN6hdll996BxzNJ0Cxyeuw1sCRWJkM',
    });

    return this.http.post(environment.wordpress_rest_api_url + 'users', user_data, {headers: headers});
  }

  postLogin(username, password){
    let data = {
      username: username,
      password: password
    };

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(environment.jwt_url, data, { headers: headers});
  }

  public _addStandardHeaders(header : HttpHeaders)
  {
    header = header.append('Content-Type','application/json');
    header = header.append('Accept','application/json');
    header = header.append('Authorization','Bearer '+ localStorage.getItem("_token"));
    
    return header;
  }
}