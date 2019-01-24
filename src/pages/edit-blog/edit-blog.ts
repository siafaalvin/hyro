import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BlogPostModel } from '../wordpress-integration/blog-post.model';
import { WordpressService } from '../wordpress-integration/wordpress-integration.service';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { environment } from '../../environment/environment';
import { BlogPostPage } from '../wordpress-integration/blog-post/blog-post';

/**
 * Generated class for the EditBlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-blog',
  templateUrl: 'edit-blog.html',
})
export class EditBlogPage {

  post: BlogPostModel = new BlogPostModel();
  category: any;
  categories: any;
  myphoto: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private camera: Camera,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public wordpressService: WordpressService) {
      this.post = this.navParams.get('post');
      console.log(this.post);
      this.category = this.post.categories_list;

      this.wordpressService.getCategories()
          .subscribe(data => {
            this.categories = data;
          });
          
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditBlogPage');
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

  updatePost(post:any, categories:any){
    post.categories = [];
    post.title = post.title.rendered;
    post.content = post.content.rendered;

    categories.forEach(function(category:any){
      console.log(category.id);
      post.categories.push(category.id);
    });

    post.date = new Date(post.date);
    post.author = parseInt(localStorage.getItem("author_id"));

    // post.source_author = post.source_author;
    console.log(post, "before");

    if(this.myphoto){
      var trnsf = this.transfer.create();
      trnsf.upload(this.myphoto, environment.wordpress_rest_api_url + 'media', {
        headers: {
          'Authorization' :  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDY3NjQyMDMsIm5iZiI6MTU0Njc2NDIwMywiZXhwIjoxNTQ3MzY5MDAzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.HxMaPA3tibWCxveab4FbhDREAAHtfQOS3LIe891NSyc',
          'content-disposition' : "attachment; filename=\'lutfor.png\'"
        }
      }).then(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });
    }
    
    this.wordpressService.updatePost(post).subscribe((response:any) => {
      console.log(response.json());
      this.navCtrl.push(BlogPostPage, {
        post: response.json()
      });

    });
  }

  categoryChange(event: { component: SelectSearchableComponent, value: any }) {
      
  };

}
