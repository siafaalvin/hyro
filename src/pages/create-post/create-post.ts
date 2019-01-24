import { AuthProvider } from './../../providers/auth/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BlogPostModel } from '../wordpress-integration/blog-post.model';
import { environment } from '../../environment/environment';
import { Category } from './Category';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { WordpressService } from '../wordpress-integration/wordpress-integration.service';

import { FileTransfer } from '@ionic-native/file-transfer';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { BlogPostPage } from '../wordpress-integration/blog-post/blog-post';

/**
 * Generated class for the CreatePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {

  categories: Category[];
  category: Category;

  post: BlogPostModel = new BlogPostModel();
  token: string;
  myphoto: string;
  // limitTo: number;
  
  constructor(public navCtrl: NavController, 
    private transfer: FileTransfer,
    public wordpressService: WordpressService,
    public loading: LoadingController,
    public navParams: NavParams, public http: HttpClient, 
    public authProvider: AuthProvider, private camera: Camera) {
    
    this.wordpressService.getCategories()
          .subscribe(data => {
            this.categories = data;
          });

          this.post.limitTo = 0;
    // this.token = JSON.stringify(localStorage.getItem("_token"));
    this.token = localStorage.getItem("_token");
    // console.log(this.token, "token in create post");

    // this.headers = new HttpHeaders({
    //   'Content-Type' : 'application/json'
    // });

    // this.headers.append('Authorization', 'Bearer ' + this.token)
    // console.log(this.headers, "headers in create post");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePostPage');
  }

  selectImage(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then(imageData => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, error => {
      console.log(error);
    })
  }

  submitPost(post:any, categories:any):any {
    post.categories = [];
    post.content = post.content;
    post.status = "publish";
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' :  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDgyMjYzNDMsIm5iZiI6MTU0ODIyNjM0MywiZXhwIjoxNTQ4ODMxMTQzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.AJOQf-hJTCYFmaN6hdll996BxzNJ0Cxyeuw1sCRWJkM',
    });

    // console.log(categories, "categories")
    categories.forEach(function(category:any){
      // console.log(category.id);
      post.categories.push(category.id);
    });
    
    
    post.date = new Date(post.date);
    post.author = parseInt(localStorage.getItem("author_id"));
    var trnsf = this.transfer.create();
    trnsf.upload(this.myphoto, environment.wordpress_rest_api_url + 'media', {
      headers: {
        'Authorization' :  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDgyMjYzNDMsIm5iZiI6MTU0ODIyNjM0MywiZXhwIjoxNTQ4ODMxMTQzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.AJOQf-hJTCYFmaN6hdll996BxzNJ0Cxyeuw1sCRWJkM',
        'content-disposition' : "attachment; filename=\'lutfor.png\'"
      }
    }).then(res => {
      post.featured_media = res.response
      console.log(res, 'upload result');
    }, error => {
      console.log(error);
    });

    console.log(post, "before");

    return this.http.post(environment.wordpress_rest_api_url + "posts", post, { headers: headers})
     .toPromise()
     .then(response => {
       console.log(response, "after");
       this.navCtrl.push(BlogPostPage, {
        post: response
      });
     })
     .catch(error => {
       console.log(error);
     });

    // let headers = new HttpHeaders();

    // this.authProvider._addStandardHeaders(headers);
    // headers.set('Authorization', 'Bearer '+ localStorage.getItem("_token"));
    
    // //let options = new RequestOptions({ headers: headers });

    // console.log(headers);
    // this.http.post(environment.wordpress_rest_api_url + "posts", post, {headers: headers}).subscribe(data => {
    //   console.log(data, "after insert");
    // }, error => {
    //   console.log(error, "post error");
    // })
  }

  categoryChange(event: { component: SelectSearchableComponent, value: any }) {
      
  };

  WordCount(post:any) { 
    var number = post.title.split(" ").length;
    //post.title.str.split(" ").length;
    // post.limitTo = post.title.str.split(" ").length;
    if( number == 2 ){
      post.limitTo = 3;
      console.log(post.limitTo);
      return false;
    }
  }

}