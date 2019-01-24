import { Component } from '@angular/core';
import { BlogPostPage } from '../blog-post/blog-post';
import { WordpressLoginPage } from '../wordpress-login/wordpress-login';
import 'rxjs/add/operator/map';
import { NavController, LoadingController, NavParams, MenuController } from 'ionic-angular';
import { WordpressService } from '../wordpress-integration.service';
import { BlogFeedModel } from '../blog-post.model';
import { CreatePostPage } from '../../create-post/create-post';

@Component({
  selector: 'page-blog-feed',
  templateUrl: 'blog-feed.html'
})
export class BlogFeedPage {

	feed: BlogFeedModel = new BlogFeedModel();
  loggedUser: boolean = false;
  categoryId: number;
  categoryTitle: string;
  current_posts_page = 1;
  morePagesAvailable:boolean = true;
  loading:any;

  constructor(
    public nav: NavController,
    public menu: MenuController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public wordpressService: WordpressService
  ) {
    
  }

  itemTapped(event, item) {
    this.nav.push(item.component);
  }

  ionViewWillEnter() {
    
    if(localStorage.getItem("_token")){
      this.loggedUser = true;
      console.log("token from blog feed");
    }


    //if we are browsing a category
    this.categoryId = this.navParams.get('id');
    this.categoryTitle = this.navParams.get('title');

    if(!(this.feed.posts.length > 0)){
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.loadContents(this.categoryId);
    }
  }

  loadContents(categoryId: any): any {
    this.wordpressService.getRecentPosts(categoryId)
      .subscribe(data => {
        console.log(data);
        this.feed.posts_count = Number(data.headers.get('x-wp-total'));
        this.feed.posts_pages = Number(data.headers.get('x-wp-totalpages'));

        for(let post of data.json()){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.feed.posts.push(post);
        }

        this.loading.dismiss();
      });
  }

  getPosts(event: any){
    const val = event.target.value;

    if (val && val.trim() != '') {
      return this.feed.posts = this.feed.posts.filter((post) => {
        return (post.title.rendered.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    this.loadContents(this.categoryId);
  }

  readMore(post) {
		this.nav.push(BlogPostPage, {
		  post: post
		});
  }

  loadMorePosts(infiniteScroll) {
    this.morePagesAvailable = this.feed.posts_pages > this.current_posts_page;
    if(this.morePagesAvailable)
    {
      this.current_posts_page +=1;

      this.wordpressService.getRecentPosts(this.categoryId, this.current_posts_page)
      .subscribe(data => {
        for(let post of data.json()){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.feed.posts.push(post);
        }
      }, err => {
        console.log(err);
      })
    }
  }


  logOut(){
    this.wordpressService.logOut()
    .then(
      res => this.nav.push(WordpressLoginPage),
      err => console.log('Error in log out')
    )
  }

  goToLogin(){
    this.nav.push(WordpressLoginPage);
  }

  createPost(){
    this.nav.push(CreatePostPage);
  }
}
