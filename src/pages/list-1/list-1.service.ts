import { AuthProvider } from './../../providers/auth/auth';
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from "../../environment/environment";

@Injectable()
export class List1Service {
  constructor(public http: Http, public authProvider: AuthProvider) {}

  getData(sort:number, page:number = 1) {
    
    // var username = 'guestaccount1';
    // var password = '8eCo6%cOn6y0jPgwVolSMdHc';

    // this.authProvider.postLogin(username, password).subscribe((data:any) => {
    //   localStorage.setItem("_token", JSON.parse(data._body).token);
    //   console.log(JSON.parse(data._body).token, "_token");
      
    // });
    // let headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDY3NjQyMDMsIm5iZiI6MTU0Njc2NDIwMywiZXhwIjoxNTQ3MzY5MDAzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.HxMaPA3tibWCxveab4FbhDREAAHtfQOS3LIe891NSyc'
    // });
    // console.log(headers);
    let sortUrl = sort == 0 ? '&orderby=date&order=desc' : '&orderby=date&order=asc';
    // return this.http.get(environment.wordpress_rest_api_url + "posts?_embed", {headers: headers});

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDgyMjYzNDMsIm5iZiI6MTU0ODIyNjM0MywiZXhwIjoxNTQ4ODMxMTQzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.AJOQf-hJTCYFmaN6hdll996BxzNJ0Cxyeuw1sCRWJkM'
    });
    console.log(headers);
    return this.http.get(
      environment.wordpress_rest_api_url + 'posts?_embed'+ sortUrl+ '&page=' + page, {headers: headers})
    .map(res => res);
  }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }

}