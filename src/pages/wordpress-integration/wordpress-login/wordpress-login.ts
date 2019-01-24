import { MenuController } from 'ionic-angular/';
import { Component } from '@angular/core';
import { BlogFeedPage } from '../blog-feed/blog-feed';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WordpressService } from '../wordpress-integration.service';
import { RegistrationPage } from '../../registration/registration';
import { AuthProvider } from '../../../providers/auth/auth';
import { List1Page } from '../../list-1/list-1';

@Component({
  selector: 'page-wordpress-login',
  templateUrl: 'wordpress-login.html'
})
export class WordpressLoginPage {
  login_form: FormGroup;
  error_message: string;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public wordpressService: WordpressService,
    public authProvider: AuthProvider
  ) {}

  ionViewWillLoad() {
    this.login_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  login(value){
    let loading = this.loadingCtrl.create();
    loading.present();
    
    this.authProvider.postLogin(value.username, value.password).subscribe((data : any) => {
      this.authProvider.getCurrentUser(data.token).subscribe((val: any) => {
        console.log(val.id);
        localStorage.setItem("author_id", val.id);
      }, (error:any) => {
        console.log(error);
      });
      localStorage.setItem("_token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("displayname", data.user_display_name);
      localStorage.setItem("email", data.user_email);
    });

    loading.dismiss();

    this.menu.close();
    this.navCtrl.setRoot(List1Page);
  }

  skipLogin(){
    this.navCtrl.push(BlogFeedPage);
  }

  register(){
    this.navCtrl.push(RegistrationPage);
  }

}
