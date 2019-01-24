import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { List1Model } from './list-1.model';
import { List1Service } from './list-1.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BlogFeedModel } from '../wordpress-integration/blog-post.model';
import { WordpressService } from '../wordpress-integration/wordpress-integration.service';

@Component({
  selector: 'list-1-page',
  templateUrl: 'list-1.html'
})
export class List1Page {
  list1: List1Model = new List1Model();
  loading: any;
  sort: number;
  items:any;
  loggedUser: boolean = false;
  categoryId: number;
  categoryTitle: string;
  current_posts_page = 1;
  morePagesAvailable:boolean = true;
  feed: BlogFeedModel = new BlogFeedModel();

  constructor(
    public nav: NavController,
    public list1Service: List1Service,
    public loadingCtrl: LoadingController,
    public socialSharing: SocialSharing,
    public wordpressService: WordpressService
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loadContents(this.sort);
  }

  loadContents(sort:number): any {
    // this.loading.present();
    this.list1Service
      .getData(sort)
      .subscribe((data:any) => {
        this.items = data.json();
        console.log(data.json());
        this.feed.posts_count = Number(data.headers.get('x-wp-total'));
        this.feed.posts_pages = Number(data.headers.get('x-wp-totalpages'));

        for(let post of data.json()){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.items.push(post);
        }
        // this.loading.dismiss();
      });
  }

  getPosts(event: any){
    const val = event.target.value;

    if (val && val.trim() != '') {
      return this.items = this.items.filter((post:any) => {
        return (post.title.rendered.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    //   return this.items.filter((post) => {
    //     return post.title.rendered.toLowerCase().includes(val.toLowerCase());
    // });
    }

    this.loadContents(this.sort);
  }

  sortPost(){
    this.loadContents(this.sort);
  }

  sharePost(post) {
    console.log(post);
    //this code is to use the social sharing plugin
    // message, subject, file, url
    this.socialSharing.share(post.title.rendered, post.title.rendered, "", post.link)
    .then(() => {
      console.log('Success!');
    })
    .catch(() => {
       console.log('Error');
    });
   }

   loadMorePosts(infiniteScroll) {
    debugger;
    this.morePagesAvailable = this.feed.posts_pages > this.current_posts_page;
    if(this.morePagesAvailable)
    {
      this.current_posts_page +=1;

      this.list1Service
      .getData(this.sort, this.current_posts_page)
      .subscribe((data:any) => {
        console.log(data, "with paginations");
        for(let post of data.json()){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.items.push(post);
        }
      }, err => {
        console.log(err);
      })
    }
  }

   


}
