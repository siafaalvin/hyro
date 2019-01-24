import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class WordpressService {
  
  headers:any;
  constructor(
    public http: Http,
    public nativeStorage: NativeStorage
  ){
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDgyMjYzNDMsIm5iZiI6MTU0ODIyNjM0MywiZXhwIjoxNTQ4ODMxMTQzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.AJOQf-hJTCYFmaN6hdll996BxzNJ0Cxyeuw1sCRWJkM'
    });
  }

  getRecentPosts(categoryId:number, page:number = 1){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      environment.wordpress_rest_api_url
      + 'posts?_embed&orderby=modified&page=' + page
      + category_url, {headers: this.headers})
    .map(res => res);
  }

  updatePost(post: any): any {
    return this.http.put(
      environment.wordpress_rest_api_url
      + 'posts/' + post.id, post, {headers: this.headers});
  }

  getCustomPages(){
    return this.http.get(
      environment.wordpress_rest_api_url + 'pages', {headers: this.headers})
    .map(res => res.json());
  }

  getCustomPage(pageId){
    return this.http.get(
      environment.wordpress_rest_api_url + 'pages/' + pageId, {headers: this.headers})
    .map(res => res.json());
  }

  getCategories(){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDgyMjYzNDMsIm5iZiI6MTU0ODIyNjM0MywiZXhwIjoxNTQ4ODMxMTQzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.AJOQf-hJTCYFmaN6hdll996BxzNJ0Cxyeuw1sCRWJkM'
    });
    console.log(headers);
    return this.http.get(
      environment.wordpress_rest_api_url + 'categories', {headers: headers})
    .map(res => res.json());
  }

  getComments(postId:number, page:number = 1){
    return this.http.get(
      environment.wordpress_rest_api_url
      + "comments?post=" + postId
      + '&page=' + page, {headers: this.headers})
    .map(res => res);
  }

  getAuthor(author){
    return this.http.get(environment.wordpress_rest_api_url + "users/" + author, {headers: this.headers})
    .map(res => res.json());
  }

  getPostCategories(post){
    let observableBatch = [];

    post.categories.forEach(category => {
      observableBatch.push(this.getCategory(category));
    });

    return Observable.forkJoin(observableBatch);
  }

  getCategory(category){
    return this.http.get(environment.wordpress_rest_api_url + "categories/" + category, {headers: this.headers})
    .map(res => res.json());
  }

  createComment(postId, user, comment){

    var username = 'guestaccount1';
    var password = '8eCo6%cOn6y0jPgwVolSMdHc';
    this.doPostLogin(username, password).subscribe((data: any) => {
      console.log(JSON.parse(data._body).token, "wpis");
    let header: Headers = new Headers();
    header.append('Authorization', 'Bearer ' + JSON.parse(data._body).token);

    this.http.post(environment.wordpress_rest_api_url + "comments?token=" + JSON.parse(data._body).token, {
      author_name: user.displayname,
      author_email: user.email,
      post: postId,
      content: comment
    },{ headers: JSON.parse(data._body).headers })
    .subscribe(res => {
      res.json();
      console.log(res, "response");
    }, error => {
      console.log(error);
    });
    });
  }

  getUser(){
    return this.nativeStorage.getItem('ion2fullapp_wordpress_user');
  }

  setUser(user){
    return this.nativeStorage.setItem('ion2fullapp_wordpress_user', user);
  }

  logOut(){
    return this.nativeStorage.remove('ion2fullapp_wordpress_user');
  }

  doLogin(username, password){
    let header : Headers = new Headers();
    header.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post(environment.wordpress_url + '/wp-json/jwt-auth/v1/token?username='+ username + '&password=' + password, {}, { headers: header })
  }

  validateAuthToken(token){
    let header : Headers = new Headers();
    header.append('Authorization','Basic ' + token);
    return this.http.post(environment.wordpress_url + 'wp-json/jwt-auth/v1/token/validate?token=' + token,
      {}, {headers: header})
  }

  doPostLogin(username, password){
    let data = {
      username: username,
      password: password
    };

    console.log(data);
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return this.http.post(environment.jwt_url, data, { headers: headers});
  }
}
