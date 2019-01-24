import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class WordpressService {
  headers: Headers;
  constructor(
    public http: Http,
    public nativeStorage: NativeStorage
  ){
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDc0ODEyODUsIm5iZiI6MTU0NzQ4MTI4NSwiZXhwIjoxNTQ4MDg2MDg1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.XozAbXubbYDEP5FDmzQGN03Hw-xMU5AGFU9P-yfvexc'
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
    return this.http.get(
      environment.wordpress_rest_api_url + 'categories', {headers: this.headers})
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
    let header: Headers = new Headers();
    header.append('Authorization', 'Bearer ' + user.token);

    console.log(header, "header");
    return this.http.post(environment.wordpress_rest_api_url + "comments?token=" + user.token, {
      author_name: user.displayname,
      author_email: user.email,
      post: postId,
      content: comment
    },{ headers: header })
    .map(res => {
      res.json()
      console.log(res.json());
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
    return this.http.post(environment.wordpress_url + 'wp-json/jwt-auth/v1/token?username='+ username + '&password=' + password, {}, { headers: header })
  }

  validateAuthToken(token){
    let header : Headers = new Headers();
    header.append('Authorization','Basic ' + token);
    return this.http.post(environment.wordpress_url + 'wp-json/jwt-auth/v1/token/validate?token=' + token,
      {}, {headers: header})
  }
}
