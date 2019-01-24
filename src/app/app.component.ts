import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ToastController } from 'ionic-angular/';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { FormsPage } from '../pages/forms/forms';
import { LayoutsPage } from '../pages/layouts/layouts';
import { SettingsPage } from '../pages/settings/settings';
import { FunctionalitiesPage } from '../pages/functionalities/functionalities';
import { FirebaseLoginPage } from '../pages/firebase-integration/firebase-login/firebase-login';
import { WordpressMenuPage } from '../pages/wordpress-integration/wordpress-menu/wordpress-menu';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { WordpressLoginPage } from '../pages/wordpress-integration/wordpress-login/wordpress-login';
import { BlogFeedPage } from '../pages/wordpress-integration/blog-feed/blog-feed';
import { WordpressService } from '../pages/wordpress-integration/wordpress-integration.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  // rootPage: any = WalkthroughPage;
  rootPage: any = TabsNavigationPage;
  textDir: string = "ltr";

  loggedUser: boolean = false;
  categories: any;

  pages: Array<{title: any, icon: string, component: any}>;
  pushPages: Array<{title: any, icon: string, component: any}>;
  displayName: string;

  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public translate: TranslateService,
    public wordpressService: WordpressService,
    public toastCtrl: ToastController
  ) {
    if(localStorage.getItem("author_id")){
      this.loggedUser = true;
      this.displayName = localStorage.getItem("displayname");
      console.log(localStorage.getItem("displayname"), 'display name');
    }

    console.log(localStorage.getItem("author_id"));
    translate.setDefaultLang('en');
    translate.use('en');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        if(event.lang == 'ar')
        {
          platform.setDir('rtl', true);
        }
        else
        {
          platform.setDir('ltr', true);
        }
        Observable.forkJoin(
          this.translate.get('HOME'),
          this.translate.get('NEWS'),
          this.translate.get('POLITICS'),
          this.translate.get('ECONOMY'),
          this.translate.get('HEALTH'),
          this.translate.get('SPORTS'),
          this.translate.get('TECH')
        ).subscribe(data => {
          this.pages = [
            { title: data[0], icon: 'home', component: TabsNavigationPage },
            { title: data[1], icon: 'create', component: FormsPage },
            { title: data[2], icon: 'code', component: FunctionalitiesPage }
          ];

          this.wordpressService.getCategories()
          .subscribe(data => {
            this.categories = data;
          });

          this.pushPages = [
            { title: data[3], icon: 'grid', component: LayoutsPage },
            { title: data[4], icon: 'settings', component: SettingsPage },
            { title: data[5], icon: 'logo-wordpress', component: WordpressMenuPage },
            { title: data[6], icon: 'flame', component: FirebaseLoginPage }
          ];
        });
      });

  }


  openPage() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(TabsNavigationPage);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }

  gotoCategoryPage(category: { id: any; name: any; }) {
    this.menu.close();
    this.nav.setRoot(BlogFeedPage, {
      id: category.id,
      title: category.name
    });
  }

  ionViewWillEnter(){
    
  }

  logOut(){
    this.menu.close();
    localStorage.removeItem('_token');
    localStorage.removeItem("author_id")
    localStorage.removeItem('username');
    localStorage.removeItem('displayname');
    localStorage.removeItem('email');
    this.nav.push(WordpressLoginPage);
  }

  goToLogin(){
    console.log("login from app component");
    this.menu.close();
    this.nav.push(WordpressLoginPage);
  }
}
