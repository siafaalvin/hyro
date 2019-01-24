webpackJsonp([1],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogPostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blog_feed_blog_feed__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog_post_model__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_integration_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_forkJoin__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_forkJoin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__edit_blog_edit_blog__ = __webpack_require__(256);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var BlogPostPage = (function () {
    function BlogPostPage(navParams, navCtrl, loadingCtrl, alertCtrl, wordpressService) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.wordpressService = wordpressService;
        this.post = new __WEBPACK_IMPORTED_MODULE_3__blog_post_model__["b" /* BlogPostModel */]();
        this.current_comments_page = 1;
        this.loggedUser = false;
        this.content_ready = false;
        this.morePagesAvailable = true;
    }
    BlogPostPage.prototype.ngOnInit = function () {
        var _this = this;
        this.post = this.navParams.get('post');
        this.wordpressService.getUser()
            .then(function (data) { return _this.loggedUser = true; }, function (error) { return _this.loggedUser = false; });
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin(this.getAuthorData(), this.getCategories(), this.getComments())
            .subscribe(function (data) {
            _this.post.author_details = data[0];
            _this.post.categories_list = data[1];
            _this.post.comments = data[2].json();
            _this.post.comments_count = Number(data[2].headers.get('x-wp-total'));
            _this.post.comments_pages = Number(data[2].headers.get('x-wp-totalpages'));
            _this.content_ready = true;
        });
    };
    BlogPostPage.prototype.getAuthorData = function () {
        return this.wordpressService.getAuthor(this.post.author);
    };
    BlogPostPage.prototype.getCategories = function () {
        return this.wordpressService.getPostCategories(this.post);
    };
    BlogPostPage.prototype.getComments = function () {
        return this.wordpressService.getComments(this.post.id);
    };
    BlogPostPage.prototype.loadMoreComments = function (infiniteScroll) {
        var _this = this;
        this.morePagesAvailable = this.post.comments_pages > this.current_comments_page;
        if (this.morePagesAvailable) {
            this.current_comments_page += 1;
            this.wordpressService.getComments(this.post.id, this.current_comments_page)
                .subscribe(function (data) {
                for (var _i = 0, _a = data.json(); _i < _a.length; _i++) {
                    var item = _a[_i];
                    _this.post.comments.push(item);
                }
                infiniteScroll.complete();
            }, function (err) {
                console.log(err);
            });
        }
    };
    BlogPostPage.prototype.goToCategoryPosts = function (categoryId, categoryTitle) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__blog_feed_blog_feed__["a" /* BlogFeedPage */], {
            id: categoryId,
            title: categoryTitle
        });
    };
    BlogPostPage.prototype.createComment = function () {
        var _this = this;
        var user;
        this.wordpressService.getUser()
            .then(function (res) {
            user = res;
            var alert = _this.alertCtrl.create({
                title: 'Add a comment',
                inputs: [
                    {
                        name: 'comment',
                        placeholder: 'Comment'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Accept',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create();
                            loading.present();
                        }
                    }
                ]
            });
            alert.present();
        }, function (err) {
            //ask the user to login
            var alert = _this.alertCtrl.create({
                title: 'Please login',
                message: 'You need to login in order to comment',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Login',
                        handler: function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login__["a" /* WordpressLoginPage */]);
                        }
                    }
                ],
                cssClass: 'comment-alert'
            });
            alert.present();
        });
    };
    BlogPostPage.prototype.logOut = function () {
        var _this = this;
        this.wordpressService.logOut()
            .then(function (res) { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login__["a" /* WordpressLoginPage */]); }, function (err) { return console.log('Error in log out'); });
    };
    BlogPostPage.prototype.goToLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__wordpress_login_wordpress_login__["a" /* WordpressLoginPage */]);
    };
    BlogPostPage.prototype.editPost = function (post) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__edit_blog_edit_blog__["a" /* EditBlogPage */], {
            post: post
        });
    };
    BlogPostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-blog-post',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-post\blog-post.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title *ngIf="post">\n\n    </ion-title>\n\n    <ion-buttons *ngIf="loggedUser" end>\n\n      <button ion-button icon-only (click)="createPost()">\n\n        <ion-icon class="toolbar-icon" name="md-add-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <!-- <ion-buttons *ngIf="!loggedUser" end>\n\n      <button ion-button icon-only (click)="goToLogin()">\n\n        <ion-icon class="toolbar-icon" name="log-in"></ion-icon>\n\n      </button>\n\n    </ion-buttons> -->\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <ion-item class="top-banner">\n\n        Lorem ipsum dolor sit amet\n\n    </ion-item>\n\n    \n\n  <div *ngIf="post" class="blog-post">\n\n    <div class="post-title" [innerHTML]="post.title.rendered"></div>\n\n    <p class="post-content" [innerHTML]="post.content.rendered"></p>\n\n    <ion-row>\n\n      <ion-col class="post-date">\n\n        <ion-icon name=\'md-calendar\'></ion-icon>\n\n        {{post.date.split(\'T\')[0]}}\n\n      </ion-col>\n\n      <ion-col *ngIf="post.author_details" class="post-author" text-right>\n\n        <ion-icon name="person"></ion-icon>\n\n        {{post.author_details.name}}\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <ion-item-group class="categories-content">\n\n    <ion-item-divider class="list-divider">Categories</ion-item-divider>\n\n    <ion-grid>\n\n      <ion-spinner *ngIf="!content_ready" name="bubbles"></ion-spinner>\n\n      <ion-row *ngIf="content_ready">\n\n        <ion-col class="post-category-col" *ngFor="let category of post.categories_list">\n\n          <ion-badge class="post-category-badge" (click)="goToCategoryPosts(category.id, category.name)">{{category.name}}</ion-badge>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-item-group>\n\n\n\n\n\n  <!-- <ion-item-group class="comments-content">\n\n    <ion-item-divider class="list-divider">Comments</ion-item-divider>\n\n    <ion-grid>\n\n      <ion-spinner *ngIf="!content_ready" name="bubbles"></ion-spinner>\n\n    </ion-grid>\n\n    <div *ngIf="content_ready">\n\n      <ion-item class="comment-item" *ngFor="let comment of post.comments">\n\n        <ion-avatar item-left>\n\n          <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="comment.author_avatar_urls[24]"></preload-image>\n\n        </ion-avatar>\n\n        <h2 class="item-title">{{comment.author_name}}</h2>\n\n        <p class="item-description" [innerHTML]="comment.content.rendered"></p>\n\n        <ion-note class="item-time" item-right>{{comment.date.split(\'T\')[0]}}</ion-note>\n\n      </ion-item>\n\n    </div>\n\n  </ion-item-group> -->\n\n\n\n\n\n\n\n  <!-- <ion-infinite-scroll [enabled]="morePagesAvailable" (ionInfinite)="loadMoreComments($event)">\n\n    <ion-infinite-scroll-content\n\n    loadingSpinner="bubbles"\n\n    loadingText="Loading more comments...">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll> -->\n\n\n\n\n\n</ion-content>\n\n\n\n\n\n<ion-footer class="blog-post-footer">\n\n <ion-toolbar>\n\n  <button class="create-comment" ion-button block (click)="editPost(post)"> Edit Post</button>\n\n </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-post\blog-post.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_5__wordpress_integration_service__["a" /* WordpressService */]])
    ], BlogPostPage);
    return BlogPostPage;
}());

//# sourceMappingURL=blog-post.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notifications_model__ = __webpack_require__(795);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notifications_service__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationsPage = (function () {
    function NotificationsPage(nav, notificationsService) {
        this.nav = nav;
        this.notificationsService = notificationsService;
        this.notifications = new __WEBPACK_IMPORTED_MODULE_3__notifications_model__["a" /* NotificationsModel */]();
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.notificationsService
            .getData()
            .then(function (data) {
            _this.notifications.today = data.today;
            _this.notifications.yesterday = data.yesterday;
        });
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'notifications-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\notifications\notifications.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'NOTIFICATIONS\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="notifications-content">\n  <ion-item-group>\n    <ion-item-divider class="notifications-divider">{{ \'TODAY\' | translate }}</ion-item-divider>\n    <ion-item class="notification-item" *ngFor="let notification of notifications.today">\n      <ion-avatar item-left>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="notification.image"></preload-image>\n      </ion-avatar>\n      <h2 class="item-title">{{notification.name}}</h2>\n      <p class="item-description">{{notification.message}}</p>\n      <ion-note class="item-time" item-right>{{notification.date}}</ion-note>\n    </ion-item>\n    <ion-item-divider class="notifications-divider">Yesterday</ion-item-divider>\n    <ion-item class="notification-item" *ngFor="let notification of notifications.yesterday">\n      <ion-avatar item-left>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="notification.image"></preload-image>\n      </ion-avatar>\n      <h2 class="item-title">{{notification.name}}</h2>\n      <p class="item-description">{{notification.message}}</p>\n      <ion-note class="item-time" item-right>{{notification.date}}</ion-note>\n    </ion-item>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\notifications\notifications.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__notifications_service__["a" /* NotificationsService */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookLoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { environment } from '../../environment/environment';
var FacebookLoginService = (function () {
    function FacebookLoginService(http, nativeStorage, fb, platform) {
        this.http = http;
        this.nativeStorage = nativeStorage;
        this.fb = fb;
        this.platform = platform;
        // this.fb.browserInit(environment.facebook_app_id, "v2.8");
    }
    FacebookLoginService.prototype.doFacebookLoginFirebase = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //["public_profile"] is the array of permissions, you can add more if you need
            _this.fb.login(["public_profile"]).then(function (response) {
                //Getting name and gender properties
                _this.fb.api("/me?fields=name,gender", [])
                    .then(function (user) {
                    _this.setFacebookUserFirebase(user)
                        .then(function (res) {
                        resolve(res);
                    });
                });
            }, function (err) {
                reject(err);
            });
        });
    };
    FacebookLoginService.prototype.setFacebookUserFirebase = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getFriendsFakeData()
                .then(function (data) {
                resolve({
                    userId: user.id,
                    name: user.name,
                    gender: user.gender,
                    image: "https://graph.facebook.com/" + user.id + "/picture?type=large",
                    friends: data.friends,
                    photos: data.photos
                });
            });
        });
    };
    FacebookLoginService.prototype.doFacebookLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //["public_profile"] is the array of permissions, you can add more if you need
            _this.fb.login(["public_profile"]).then(function (response) {
                //Getting name and gender properties
                _this.fb.api("/me?fields=name,gender", [])
                    .then(function (user) {
                    //now we have the users info, let's save it in the NativeStorage
                    _this.setFacebookUser(user)
                        .then(function (res) {
                        resolve(res);
                    });
                });
            }, function (err) {
                reject(err);
            });
        });
    };
    FacebookLoginService.prototype.doFacebookLogout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fb.logout()
                .then(function (res) {
                //user logged out so we will remove him from the NativeStorage
                _this.nativeStorage.remove('facebook_user');
                resolve();
            }, function (err) {
                reject();
            });
        });
    };
    FacebookLoginService.prototype.getFacebookUser = function () {
        return this.nativeStorage.getItem('facebook_user');
    };
    FacebookLoginService.prototype.setFacebookUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getFriendsFakeData()
                .then(function (data) {
                resolve(_this.nativeStorage.setItem('facebook_user', {
                    userId: user.id,
                    name: user.name,
                    gender: user.gender,
                    image: "https://graph.facebook.com/" + user.id + "/picture?type=large",
                    friends: data.friends,
                    photos: data.photos
                }));
            });
        });
    };
    FacebookLoginService.prototype.getFriendsFakeData = function () {
        return this.http.get('./assets/example_data/social_integrations.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FacebookLoginService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    FacebookLoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], FacebookLoginService);
    return FacebookLoginService;
}());

//# sourceMappingURL=facebook-login.service.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleLoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment_environment__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GoogleLoginService = (function () {
    function GoogleLoginService(http, nativeStorage, googlePlus) {
        this.http = http;
        this.nativeStorage = nativeStorage;
        this.googlePlus = googlePlus;
    }
    GoogleLoginService.prototype.trySilentLogin = function () {
        var _this = this;
        //checks if user is already signed in to the app and sign them in silently if they are.
        return new Promise(function (resolve, reject) {
            _this.googlePlus.trySilentLogin({
                'scopes': '',
                'webClientId': __WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].google_web_client_id,
                'offline': true
            })
                .then(function (user) {
                _this.setGoogleUser(user)
                    .then(function (res) {
                    resolve(res);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    GoogleLoginService.prototype.doGoogleLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.googlePlus.login({
                'scopes': '',
                'webClientId': __WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].google_web_client_id,
                'offline': true
            })
                .then(function (user) {
                _this.setGoogleUser(user)
                    .then(function (res) {
                    resolve(res);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    GoogleLoginService.prototype.doGoogleLogout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.googlePlus.logout()
                .then(function (response) {
                //user logged out so we will remove him from the NativeStorage
                _this.nativeStorage.remove('google_user');
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    GoogleLoginService.prototype.getGoogleUser = function () {
        return this.nativeStorage.getItem('google_user');
    };
    GoogleLoginService.prototype.setGoogleUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getFriendsFakeData()
                .then(function (data) {
                resolve(_this.nativeStorage.setItem('google_user', {
                    userId: user.userId,
                    name: user.displayName,
                    email: user.email,
                    image: user.imageUrl,
                    friends: data.friends,
                    photos: data.photos
                }));
            });
        });
    };
    GoogleLoginService.prototype.getFriendsFakeData = function () {
        return this.http.get('./assets/example_data/social_integrations.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GoogleLoginService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    GoogleLoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_plus__["a" /* GooglePlus */]])
    ], GoogleLoginService);
    return GoogleLoginService;
}());

//# sourceMappingURL=google-login.service.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterLoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_twitter_connect__ = __webpack_require__(210);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TwitterLoginService = (function () {
    function TwitterLoginService(http, nativeStorage, twitter) {
        this.http = http;
        this.nativeStorage = nativeStorage;
        this.twitter = twitter;
    }
    TwitterLoginService.prototype.doTwitterLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.twitter.login().then(function (resp) {
                //Getting user data
                _this.twitter.showUser().then(function (user) {
                    //now we have the users info, let's save it in the NativeStorage
                    _this.setTwitterUser(user).then(function (res) {
                        resolve(res);
                    });
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    TwitterLoginService.prototype.doTwitterLogout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.twitter.logout().then(function (res) {
                //user logged out so we will remove him from the NativeStorage
                _this.nativeStorage.remove('twitter_user');
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    };
    TwitterLoginService.prototype.getTwitterUser = function () {
        return this.nativeStorage.getItem('twitter_user');
    };
    TwitterLoginService.prototype.setTwitterUser = function (user) {
        var _this = this;
        console.log(user);
        return new Promise(function (resolve, reject) {
            resolve(_this.nativeStorage.setItem('twitter_user', {
                name: user.name,
                image: (user.profile_image_url).replace("_normal", ""),
                userId: user.id_str,
                following: user.friends_count,
                followers: user.followers_count,
                location: user.location,
                description: user.description,
                screenName: user.screen_name
            }));
        });
    };
    TwitterLoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_twitter_connect__["a" /* TwitterConnect */]])
    ], TwitterLoginService);
    return TwitterLoginService;
}());

//# sourceMappingURL=twitter-login.service.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseAuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_twitter_connect__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// import { environment } from '../../environment/environment';
var FirebaseAuthService = (function () {
    // FB_APP_ID: number = environment.facebook_app_id;
    function FirebaseAuthService(afAuth, googlePlus, fb, tw, platform, afs) {
        this.afAuth = afAuth;
        this.googlePlus = googlePlus;
        this.fb = fb;
        this.tw = tw;
        this.platform = platform;
        this.afs = afs;
        // this.fb.browserInit(this.FB_APP_ID, "v2.8");
    }
    FirebaseAuthService.prototype.doLogin = function (value) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithEmailAndPassword(value.email, value.password)
                .then(function (res) {
                resolve(res);
            }, function (err) { return reject(err); });
        });
    };
    FirebaseAuthService.prototype.doLogout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (__WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().currentUser) {
                _this.afAuth.auth.signOut();
                resolve();
            }
            else {
                reject();
            }
        });
    };
    FirebaseAuthService.prototype.getCurrentUser = function () {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().onAuthStateChanged(function (user) {
                var userModel = {
                    id: "",
                    name: "",
                    image: "",
                    provider: ""
                };
                if (user) {
                    if (!user.photoURL) {
                        userModel.id = user.uid;
                        userModel.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
                        userModel.name = user.displayName;
                        userModel.provider = user.providerData[0].providerId;
                        return resolve(userModel);
                    }
                    else {
                        userModel.id = user.uid;
                        userModel.image = user.photoURL;
                        userModel.name = user.displayName;
                        userModel.provider = user.providerData[0].providerId;
                        return resolve(userModel);
                    }
                }
                else {
                    reject('No user logged in');
                }
            });
        });
    };
    FirebaseAuthService.prototype.getUserImage = function (personId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afs.collection('/user').doc(personId).valueChanges()
                .subscribe(function (snapshots) {
                if (snapshots) {
                    resolve(snapshots);
                }
                else {
                    reject();
                }
            });
        });
    };
    FirebaseAuthService.prototype.updateFormValues = function (value) {
        return new Promise(function (resolve, reject) {
            var user = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().currentUser;
            user.updateProfile({
                displayName: value.name,
                photoURL: user.photoURL
            }).then(function (res) {
                resolve(res);
            }, function (err) { return reject(err); });
        });
    };
    FirebaseAuthService.prototype.updatePhotoUrl = function (value) {
        return new Promise(function (resolve, reject) {
            var user = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().currentUser;
            user.updateProfile({
                displayName: user.displayName,
                photoURL: value
            }).then(function (res) {
                resolve(res);
            }, function (err) { return reject(err); });
        });
    };
    FirebaseAuthService.prototype.doGoogleLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.googlePlus.login({
                    'scopes': '',
                    'webClientId': '303898922125-3brpjnae600h5pkoqsh4misvvmpokkm4.apps.googleusercontent.com',
                    'offline': true
                }).then(function (response) {
                    var googleCredential = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider.credential(response.idToken);
                    __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithCredential(googleCredential)
                        .then(function (user) {
                        resolve({});
                    });
                }, function (err) {
                    reject(err);
                });
            }
            else {
                _this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider())
                    .then(function (user) {
                    resolve({});
                });
            }
        });
    };
    FirebaseAuthService.prototype.doRegister = function (value) {
        return new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().createUserWithEmailAndPassword(value.email, value.password)
                .then(function (res) {
                resolve(res);
            }, function (err) { return reject(err); });
        });
    };
    FirebaseAuthService.prototype.doFacebookLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                //["public_profile"] is the array of permissions, you can add more if you need
                _this.fb.login(["public_profile"]).then(function (response) {
                    var facebookCredential = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].FacebookAuthProvider.credential(response.authResponse.accessToken);
                    __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithCredential(facebookCredential);
                    //Getting name and gender properties
                    _this.fb.api("/me?fields=name,gender", [])
                        .then(function (user) {
                        resolve({});
                    });
                }, function (err) {
                    reject(err);
                });
            }
            else {
                _this.afAuth.auth
                    .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].FacebookAuthProvider())
                    .then(function (user) {
                    resolve({});
                });
            }
        });
    };
    FirebaseAuthService.prototype.doTwitterLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.tw.login().then(function (response) {
                    var twitterCredential = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].TwitterAuthProvider.credential(response.token, response.secret);
                    __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"]().signInWithCredential(twitterCredential)
                        .then(function (user) {
                        resolve({});
                    }, function (error) {
                        reject(error);
                    });
                }, function (err) {
                    reject(err);
                });
            }
            else {
                _this.afAuth.auth
                    .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].TwitterAuthProvider())
                    .then(function (user) {
                    resolve({});
                });
            }
        });
    };
    FirebaseAuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_twitter_connect__["a" /* TwitterConnect */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_firestore__["AngularFirestore"]])
    ], FirebaseAuthService);
    return FirebaseAuthService;
}());

//# sourceMappingURL=firebase-auth.service.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UserModel; });
/* unused harmony export ProfilePostModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileModel; });
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());

var ProfilePostModel = (function () {
    function ProfilePostModel() {
        this.likes = 0;
        this.comments = 0;
        this.liked = false;
    }
    return ProfilePostModel;
}());

var ProfileModel = (function () {
    function ProfileModel() {
        this.user = new UserModel();
        this.following = [];
        this.followers = [];
        this.posts = [];
    }
    return ProfileModel;
}());

//# sourceMappingURL=profile.model.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__terms_of_service_terms_of_service__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__privacy_policy_privacy_policy__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__walkthrough_walkthrough__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_profile_model__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__profile_profile_service__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_language_language_service__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_rate__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_crop__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var SettingsPage = (function () {
    function SettingsPage(nav, modal, loadingCtrl, translate, languageService, profileService, appRate, imagePicker, cropService, platform) {
        this.nav = nav;
        this.modal = modal;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.languageService = languageService;
        this.profileService = profileService;
        this.appRate = appRate;
        this.imagePicker = imagePicker;
        this.cropService = cropService;
        this.platform = platform;
        // make WalkthroughPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__walkthrough_walkthrough__["a" /* WalkthroughPage */];
        this.profile = new __WEBPACK_IMPORTED_MODULE_7__profile_profile_model__["a" /* ProfileModel */]();
        this.loading = this.loadingCtrl.create();
        this.languages = this.languageService.getLanguages();
        this.settingsForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](),
            location: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](),
            description: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](),
            currency: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](),
            weather: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](),
            notifications: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](),
            language: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]()
        });
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loading.present();
        this.profileService.getData().then(function (data) {
            _this.profile.user = data.user;
            // setValue: With setValue, you assign every form control value at once by passing in a data object whose properties exactly match the form model behind the FormGroup.
            // patchValue: With patchValue, you can assign values to specific controls in a FormGroup by supplying an object of key/value pairs for just the controls of interest.
            // More info: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#populate-the-form-model-with-_setvalue_-and-_patchvalue_
            var currentLang = _this.translate.currentLang;
            _this.settingsForm.patchValue({
                name: data.user.name,
                location: data.user.location,
                description: data.user.about,
                currency: 'dollar',
                weather: 'fahrenheit',
                notifications: true,
                language: _this.languages.filter(function (x) { return x.code == currentLang; })
            });
            _this.loading.dismiss();
            _this.settingsForm.get('language').valueChanges.subscribe(function (lang) {
                _this.setLanguage(lang);
            });
        });
    };
    SettingsPage.prototype.logout = function () {
        // navigate to the new page if it is not the current page
        this.nav.setRoot(this.rootPage);
    };
    SettingsPage.prototype.showTermsModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_3__terms_of_service_terms_of_service__["a" /* TermsOfServicePage */]);
        modal.present();
    };
    SettingsPage.prototype.showPrivacyModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_4__privacy_policy_privacy_policy__["a" /* PrivacyPolicyPage */]);
        modal.present();
    };
    SettingsPage.prototype.setLanguage = function (lang) {
        var language_to_set = this.translate.getDefaultLang();
        if (lang) {
            language_to_set = lang.code;
        }
        this.translate.setDefaultLang(language_to_set);
        this.translate.use(language_to_set);
    };
    SettingsPage.prototype.rateApp = function () {
        if (this.platform.is('cordova')) {
            this.appRate.preferences.storeAppURL = {
                ios: '<my_app_id>',
                android: 'market://details?id=<package_name>',
                windows: 'ms-windows-store://review/?ProductId=<Store_ID>'
            };
            this.appRate.promptForRating(true);
        }
        else {
            console.log("You are not in a cordova environment. You should test this feature in a real device or an emulator");
        }
    };
    SettingsPage.prototype.openImagePicker = function () {
        var _this = this;
        this.imagePicker.hasReadPermission().then(function (result) {
            if (result == false) {
                // no callbacks required as this opens a popup which returns async
                _this.imagePicker.requestReadPermission();
            }
            else if (result == true) {
                _this.imagePicker.getPictures({ maximumImagesCount: 1 }).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        _this.cropService.crop(results[i], { quality: 75 }).then(function (newImage) {
                            var image = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["normalizeURL"])(newImage);
                            _this.profileService.setUserImage(image);
                            _this.profile.user.image = image;
                        }, function (error) { return console.error("Error cropping image", error); });
                    }
                }, function (err) { return console.log(err); });
            }
        }, function (err) {
            console.log(err);
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'settings-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\settings\settings.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'ECONOMY\' | translate }}</ion-title>\n    <ion-buttons end [hidden]="!settingsForm.dirty">\n      <button ion-button>\n        {{ \'SAVE\' | translate }}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="settings-content">\n  <div class="user-image-content">\n    <ion-row no-padding class="user-image-row">\n      <ion-col no-padding width-40>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="profile.user.image" alt="this is the image" title="IMAGE!"></preload-image>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding class="user-image-row">\n      <ion-col no-padding width-60>\n        <button class="image-action-button" ion-button outline block small (click)="openImagePicker()">{{ \'CHANGE_PROFILE_PICTURE\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <form [formGroup]="settingsForm" class="settings-form">\n    <ion-list class="user-data-content">\n      <ion-item>\n        <ion-label stacked>{{ \'NAME\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="name"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>{{ \'LOCATION\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="location"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>{{ \'DESCRIPTION\' | translate }}</ion-label>\n        <ion-textarea formControlName="description" rows="5" placeholder="Your description here..."></ion-textarea>\n      </ion-item>\n    </ion-list>\n\n    <ion-row class="user-preferences-row">\n      <span class="radio-tags-label">{{\'CURRENCY\' | translate}}</span>\n      <ion-list class="radio-tags" radio-group formControlName="currency">\n        <ion-item class="radio-tag">\n          <ion-label>&#36;</ion-label>\n          <ion-radio value="dollar"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag">\n          <ion-label>\n            <span>&euro;</span>\n          </ion-label>\n          <ion-radio value="euro"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag">\n          <ion-label>\n            <span>&pound;</span>\n          </ion-label>\n          <ion-radio value="pound"></ion-radio>\n        </ion-item>\n      </ion-list>\n    </ion-row>\n\n    <ion-row class="user-preferences-row">\n      <span class="radio-tags-label">{{\'WEATHER\' | translate}}</span>\n      <ion-list class="radio-tags" radio-group formControlName="weather">\n        <ion-item class="radio-tag">\n          <ion-label>&deg;C</ion-label>\n          <ion-radio value="celsius"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag">\n          <ion-label>\n            <span>&deg;F</span>\n          </ion-label>\n          <ion-radio value="fahrenheit"></ion-radio>\n        </ion-item>\n      </ion-list>\n    </ion-row>\n\n    <ion-list class="user-data-content">\n    <!-- <ion-list class="user-preferences-row"> -->\n      <ion-item>\n        <ion-label>{{ \'SELECT_LANGUAGE\' | translate }}</ion-label>\n        <ion-select formControlName="language" cancelText="{{ \'CANCEL\' | translate }}" okText="{{ \'OK\' | translate }}">\n          <ion-option *ngFor="let language of languages" [value]="language">{{ language.name }}</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n\n    <ion-list class="switchers-list">\n      <ion-item class="switcher-item">\n        <ion-label>{{\'NOTIFICATIONS\' | translate}}</ion-label>\n        <ion-toggle formControlName="notifications"></ion-toggle>\n      </ion-item>\n    </ion-list>\n  </form>\n\n  <button class="alt-button rate-app-button" ion-button full (click)="rateApp()">{{\'RATE_APP\' | translate}}</button>\n\n  <button class="alt-button" ion-button full (click)="showPrivacyModal()">{{\'PRIVACY_POLICY\' | translate}}</button>\n\n  <button class="alt-button" ion-button full (click)="showTermsModal()">{{\'TERMS_OF_USE\' | translate }}</button>\n\n  <button class="alt-button logout-button" ion-button full icon-start (click)="logout()">\n    <ion-icon name="log-out"></ion-icon>\n    {{\'LOG_OUT\' | translate }}\n  </button>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\settings\settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__providers_language_language_service__["a" /* LanguageService */],
            __WEBPACK_IMPORTED_MODULE_8__profile_profile_service__["a" /* ProfileService */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_rate__["a" /* AppRate */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsOfServicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TermsOfServicePage = (function () {
    function TermsOfServicePage(view) {
        this.view = view;
    }
    TermsOfServicePage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    TermsOfServicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'terms-of-service-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\terms-of-service\terms-of-service.html"*/'<ion-header class="terms-header legal-header">\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span showWhen="ios">{{\'CANCEL\' | translate }}</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Terms of Service\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="terms-content legal-content">\n  <p>{{\'LAST_MODIFIED\' | translate }}: Nov 14, 2016</p>\n  <h4 class="legal-title">{{\'WELCOME_TO\' | translate}} ion2FullApp!</h4>\n  <p>Thanks for using our products and services (“Services”). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n  <h4 class="legal-title">{{\'USING_OUR_SERVICES\' | translate}}</h4>\n  <p>You must follow any policies made available to you within the Services.</p>\n  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n  <h4 class="legal-title">{{\'ABOUT_THIS_TERMS\' | translate}}</h4>\n  <p>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. You should look at the terms regularly. We’ll post notice of modifications to these terms on this page. We’ll post notice of modified additional terms in the applicable Service. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions for a Service or changes made for legal reasons will be effective immediately. If you do not agree to the modified terms for a Service, you should discontinue your use of that Service.</p>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\terms-of-service\terms-of-service.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], TermsOfServicePage);
    return TermsOfServicePage;
}());

//# sourceMappingURL=terms-of-service.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPolicyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PrivacyPolicyPage = (function () {
    function PrivacyPolicyPage(view) {
        this.view = view;
    }
    PrivacyPolicyPage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    PrivacyPolicyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'privacy-policy-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\privacy-policy\privacy-policy.html"*/'<ion-header class="privacy-header legal-header">\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span showWhen="ios">{{\'CANCEL\' | translate}}</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      {{\'PRIVACY_POLICY\' | translate }}\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="privacy-content legal-content">\n  <p>{{\'LAST_MODIFIED\' | translate }}: Nov 14, 2016</p>\n  <h4 class="legal-title">{{\'WELCOME_TO\' | translate}} ion2FullApp!</h4>\n  <p>Thanks for using our products and services (“Services”). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n  <h4 class="legal-title">{{\'USING_OUR_SERVICES\' | translate}}</h4>\n  <p>You must follow any policies made available to you within the Services.</p>\n  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n  <h4 class="legal-title">{{\'ABOUT_THIS_TERMS\' | translate}}</h4>\n  <p>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. You should look at the terms regularly. We’ll post notice of modifications to these terms on this page. We’ll post notice of modified additional terms in the applicable Service. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions for a Service or changes made for legal reasons will be effective immediately. If you do not agree to the modified terms for a Service, you should discontinue your use of that Service.</p>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\privacy-policy\privacy-policy.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], PrivacyPolicyPage);
    return PrivacyPolicyPage;
}());

//# sourceMappingURL=privacy-policy.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileService = (function () {
    function ProfileService(http, nativeStorage) {
        this.http = http;
        this.nativeStorage = nativeStorage;
    }
    ProfileService.prototype.getData = function () {
        return this.http.get('./assets/example_data/profile.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProfileService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ProfileService.prototype.getUserImage = function () {
        return this.nativeStorage.getItem('profileImage');
    };
    ProfileService.prototype.setUserImage = function (newImage) {
        this.nativeStorage.setItem('profileImage', newImage);
    };
    ProfileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], ProfileService);
    return ProfileService;
}());

//# sourceMappingURL=profile.service.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__terms_of_service_terms_of_service__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__privacy_policy_privacy_policy__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_navigation_tabs_navigation__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__facebook_login_facebook_login_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__google_login_google_login_service__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__twitter_login_twitter_login_service__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SignupPage = (function () {
    function SignupPage(nav, modal, facebookLoginService, googleLoginService, twitterLoginService, loadingCtrl) {
        this.nav = nav;
        this.modal = modal;
        this.facebookLoginService = facebookLoginService;
        this.googleLoginService = googleLoginService;
        this.twitterLoginService = twitterLoginService;
        this.loadingCtrl = loadingCtrl;
        this.main_page = { component: __WEBPACK_IMPORTED_MODULE_5__tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] };
        this.signup = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('test', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            confirm_password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('test', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    }
    SignupPage.prototype.doSignup = function () {
        this.nav.setRoot(this.main_page.component);
    };
    SignupPage.prototype.doFacebookSignup = function () {
        this.loading = this.loadingCtrl.create();
        // Here we will check if the user is already logged in
        // because we don't want to ask users to log in each time they open the app
        var env = this;
        this.facebookLoginService.getFacebookUser()
            .then(function (data) {
            // user is previously logged with FB and we have his data we will let him access the app
            env.nav.setRoot(env.main_page.component);
        }, function (error) {
            //we don't have the user data so we will ask him to log in
            env.facebookLoginService.doFacebookLogin()
                .then(function (res) {
                env.loading.dismiss();
                env.nav.setRoot(env.main_page.component);
            }, function (err) {
                console.log("Facebook Login error", err);
                env.loading.dismiss();
            });
        });
    };
    SignupPage.prototype.doTwitterSignup = function () {
        this.loading = this.loadingCtrl.create();
        // Here we will check if the user is already logged in
        // because we don't want to ask users to log in each time they open the app
        var env = this;
        this.twitterLoginService.getTwitterUser()
            .then(function (data) {
            // user is previously logged with FB and we have his data we will let him access the app
            env.nav.setRoot(env.main_page.component);
        }, function (error) {
            //we don't have the user data so we will ask him to log in
            env.twitterLoginService.doTwitterLogin()
                .then(function (res) {
                env.loading.dismiss();
                env.nav.setRoot(env.main_page.component);
            }, function (err) {
                console.log("Facebook Login error", err);
                env.loading.dismiss();
            });
        });
    };
    SignupPage.prototype.doGoogleSignup = function () {
        this.loading = this.loadingCtrl.create();
        // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
        var env = this;
        this.googleLoginService.trySilentLogin()
            .then(function (data) {
            // user is previously logged with Google and we have his data we will let him access the app
            env.nav.setRoot(env.main_page.component);
        }, function (error) {
            //we don't have the user data so we will ask him to log in
            env.googleLoginService.doGoogleLogin()
                .then(function (res) {
                env.loading.dismiss();
                env.nav.setRoot(env.main_page.component);
            }, function (err) {
                console.log("Google Login error", err);
                env.loading.dismiss();
            });
        });
    };
    SignupPage.prototype.showTermsModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_3__terms_of_service_terms_of_service__["a" /* TermsOfServicePage */]);
        modal.present();
    };
    SignupPage.prototype.showPrivacyModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_4__privacy_policy_privacy_policy__["a" /* PrivacyPolicyPage */]);
        modal.present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'signup-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\signup\signup.html"*/'<ion-header class="signup-header auth-header">\n  <ion-navbar>\n    <ion-title>{{\'SIGN_UP\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="signup-content auth-content">\n  <h2 class="auth-title">{{\'CREATE_AN_ACCOUNT\' | translate}}</h2>\n  <form class="signup-form auth-form" [formGroup]="signup" (ngSubmit)="doSignup()">\n    <ion-item>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n    </ion-item>\n    <show-hide-container>\n      <ion-item>\n        <ion-input type="password" placeholder="Password" formControlName="password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <show-hide-container>\n      <ion-item>\n        <ion-input type="password" placeholder="Confirm password" formControlName="confirm_password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <button ion-button block class="auth-action-button signup-button" type="submit" [disabled]="!signup.valid">{{\'SIGN_UP\' | translate}}</button>\n  </form>\n  <p class="auth-divider">\n    Or\n  </p>\n  <button ion-button block class="facebook-auth-button" (click)="doFacebookSignup()">{{\'SIGN_UP_WITH_FACEBOOK\' | translate}}</button>\n  <button ion-button block class="google-auth-button" (click)="doGoogleSignup()">{{\'SIGN_UP_WITH_GOOGLE\' | translate}}</button>\n  <button ion-button block class="twitter-auth-button" (click)="doTwitterSignup()">{{\'SIGN_UP_WITH_TWITTER\' | translate}}</button>\n  <p class="legal-stuff">\n    {{\'AGREEMENT_TEXT\' | translate}} <a class="legal-action" (click)="showPrivacyModal()">{{\'PRIVACY_POLICY\' | translate}}</a> {{\'AND\' | translate}} <a class="legal-action" (click)="showTermsModal()">{{\'TERMS_OF_USE\' | translate}}</a>\n  </p>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\signup\signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_6__facebook_login_facebook_login_service__["a" /* FacebookLoginService */],
            __WEBPACK_IMPORTED_MODULE_7__google_login_google_login_service__["a" /* GoogleLoginService */],
            __WEBPACK_IMPORTED_MODULE_8__twitter_login_twitter_login_service__["a" /* TwitterLoginService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = counterRangeValidator;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CounterInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var noop = function () { };
function counterRangeValidator(maxValue, minValue) {
    return function (c) {
        var err = {
            rangeError: {
                given: c.value,
                max: maxValue || 10,
                min: minValue || 0
            }
        };
        return (c.value > +maxValue || c.value < +minValue) ? err : null;
    };
}
var CounterInput = (function () {
    function CounterInput() {
        this.propagateChange = noop;
        this.validateFn = noop;
        this._counterValue = 0;
    }
    CounterInput_1 = CounterInput;
    Object.defineProperty(CounterInput.prototype, "counterValue", {
        get: function () {
            return this._counterValue;
        },
        set: function (val) {
            this._counterValue = val;
            this.propagateChange(val);
        },
        enumerable: true,
        configurable: true
    });
    CounterInput.prototype.ngOnChanges = function (inputs) {
        if (inputs.counterRangeMax || inputs.counterRangeMin) {
            this.validateFn = counterRangeValidator(this.counterRangeMax, this.counterRangeMin);
        }
    };
    CounterInput.prototype.writeValue = function (value) {
        if (value) {
            this.counterValue = value;
        }
    };
    CounterInput.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CounterInput.prototype.registerOnTouched = function () { };
    CounterInput.prototype.increase = function () {
        this.counterValue++;
    };
    CounterInput.prototype.decrease = function () {
        this.counterValue--;
    };
    CounterInput.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('counterValue'),
        __metadata("design:type", Object)
    ], CounterInput.prototype, "_counterValue", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('max'),
        __metadata("design:type", Object)
    ], CounterInput.prototype, "counterRangeMax", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('min'),
        __metadata("design:type", Object)
    ], CounterInput.prototype, "counterRangeMin", void 0);
    CounterInput = CounterInput_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'counter-input',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\components\counter-input\counter-input.html"*/'<button ion-button icon-only class="counter-icon" (click)="decrease()">\n  <ion-icon name="remove"></ion-icon>\n</button>\n<span class="counter-inner">{{counterValue}}</span>\n<button ion-button icon-only class="counter-icon" (click)="increase()">\n  <ion-icon name="add"></ion-icon>\n</button>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\components\counter-input\counter-input.html"*/,
            host: {
                'class': 'counter-input'
            },
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return CounterInput_1; }), multi: true },
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALIDATORS"], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return CounterInput_1; }), multi: true }
            ]
        })
    ], CounterInput);
    return CounterInput;
    var CounterInput_1;
}());

//# sourceMappingURL=counter-input.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__schedule_model__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schedule_service__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SchedulePage = (function () {
    function SchedulePage(nav, scheduleService) {
        this.nav = nav;
        this.scheduleService = scheduleService;
        this.schedule = new __WEBPACK_IMPORTED_MODULE_3__schedule_model__["a" /* ScheduleModel */]();
        this.segment = "today";
    }
    SchedulePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.scheduleService
            .getData()
            .then(function (data) {
            _this.schedule.today = data.today;
            _this.schedule.upcoming = data.upcoming;
        });
    };
    SchedulePage.prototype.onSegmentChanged = function (segmentButton) {
        // console.log('Segment changed to', segmentButton.value);
    };
    SchedulePage.prototype.onSegmentSelected = function (segmentButton) {
        // console.log('Segment selected', segmentButton.value);
    };
    SchedulePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'schedule-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\schedule\schedule.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'SCHEDULE\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="schedule-content">\n  <ion-segment class="schedule-segment" [(ngModel)]="segment" (ionChange)="onSegmentChanged($event)">\n    <ion-segment-button value="today" (ionSelect)="onSegmentSelected($event)">\n      {{\'TODAY\' | translate}}\n    </ion-segment-button>\n    <ion-segment-button value="upcoming" (ionSelect)="onSegmentSelected($event)">\n      {{\'UPCOMING\' | translate}}\n    </ion-segment-button>\n  </ion-segment>\n\n  <div [ngSwitch]="segment">\n    <div *ngSwitchCase="\'today\'">\n      <ion-list class="schedule-list">\n        <ion-item class="schedule-item" *ngFor="let item of schedule.today">\n          <ion-row>\n            <ion-col width-20 class="schedule-date">\n              <h2 class="schedule-day">{{item.date.day}}</h2>\n              <h3 class="schedule-month">{{item.date.month_name}}</h3>\n              <h4 class="schedule-time">{{item.date.time}}</h4>\n            </ion-col>\n            <ion-col width-80 class="schedule-data">\n              <div class="data-item">\n                <div class="item-content">\n                  <h2 class="item-title one-line">{{item.subject}}</h2>\n                  <div class="item-description">\n                    <ion-icon class="description-icon" name="clock"></ion-icon>\n                    <p class="description-text">{{item.date.full}}</p>\n                  </div>\n                  <div class="item-description">\n                    <ion-icon class="description-icon" name="navigate"></ion-icon>\n                    <p class="description-text one-line">{{item.location}}</p>\n                  </div>\n                </div>\n                <ion-icon class="item-icon" name="arrow-forward"></ion-icon>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-item>\n      </ion-list>\n    </div>\n    <div *ngSwitchCase="\'upcoming\'">\n      <ion-list class="schedule-list">\n        <ion-item class="schedule-item" *ngFor="let item of schedule.upcoming">\n          <ion-row>\n            <ion-col width-20 class="schedule-date">\n              <h2 class="schedule-day">{{item.date.day}}</h2>\n              <h3 class="schedule-month">{{item.date.month_name}}</h3>\n              <h4 class="schedule-time">{{item.date.time}}</h4>\n            </ion-col>\n            <ion-col width-80 class="schedule-data">\n              <div class="data-item">\n                <div class="item-content">\n                  <h2 class="item-title one-line">{{item.subject}}</h2>\n                  <div class="item-description">\n                    <ion-icon class="description-icon" name="clock"></ion-icon>\n                    <p class="description-text">{{item.date.full}}</p>\n                  </div>\n                  <div class="item-description">\n                    <ion-icon class="description-icon" name="navigate"></ion-icon>\n                    <p class="description-text one-line">{{item.location}}</p>\n                  </div>\n                </div>\n                <ion-icon class="item-icon" name="arrow-forward"></ion-icon>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-item>\n      </ion-list>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\schedule\schedule.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__schedule_service__["a" /* ScheduleService */]])
    ], SchedulePage);
    return SchedulePage;
}());

//# sourceMappingURL=schedule.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_2_model__ = __webpack_require__(816);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_2_service__ = __webpack_require__(377);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var List2Page = (function () {
    function List2Page(nav, list2Service) {
        this.nav = nav;
        this.list2Service = list2Service;
        this.list2 = new __WEBPACK_IMPORTED_MODULE_3__list_2_model__["a" /* List2Model */]();
    }
    List2Page.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.list2Service
            .getData()
            .then(function (data) {
            _this.list2.items = data.items;
        });
    };
    List2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'list-2-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\list-2\list-2.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'LIST_MINI\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="list-mini-content">\n  <div class="list-mini">\n    <ion-list>\n      <button class="list-item" ion-item *ngFor="let item of list2.items">\n        <ion-row no-padding class="content-row one-line">\n          <!-- You can limit the rows of the description by using the class one-line. If you remove it, all the content from the row will be shown -->\n          <ion-col no-padding width-18 class="item-avatar">\n            <preload-image class="avatar-image" [ratio]="{w:1, h:1}" [src]="item.image"></preload-image>\n          </ion-col>\n          <ion-col no-padding width-72 class="item-content">\n            <h3 class="item-title">{{item.name}}</h3>\n            <p class="item-description">{{item.description}}</p>\n          </ion-col>\n          <ion-col no-padding width-10 class="item-icon">\n            <ion-icon name="arrow-forward"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </button>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\list-2\list-2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__list_2_service__["a" /* List2Service */]])
    ], List2Page);
    return List2Page;
}());

//# sourceMappingURL=list-2.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GridPage = (function () {
    function GridPage(nav) {
        this.nav = nav;
    }
    GridPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'grid-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\grid\grid.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'GRID\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-item-group>\n    <ion-item-divider>{{\'GRID_EXAMPLE\' | translate}} #1</ion-item-divider>\n    <ion-row class="grid-1 grid-example">\n      <ion-col width-100 class="grid-item">\n        <div class="grid-item-wrapper">\n          <div class="grid-item-inner multi-line">\n            <h2 class="item-title">1</h2>\n            <h2 class="item-title">1</h2>\n            <h2 class="item-title">1</h2>\n            <h2 class="item-title">1</h2>\n          </div>\n        </div>\n      </ion-col>\n      <ion-col width-50 class="grid-item" *ngFor="let item of [2, 3, 4, 5, 6]">\n        <div class="grid-item-wrapper">\n          <div class="grid-item-inner">\n            <h2 class="item-title">{{ item }}</h2>\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-item-divider>{{\'GRID_EXAMPLE\' | translate}} #2</ion-item-divider>\n    <ion-row class="grid-2 grid-example">\n      <ion-col width-66 class="grid-item">\n        <div class="grid-item-wrapper">\n          <div class="grid-item-inner multi-line">\n            <h2 class="item-title">1</h2>\n            <h2 class="item-title">1</h2>\n            <h2 class="item-title">1</h2>\n          </div>\n        </div>\n      </ion-col>\n      <ion-col width-33 class="grid-item">\n        <ion-row class="double-item">\n          <ion-col width-100 class="grid-item" *ngFor="let item of [2, 3]">\n            <div class="grid-item-wrapper">\n              <div class="grid-item-inner">\n                <h2 class="item-title">{{ item }}</h2>\n              </div>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n      <ion-col width-33 class="grid-item" *ngFor="let item of [4, 5, 6, 7]">\n        <div class="grid-item-wrapper">\n          <div class="grid-item-inner">\n            <h2 class="item-title">{{ item }}</h2>\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-item-divider>{{\'GRID_EXAMPLE\' | translate}} #3</ion-item-divider>\n    <ion-row class="grid-3 grid-example">\n      <ion-col width-50 class="grid-item" *ngFor="let item of [1, 2, 3, 4, 5, 6, 7]">\n        <div class="grid-item-wrapper">\n          <div class="grid-item-inner">\n            <h2 class="item-title">{{ item }}</h2>\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-item-divider>{{\'GRID_EXAMPLE\' | translate}} #4</ion-item-divider>\n    <ion-row class="grid-3 grid-example">\n      <ion-col width-33 class="grid-item" *ngFor="let item of [1, 2, 3, 4, 5, 6, 7]">\n        <div class="grid-item-wrapper">\n          <div class="grid-item-inner">\n            <h2 class="item-title">{{ item }}</h2>\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\grid\grid.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], GridPage);
    return GridPage;
}());

//# sourceMappingURL=grid.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseTabsNavigationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase_feed_firebase_feed__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firebase_profile_firebase_profile__ = __webpack_require__(400);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseTabsNavigationPage = (function () {
    function FirebaseTabsNavigationPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__firebase_feed_firebase_feed__["a" /* FirebaseFeedPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__firebase_profile_firebase_profile__["a" /* FirebaseProfilePage */];
    }
    FirebaseTabsNavigationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'firebase-tabs-navigation',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-tabs-navigation\firebase-tabs-navigation.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="{{\'FEED\' | translate}}" tabIcon="apps"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="{{\'PROFILE\' | translate}}" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-tabs-navigation\firebase-tabs-navigation.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], FirebaseTabsNavigationPage);
    return FirebaseTabsNavigationPage;
}());

//# sourceMappingURL=firebase-tabs-navigation.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseAvatarSelect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firebase_integration_service__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseAvatarSelect = (function () {
    function FirebaseAvatarSelect(viewCtrl, firebaseService) {
        this.viewCtrl = viewCtrl;
        this.firebaseService = firebaseService;
    }
    FirebaseAvatarSelect.prototype.ionViewWillLoad = function () {
        this.getData();
    };
    FirebaseAvatarSelect.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getAvatars()
            .then(function (data) {
            _this.avatars = data;
        });
    };
    FirebaseAvatarSelect.prototype.close = function (avatar) {
        this.viewCtrl.dismiss(avatar.link);
    };
    FirebaseAvatarSelect = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'firebase-avatar-select-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-avatar-select\firebase-avatar-select.html"*/'<ion-row>\n  <ion-col width-50 *ngFor="let avatar of avatars">\n    <div (click)="close(avatar)">\n      <img [src]=avatar.link>\n    </div>\n  </ion-col>\n</ion-row>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-avatar-select\firebase-avatar-select.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_2__firebase_integration_service__["a" /* FirebaseService */]])
    ], FirebaseAvatarSelect);
    return FirebaseAvatarSelect;
}());

//# sourceMappingURL=firebase-avatar-select.js.map

/***/ }),

/***/ 255:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 255;

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditBlogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordpress_integration_blog_post_model__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_integration_wordpress_integration_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environment_environment__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress_integration_blog_post_blog_post__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the EditBlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditBlogPage = (function () {
    function EditBlogPage(navCtrl, navParams, camera, transfer, loadingCtrl, wordpressService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.transfer = transfer;
        this.loadingCtrl = loadingCtrl;
        this.wordpressService = wordpressService;
        this.post = new __WEBPACK_IMPORTED_MODULE_2__wordpress_integration_blog_post_model__["b" /* BlogPostModel */]();
        this.post = this.navParams.get('post');
        console.log(this.post);
        this.category = this.post.categories_list;
        this.wordpressService.getCategories()
            .subscribe(function (data) {
            _this.categories = data;
        });
    }
    EditBlogPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditBlogPage');
    };
    EditBlogPage.prototype.selectImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.myphoto = 'data:image/jpeg;base64,' + imageData;
        }, function (error) {
            console.log(error);
        });
    };
    EditBlogPage.prototype.updatePost = function (post, categories) {
        var _this = this;
        post.categories = [];
        post.title = post.title.rendered;
        post.content = post.content.rendered;
        categories.forEach(function (category) {
            console.log(category.id);
            post.categories.push(category.id);
        });
        post.date = new Date(post.date);
        post.author = parseInt(localStorage.getItem("author_id"));
        // post.source_author = post.source_author;
        console.log(post, "before");
        if (this.myphoto) {
            var trnsf = this.transfer.create();
            trnsf.upload(this.myphoto, __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].wordpress_rest_api_url + 'media', {
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDY3NjQyMDMsIm5iZiI6MTU0Njc2NDIwMywiZXhwIjoxNTQ3MzY5MDAzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.HxMaPA3tibWCxveab4FbhDREAAHtfQOS3LIe891NSyc',
                    'content-disposition': "attachment; filename=\'lutfor.png\'"
                }
            }).then(function (res) {
                console.log(res);
            }, function (error) {
                console.log(error);
            });
        }
        this.wordpressService.updatePost(post).subscribe(function (response) {
            console.log(response.json());
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__wordpress_integration_blog_post_blog_post__["a" /* BlogPostPage */], {
                post: response.json()
            });
        });
    };
    EditBlogPage.prototype.categoryChange = function (event) {
    };
    ;
    EditBlogPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-edit-blog',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\edit-blog\edit-blog.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n          \n        <ion-title> Edit Post</ion-title>\n      </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-item class="top-banner">\n        Lorem ipsum dolor sit amet\n    </ion-item>\n\n  <ion-list>\n\n    <ion-item>\n      <ion-label color="primary"> Title </ion-label>\n      <ion-input type="text" [(ngModel)]="post.title.rendered" name="title"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary"> Source URL </ion-label>\n      <ion-textarea [(ngModel)]="post.source_url" name="source_url"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary"> Source Name </ion-label>\n      <ion-textarea [(ngModel)]="post.source_name" name="source_name"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary"> Source Author </ion-label>\n      <ion-textarea [(ngModel)]="post.source_author" name="source_author"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary">Date</ion-label>\n      <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="post.date"></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary"> Summery </ion-label>\n      <ion-textarea [(ngModel)]="post.content.rendered" name="content"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n        <button ion-button (click)="selectImage()" full color="primary"> Select Photo</button>\n      </ion-item>\n\n      <ion-item>\n        <img src="{{ myphoto }}" />\n      </ion-item>\n\n    <ion-item>\n      <ion-label> Categories </ion-label>\n      <select-searchable \n          [isMultiple]="true"\n          item-content\n          [(ngModel)]="category"\n          [items]="categories"\n          itemValueField="id"\n          itemTextField="name"\n          [canSearch]="true"\n          (onChange)="categoryChange($event)">\n          <ng-template ionicSelectableValueTemplate let-categories="value">\n            <div class="ionic-selectable-value-item" *ngFor="let category of categories">\n                {{ category.name }}\n            </div>\n        </ng-template>\n      </select-searchable>\n  </ion-item>\n\n    <ion-toolbar>\n      <button class="create-comment" ion-button block (click)="updatePost(post, category)"> Update Post</button>\n     </ion-toolbar>\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\edit-blog\edit-blog.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_3__wordpress_integration_wordpress_integration_service__["a" /* WordpressService */]])
    ], EditBlogPage);
    return EditBlogPage;
}());

//# sourceMappingURL=edit-blog.js.map

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/home/home.module": [
		893,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 300;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_profile_model__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegistrationPage = (function () {
    function RegistrationPage(navCtrl, formBuilder, navParams, authProvider) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.authProvider = authProvider;
        this.user = new __WEBPACK_IMPORTED_MODULE_0__profile_profile_model__["b" /* UserModel */]();
    }
    RegistrationPage.prototype.ionViewDidLoad = function () {
        this.registration_form = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required
            ])),
            email: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required),
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required)
        });
    };
    RegistrationPage.prototype.register = function (user) {
        var _this = this;
        this.authProvider.register(user).subscribe(function (data) {
            _this.success = "Registered successfully!";
        }, function (error) {
            _this.error_message = "Could not register!";
        });
    };
    RegistrationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'page-registration',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\registration\registration.html"*/'<ion-header>\n\n    <ion-navbar>\n      <ion-title>Registration</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n  \n      <ion-item>\n        <span *ngIf="success" style="color:green">{{ success }}</span>\n        <span *ngIf="error_message" style="color:red">{{ error_message }}</span>\n      </ion-item>\n      \n      <form class="login-form auth-form">\n          <ion-item>\n            <ion-input type="text" placeholder="Username" [(ngModel)]="user.username" name="username" required></ion-input>\n          </ion-item>\n  \n          <ion-item>\n              <ion-input type="text" placeholder="Email" [(ngModel)]="user.email" name="email" required></ion-input>\n            </ion-item>\n          <show-hide-container>\n            <ion-item>\n              <ion-input type="password" placeholder="Password" [(ngModel)]="user.password" name="password" show-hide-input required></ion-input>\n            </ion-item>\n          </show-hide-container>\n      \n      \n          <button ion-button block class="auth-action-button login-button" \n          type="submit" type="submit" (click)="register(user)">Register</button>\n          \n        </form>\n  \n  </ion-content>  '/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\registration\registration.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* AuthProvider */]])
    ], RegistrationPage);
    return RegistrationPage;
}());

//# sourceMappingURL=registration.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List1Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environment_environment__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var List1Service = (function () {
    function List1Service(http, authProvider) {
        this.http = http;
        this.authProvider = authProvider;
    }
    List1Service.prototype.getData = function (sort, page) {
        // var username = 'guestaccount1';
        // var password = '8eCo6%cOn6y0jPgwVolSMdHc';
        if (page === void 0) { page = 1; }
        // this.authProvider.postLogin(username, password).subscribe((data:any) => {
        //   localStorage.setItem("_token", JSON.parse(data._body).token);
        //   console.log(JSON.parse(data._body).token, "_token");
        // });
        // let headers = new Headers({
        //   'Content-Type': 'application/json',
        //   'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDY3NjQyMDMsIm5iZiI6MTU0Njc2NDIwMywiZXhwIjoxNTQ3MzY5MDAzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.HxMaPA3tibWCxveab4FbhDREAAHtfQOS3LIe891NSyc'
        // });
        // console.log(headers);
        var sortUrl = sort == 0 ? '&orderby=date&order=desc' : '&orderby=date&order=asc';
        // return this.http.get(environment.wordpress_rest_api_url + "posts?_embed", {headers: headers});
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDc0ODEyODUsIm5iZiI6MTU0NzQ4MTI4NSwiZXhwIjoxNTQ4MDg2MDg1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.XozAbXubbYDEP5FDmzQGN03Hw-xMU5AGFU9P-yfvexc'
        });
        console.log(headers);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environment_environment__["a" /* environment */].wordpress_rest_api_url + 'posts?_embed' + sortUrl + '&page=' + page, { headers: headers })
            .map(function (res) { return res; });
    };
    List1Service = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__["a" /* AuthProvider */]])
    ], List1Service);
    return List1Service;
}());

//# sourceMappingURL=list-1.service.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wordpress_integration_blog_post_model__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment_environment__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wordpress_integration_wordpress_integration_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wordpress_integration_blog_post_blog_post__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the CreatePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreatePostPage = (function () {
    // limitTo: number;
    function CreatePostPage(navCtrl, transfer, wordpressService, loading, navParams, http, authProvider, camera) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.transfer = transfer;
        this.wordpressService = wordpressService;
        this.loading = loading;
        this.navParams = navParams;
        this.http = http;
        this.authProvider = authProvider;
        this.camera = camera;
        this.post = new __WEBPACK_IMPORTED_MODULE_4__wordpress_integration_blog_post_model__["b" /* BlogPostModel */]();
        this.wordpressService.getCategories()
            .subscribe(function (data) {
            _this.categories = data;
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
    CreatePostPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreatePostPage');
    };
    CreatePostPage.prototype.selectImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.myphoto = 'data:image/jpeg;base64,' + imageData;
        }, function (error) {
            console.log(error);
        });
    };
    CreatePostPage.prototype.submitPost = function (post, categories) {
        var _this = this;
        post.categories = [];
        post.content = post.content;
        post.status = "publish";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDc0ODEyODUsIm5iZiI6MTU0NzQ4MTI4NSwiZXhwIjoxNTQ4MDg2MDg1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.XozAbXubbYDEP5FDmzQGN03Hw-xMU5AGFU9P-yfvexc',
        });
        // console.log(categories, "categories")
        categories.forEach(function (category) {
            // console.log(category.id);
            post.categories.push(category.id);
        });
        post.date = new Date(post.date);
        post.author = parseInt(localStorage.getItem("author_id"));
        var trnsf = this.transfer.create();
        trnsf.upload(this.myphoto, __WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].wordpress_rest_api_url + 'media', {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDc0ODEyODUsIm5iZiI6MTU0NzQ4MTI4NSwiZXhwIjoxNTQ4MDg2MDg1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.XozAbXubbYDEP5FDmzQGN03Hw-xMU5AGFU9P-yfvexc',
                'content-disposition': "attachment; filename=\'lutfor.png\'"
            }
        }).then(function (res) {
            post.featured_media = res.response;
            console.log(res, 'upload result');
        }, function (error) {
            console.log(error);
        });
        console.log(post, "before");
        return this.http.post(__WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].wordpress_rest_api_url + "posts", post, { headers: headers })
            .toPromise()
            .then(function (response) {
            console.log(response, "after");
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__wordpress_integration_blog_post_blog_post__["a" /* BlogPostPage */], {
                post: response
            });
        })
            .catch(function (error) {
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
    };
    CreatePostPage.prototype.categoryChange = function (event) {
    };
    ;
    CreatePostPage.prototype.WordCount = function (post) {
        var number = post.title.split(" ").length;
        //post.title.str.split(" ").length;
        // post.limitTo = post.title.str.split(" ").length;
        if (number == 2) {
            post.limitTo = 3;
            console.log(post.limitTo);
            return false;
        }
    };
    CreatePostPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'page-create-post',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\create-post\create-post.html"*/'<!--\n  Generated template for the CreatePostPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n      </button>\n        \n      <ion-title> Create Post</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n\n      <ion-item class="top-banner">\n          Lorem ipsum dolor sit amet\n      </ion-item>\n  \n      <ion-list>\n  \n          <ion-item>\n            <ion-label color="primary"> Title </ion-label>\n            <ion-input type="text" [(ngModel)]="post.title" (ionChange)="WordCount(post)"\n            name="title"></ion-input>\n          </ion-item>\n\n          \n  \n          <ion-item>\n            <ion-label color="primary"> Source URL </ion-label>\n            <ion-textarea [(ngModel)]="post.source_url" name="source_url"></ion-textarea>\n          </ion-item>\n  \n          <ion-item>\n            <ion-label color="primary"> Source Name </ion-label>\n            <ion-textarea [(ngModel)]="post.source_name" name="source_name"></ion-textarea>\n          </ion-item>\n\n          <ion-item>\n            <ion-label color="primary"> Source Author </ion-label>\n            <ion-textarea [(ngModel)]="post.source_author" name="source_author"></ion-textarea>\n          </ion-item>\n\n          <ion-item>\n            <ion-label color="primary">Date</ion-label>\n            <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="post.date"></ion-datetime>\n          </ion-item>\n  \n          <ion-item>\n            <ion-label color="primary"> Summery </ion-label>\n            <ion-textarea [(ngModel)]="post.content" name="content" id="editor"></ion-textarea>\n          </ion-item>\n\n          <ion-item>\n            <button ion-button (click)="selectImage()" full color="primary"> Select Photo</button>\n          </ion-item>\n\n          <ion-item>\n            <img src="{{ myphoto }}" />\n          </ion-item>\n  \n          <ion-item>\n            <ion-label> Categories </ion-label>\n            <select-searchable \n                [isMultiple]="true"\n                item-content\n                [(ngModel)]="category"\n                [items]="categories"\n                itemValueField="id"\n                itemTextField="name"\n                [canSearch]="true"\n                (onChange)="categoryChange($event)">\n                <ng-template ionicSelectableValueTemplate let-categories="value">\n                  <div class="ionic-selectable-value-item" *ngFor="let category of categories">\n                      {{ category.name }}\n                  </div>\n              </ng-template>\n            </select-searchable>\n        </ion-item>\n            \n  \n          <button ion-button type="submit" block (click)="submitPost(post, category)"> Submit </button>\n      </ion-list>\n  </ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\create-post\create-post.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_6__wordpress_integration_wordpress_integration_service__["a" /* WordpressService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]])
    ], CreatePostPage);
    return CreatePostPage;
}());

//# sourceMappingURL=create-post.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalkthroughPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WalkthroughPage = (function () {
    function WalkthroughPage(nav) {
        this.nav = nav;
        this.lastSlide = false;
    }
    WalkthroughPage.prototype.skipIntro = function () {
        // You can skip to main app
        // this.nav.setRoot(TabsNavigationPage);
        // Or you can skip to last slide (login/signup slide)
        this.lastSlide = true;
        this.slider.slideTo(this.slider.length());
    };
    WalkthroughPage.prototype.onSlideChanged = function () {
        // If it's the last slide, then hide the 'Skip' button on the header
        this.lastSlide = this.slider.isEnd();
    };
    WalkthroughPage.prototype.goToLogin = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    WalkthroughPage.prototype.goToSignup = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Slides"])
    ], WalkthroughPage.prototype, "slider", void 0);
    WalkthroughPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'walkthrough-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\walkthrough\walkthrough.html"*/'<ion-header class="walkthrough-header">\n  <ion-toolbar>\n    <ion-buttons end>\n      <button ion-button class="skip-button" (click)="skipIntro()" [hidden]="lastSlide">{{\'SKIP\' | translate}}</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="walkthrough-content">\n  <ion-slides #slider (ionSlideDidChange)="onSlideChanged()" pager="true">\n    <ion-slide class="slide-1">\n      <ion-row class="intro-image-row">\n        <ion-col center width-64 no-padding>\n          <preload-image [ratio]="{w:1, h:1}" src="./assets/images/logo_white.png" alt="app logo" title="ion2FullApp"></preload-image>\n        </ion-col>\n      </ion-row>\n      <h2 class="main-title">{{\'Welcome to Hyroglf!\' | translate}}</h2>\n      <p class="intro-text">\n        Lorem ipsum dolor senit.\n      </p>\n      <p class="intro-text">\n        v.1.0.0\n      </p>\n    </ion-slide>\n    <ion-slide class="slide-2">\n      <ion-row class="intro-image-row">\n        <ion-col center width-64 no-padding>\n          <preload-image [ratio]="{w:1, h:1}" src="./assets/images/slide-2-img.png" alt="slide 2 img" title="ion2FullApp"></preload-image>\n        </ion-col>\n      </ion-row>\n      <h2 class="main-title">{{\'WAKE_UP!\' | translate}}</h2>\n      <p class="intro-text">\n        We should get started.\n      </p>\n      <p class="intro-text">\n        Here we have a beautiful walkthrough\n      </p>\n    </ion-slide>\n    <ion-slide class="slide-3">\n      <ion-row class="intro-image-row">\n        <ion-col center width-64 no-padding>\n          <preload-image [ratio]="{w:1, h:1}" src="./assets/images/slide-3-img.png" alt="slide 3 img" title="ion2FullApp"></preload-image>\n        </ion-col>\n      </ion-row>\n      <h2 class="main-title">{{\'GET_READY!\' | translate}}</h2>\n      <p class="intro-text">\n        Soon your app will look and feel awesome!\n      </p>\n    </ion-slide>\n    <ion-slide class="slide-4">\n      <ion-row class="intro-image-row">\n        <ion-col center width-64 no-padding>\n          <preload-image [ratio]="{w:1, h:1}" src="./assets/images/slide-4-img.png" alt="slide 4 img" title="ion2FullApp"></preload-image>\n        </ion-col>\n      </ion-row>\n      <h2 class="main-title">{{\'ALMOST_DONE!\' | translate}}</h2>\n      <p class="intro-text">\n        Log in to your account.\n      </p>\n      <p class="intro-text">\n        We are ready to rock!\n      </p>\n      <div class="button-bar">\n        <button ion-button primary (click)="goToLogin()">{{\'LOG_IN\' | translate}}</button>\n        <button ion-button primary (click)="goToSignup()">{{\'SIGN_UP\' | translate}}</button>\n      </div>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\walkthrough\walkthrough.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], WalkthroughPage);
    return WalkthroughPage;
}());

//# sourceMappingURL=walkthrough.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forgot_password_forgot_password__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__facebook_login_facebook_login_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__google_login_google_login_service__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__twitter_login_twitter_login_service__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(nav, facebookLoginService, googleLoginService, twitterLoginService, loadingCtrl) {
        this.nav = nav;
        this.facebookLoginService = facebookLoginService;
        this.googleLoginService = googleLoginService;
        this.twitterLoginService = twitterLoginService;
        this.loadingCtrl = loadingCtrl;
        this.main_page = { component: __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] };
        this.login = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('test', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    }
    LoginPage.prototype.doLogin = function () {
        this.nav.setRoot(this.main_page.component);
    };
    LoginPage.prototype.doFacebookLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
        // let this = this;
        this.facebookLoginService.getFacebookUser()
            .then(function (data) {
            // user is previously logged with FB and we have his data we will let him access the app
            _this.nav.setRoot(_this.main_page.component);
        }, function (error) {
            //we don't have the user data so we will ask him to log in
            _this.facebookLoginService.doFacebookLogin()
                .then(function (res) {
                _this.loading.dismiss();
                _this.nav.setRoot(_this.main_page.component);
            }, function (err) {
                console.log("Facebook Login error", err);
            });
        });
    };
    LoginPage.prototype.doGoogleLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
        this.googleLoginService.trySilentLogin()
            .then(function (data) {
            // user is previously logged with Google and we have his data we will let him access the app
            _this.nav.setRoot(_this.main_page.component);
        }, function (error) {
            //we don't have the user data so we will ask him to log in
            _this.googleLoginService.doGoogleLogin()
                .then(function (res) {
                _this.loading.dismiss();
                _this.nav.setRoot(_this.main_page.component);
            }, function (err) {
                console.log("Google Login error", err);
            });
        });
    };
    LoginPage.prototype.doTwitterLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
        this.twitterLoginService.getTwitterUser()
            .then(function (data) {
            // user is previously logged with FB and we have his data we will let him access the app
            _this.nav.setRoot(_this.main_page.component);
        }, function (error) {
            //we don't have the user data so we will ask him to log in
            _this.twitterLoginService.doTwitterLogin()
                .then(function (res) {
                _this.loading.dismiss();
                _this.nav.setRoot(_this.main_page.component);
            }, function (err) {
                console.log("Twitter Login error", err);
            });
        });
    };
    LoginPage.prototype.goToSignup = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.goToForgotPassword = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\login\login.html"*/'<ion-header class="login-header auth-header">\n  <ion-navbar>\n    <ion-title>{{\'SIGN_IN\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content auth-content">\n  <form class="login-form auth-form" [formGroup]="login" (ngSubmit)="doLogin()">\n    <ion-item>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n    </ion-item>\n    <show-hide-container>\n      <ion-item>\n        <ion-input type="password" placeholder="Password" formControlName="password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <button ion-button block class="auth-action-button login-button" type="submit" [disabled]="!login.valid">{{\'LOG_IN\' | translate}}</button>\n  </form>\n  <ion-row class="alt-options">\n    <ion-col no-padding width-50>\n      <button ion-button block clear class="forgot-button" (click)="goToForgotPassword()">{{\'FORGOT_PASSWORD?\' | translate }}</button>\n    </ion-col>\n    <ion-col no-padding width-50>\n      <button ion-button block clear class="signup-button" (click)="goToSignup()">{{\'SIGN_UP!\' | translate}}</button>\n    </ion-col>\n  </ion-row>\n  <p class="auth-divider">\n    Or\n  </p>\n  <button ion-button block class="facebook-auth-button" (click)="doFacebookLogin()">Log in with Facebook</button>\n  <button ion-button block class="google-auth-button" (click)="doGoogleLogin()">Log in with Google</button>\n  <button ion-button block class="twitter-auth-button" (click)="doTwitterLogin()">Log in with Twitter</button>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_6__facebook_login_facebook_login_service__["a" /* FacebookLoginService */],
            __WEBPACK_IMPORTED_MODULE_7__google_login_google_login_service__["a" /* GoogleLoginService */],
            __WEBPACK_IMPORTED_MODULE_8__twitter_login_twitter_login_service__["a" /* TwitterLoginService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FollowersPage = (function () {
    function FollowersPage(menu, navParams) {
        this.menu = menu;
        this.navParams = navParams;
        this.list = [];
        this.list = navParams.get('list');
    }
    FollowersPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on this page
        this.menu.enable(false);
    };
    FollowersPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    };
    FollowersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'followers-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\followers\followers.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'FOLLOWERS\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="followers-content">\n  <!-- <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar> -->\n  <ion-searchbar placeholder="Search"></ion-searchbar>\n  <ion-list class="followers-list">\n    <ion-item class="list-item" *ngFor="let item of list">\n      <ion-thumbnail item-left>\n        <preload-image [ratio]="{w:1, h:1}" [src]="item.image" alt="item.name" title="item.name"></preload-image>\n      </ion-thumbnail>\n      <h2 class="item-title">{{item.name}}</h2>\n      <p class="item-description" rows="2">{{item.about}}</p>\n      <button class="relation-button" [ngClass]="{following: !item.inverse_relation}" ion-button clear icon-only item-right>\n        <ion-icon *ngIf="item.inverse_relation" name="person-add"></ion-icon>\n        <ion-icon *ngIf="!item.inverse_relation" name="checkmark"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\followers\followers.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["MenuController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], FollowersPage);
    return FollowersPage;
}());

//# sourceMappingURL=followers.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationsService = (function () {
    function NotificationsService(http) {
        this.http = http;
    }
    NotificationsService.prototype.getData = function () {
        return this.http.get('./assets/example_data/notifications.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NotificationsService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    NotificationsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], NotificationsService);
    return NotificationsService;
}());

//# sourceMappingURL=notifications.service.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgotPasswordPage = (function () {
    function ForgotPasswordPage(nav) {
        this.nav = nav;
        this.main_page = { component: __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] };
        this.forgot_password = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    }
    ForgotPasswordPage.prototype.recoverPassword = function () {
        console.log(this.forgot_password.value);
        this.nav.setRoot(this.main_page.component);
    };
    ForgotPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'forgot-password-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\forgot-password\forgot-password.html"*/'<ion-header class="forgot-password-header auth-header">\n  <ion-navbar>\n    <ion-title>{{\'FORGOT_PASSWORD?\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="forgot-password-content auth-content">\n  <h2 class="auth-title">{{ \'RECOVER_YOUR_PASSWORD\' | translate }}</h2>\n  <p class="recover-message">\n    {{ \'RECOVER_MESSAGE\' | translate }}\n  </p>\n  <form class="forgot-password-form auth-form" [formGroup]="forgot_password" (ngSubmit)="recoverPassword()">\n    <ion-item>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n    </ion-item>\n    <button ion-button block class="auth-action-button recover-password-button" type="submit" [disabled]="!forgot_password.valid">Reset password</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\forgot-password\forgot-password.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LanguageService = (function () {
    function LanguageService() {
        this.languages = new Array();
        this.languages.push({ name: "English", code: "en" }, { name: "Spanish", code: "es" }, { name: "Arabic", code: "ar" });
    }
    LanguageService.prototype.getLanguages = function () {
        return this.languages;
    };
    LanguageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LanguageService);
    return LanguageService;
}());

//# sourceMappingURL=language.service.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_layout_form_layout__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filters_filters__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__form_validations_form_validations__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FormsPage = (function () {
    function FormsPage(nav, translate) {
        this.nav = nav;
        this.translate = translate;
    }
    FormsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].forkJoin(this.translate.get('FORMS_EXAMPLES'), this.translate.get('FILTERS'), this.translate.get('FORM_VALIDATIONS')).subscribe(function (data) {
            _this.items = [
                { title: data[0], component: __WEBPACK_IMPORTED_MODULE_2__form_layout_form_layout__["a" /* FormLayoutPage */] },
                { title: data[1], component: __WEBPACK_IMPORTED_MODULE_5__filters_filters__["a" /* FiltersPage */] },
                { title: data[2], component: __WEBPACK_IMPORTED_MODULE_6__form_validations_form_validations__["a" /* FormValidationsPage */] }
            ];
        });
    };
    FormsPage.prototype.itemTapped = function (event, item) {
        this.nav.push(item.component);
    };
    FormsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'forms-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\forms\forms.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Recent Edits</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="forms-content">\n  <ion-list class="forms-list">\n    <button class="list-item" ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-row no-padding>\n        <ion-col no-padding class="item-content">\n          <h3 class="item-title">{{item.title}}</h3>\n          <span class="item-note" *ngIf="item.note">{{item.note}}</span>\n        </ion-col>\n        <ion-col no-padding width-10 class="item-icon">\n          <ion-icon name="arrow-forward"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\forms\forms.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], FormsPage);
    return FormsPage;
}());

//# sourceMappingURL=forms.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormLayoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_counter_input_counter_input__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_crop__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FormLayoutPage = (function () {
    function FormLayoutPage(nav, alertCtrl, cropService, imagePicker, platform) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.cropService = cropService;
        this.imagePicker = imagePicker;
        this.platform = platform;
        this.section = "event";
        this.post_form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            title: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            description: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            servings: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](2, Object(__WEBPACK_IMPORTED_MODULE_3__components_counter_input_counter_input__["b" /* counterRangeValidator */])(10, 1)),
            time: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('01:30', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            temperature: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](180)
        });
        this.event_form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            title: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            location: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            from_date: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('2016-09-18', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            from_time: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('13:00', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            to_date: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            to_time: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
        this.card_form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            card_number: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            card_holder: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            cvc: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            exp_date: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            save_card: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](true, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    }
    FormLayoutPage.prototype.onSegmentChanged = function (segmentButton) {
        // console.log('Segment changed to', segmentButton.value);
    };
    FormLayoutPage.prototype.onSegmentSelected = function (segmentButton) {
        // console.log('Segment selected', segmentButton.value);
    };
    FormLayoutPage.prototype.createPost = function () {
        console.log(this.post_form.value);
    };
    FormLayoutPage.prototype.createEvent = function () {
        console.log(this.event_form.value);
    };
    FormLayoutPage.prototype.createCard = function () {
        console.log(this.card_form.value);
    };
    FormLayoutPage.prototype.chooseCategory = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            cssClass: 'category-prompt'
        });
        alert.setTitle('Category');
        alert.addInput({
            type: 'checkbox',
            label: 'News',
            value: 'value1',
            checked: true
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Politics',
            value: 'value2'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Economy',
            value: 'value3'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Health',
            value: 'value4'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Sports',
            value: 'value5'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Tech',
            value: 'value6'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Pop Culture',
            value: 'value7'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'History',
            value: 'value8'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Arts',
            value: 'value9'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Biography',
            value: 'value10'
        });
        alert.addInput({
            type: 'checkbox',
            label: 'Other',
            value: 'value11'
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Confirm',
            handler: function (data) {
                console.log('Checkbox data:', data);
                _this.categories_checkbox_open = false;
                _this.categories_checkbox_result = data;
            }
        });
        alert.present().then(function () {
            _this.categories_checkbox_open = true;
        });
    };
    FormLayoutPage.prototype.openImagePicker = function () {
        var _this = this;
        this.imagePicker.hasReadPermission().then(function (result) {
            if (result == false) {
                // no callbacks required as this opens a popup which returns async
                _this.imagePicker.requestReadPermission();
            }
            else if (result == true) {
                _this.imagePicker.getPictures({ maximumImagesCount: 1 }).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        _this.cropService.crop(results[i], { quality: 75 }).then(function (newImage) {
                            var image = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["normalizeURL"])(newImage);
                            _this.selected_image = image;
                        }, function (error) { return console.error("Error cropping image", error); });
                    }
                }, function (err) { return console.log(err); });
            }
        });
    };
    FormLayoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'form-layout-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\form-layout\form-layout.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>New Post</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="forms-examples-content">\n  <ion-segment class="forms-examples-segment" [(ngModel)]="section" (ionChange)="onSegmentChanged($event)">\n    <ion-segment-button value="post" (ionSelect)="onSegmentSelected($event)">Summary</ion-segment-button>\n    <ion-segment-button value="event" (ionSelect)="onSegmentSelected($event)">Category</ion-segment-button>\n    <ion-segment-button value="card" (ionSelect)="onSegmentSelected($event)">Tags</ion-segment-button>\n  </ion-segment>\n  <div [ngSwitch]="section" class="forms-wrapper">\n    <div *ngSwitchCase="\'post\'" class="post-example-view">\n      <form class="sample-form post-form" [formGroup]="post_form" (ngSubmit)="createPost()">\n        <section class="form-section">\n          <ion-item>\n            <ion-input type="text" placeholder="Title: e.g. Krabby Patty" formControlName="title"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-textarea rows="7" placeholder="Write a description or something..." formControlName="description"></ion-textarea>\n          </ion-item>\n        </section>\n        <button *ngIf="!selected_image" ion-button block large class="upload-image-button" (click)="openImagePicker()">\n          <ion-icon name="camera"></ion-icon>\n          <h3 class="button-title">{{\'UPLOAD_AN_IMAGE\' | translate}}</h3>\n        </button>\n        <preload-image *ngIf="selected_image" [ratio]="{w:1, h:1}" [src]="selected_image" alt="this is the image" title="IMAGE!"></preload-image>\n\n        <section class="form-section">\n          <button ion-button block icon-end class="choose-category-button" (click)="chooseCategory()">\n            {{\'CHOOSE_CATEGORY\' | translate}}\n            <ion-icon name="add"></ion-icon>\n          </button>\n        </section>\n        <h2 class="section-title">Additional Info</h2>\n        <ion-item class="">\n          <ion-label floating>Published on:</ion-label>\n          <ion-datetime formControlName="from_date" displayFormat="DD/MM/YY" pickerFormat="DD-MM-YYYY"></ion-datetime>\n        </ion-item>\n        <ion-item class="">\n          <ion-datetime formControlName="from_time" displayFormat="h mm a" pickerFormat="h mm A"></ion-datetime>\n        </ion-item>\n        <ion-item>\n          <ion-input type="text" placeholder="Source URL: http://..." formControlName="source_url"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-input type="text" placeholder="Source Author (e.g. Barbara Walters)" formControlName="source_auth"></ion-input>\n        </ion-item>\n        <section class="form-section">\n          <button ion-button block class="form-action-button create-post-button" type="submit" [disabled]="!post_form.valid">Post!</button>\n        </section>\n      </form>\n    </div>\n    <div *ngSwitchCase="\'event\'" class="event-example-view">\n      <form class="sample-form event-form" [formGroup]="event_form" (ngSubmit)="createEvent()">\n        <section class="form-section">\n          <h2 class="section-title">{{\'ADD_AN_EVENT\' | translate}}</h2>\n          <ion-item>\n            <ion-input type="text" placeholder="Event title" formControlName="title"></ion-input>\n          </ion-item>\n          <ion-item icon-end>\n            <ion-input type="text" placeholder="Location" formControlName="location"></ion-input>\n            <ion-icon name="navigate" item-right></ion-icon>\n          </ion-item>\n          <ion-row no-padding class="multi-input-row">\n            <ion-col no-padding width-60>\n              <ion-item class="multi-input time-item">\n                <ion-label floating>{{\'FROM\' | translate }}</ion-label>\n                <ion-datetime formControlName="from_date" displayFormat="DD/MM/YY" pickerFormat="DD-MM-YYYY"></ion-datetime>\n              </ion-item>\n            </ion-col>\n            <ion-col no-padding width-40>\n              <ion-item class="multi-input time-item">\n                <ion-datetime formControlName="from_time" displayFormat="h mm a" pickerFormat="h mm A"></ion-datetime>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row no-padding class="multi-input-row">\n            <ion-col no-padding width-60>\n              <ion-item class="multi-input time-item">\n                <ion-label floating>{{\'TO\' | translate}}</ion-label>\n                <ion-datetime formControlName="to_date" displayFormat="DD/MM/YY" pickerFormat="DD-MM-YYYY"></ion-datetime>\n              </ion-item>\n            </ion-col>\n            <ion-col no-padding width-40>\n              <ion-item class="multi-input time-item">\n                <ion-datetime formControlName="to_time" displayFormat="h mm a" pickerFormat="h mm A"></ion-datetime>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n        </section>\n        <section class="form-section">\n          <button ion-button block class="form-action-button create-event-button" type="submit" [disabled]="!event_form.valid">Done!</button>\n        </section>\n      </form>\n    </div>\n    <div *ngSwitchCase="\'card\'" class="card-example-view">\n      <form class="sample-form card-form" [formGroup]="card_form" (ngSubmit)="createCard()">\n        <section class="form-section">\n          <h2 class="section-title">{{\'CREDICT_CARD_INFORMATION\' | translate}}</h2>\n          <ion-item>\n            <ion-label floating>{{\'CARD_NUMBER\' | translate}}</ion-label>\n            <ion-input type="text" formControlName="card_number"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label floating>{{\'CARD_HOLDER\' | translate}}</ion-label>\n            <ion-input type="text" formControlName="card_holder"></ion-input>\n          </ion-item>\n          <ion-row no-padding class="multi-input-row">\n            <ion-col no-padding width-50>\n              <ion-item class="multi-input">\n                <ion-label floating>CVC</ion-label>\n                <ion-input type="text" formControlName="cvc"></ion-input>\n              </ion-item>\n            </ion-col>\n            <ion-col no-padding width-50>\n              <ion-item class="multi-input time-item">\n                <ion-label floating>{{\'EXP_DATE\' | translate}}</ion-label>\n                <ion-datetime formControlName="exp_date" displayFormat="MM/YYYY" pickerFormat="MM-YYYY"></ion-datetime>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n        </section>\n        <ion-list class="card-preferences">\n          <ion-item class="switcher-item">\n            <ion-label>{{\'SAVE_THIS_CARD\' | translate}}</ion-label>\n            <ion-toggle formControlName="save_card"></ion-toggle>\n          </ion-item>\n        </ion-list>\n        <section class="form-section">\n          <button ion-button block class="form-action-button create-card-button" type="submit" [disabled]="!card_form.valid">Confirm</button>\n        </section>\n      </form>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\form-layout\form-layout.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], FormLayoutPage);
    return FormLayoutPage;
}());

//# sourceMappingURL=form-layout.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_counter_input_counter_input__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FiltersPage = (function () {
    function FiltersPage(nav) {
        this.nav = nav;
        this.rangeForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            single: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](25),
            dual: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]({ lower: 33, upper: 60 })
        });
        this.checkboxForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            person_1: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](true),
            person_2: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false),
            person_3: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false),
            person_4: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](true),
            person_5: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false)
        });
        this.radioForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            selected_option: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('apple')
        });
        this.checkboxTagsForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            tag_1: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false),
            tag_2: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false),
            tag_3: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](true),
            tag_4: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](true),
            tag_5: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false),
            tag_6: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false),
            tag_7: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](true),
            tag_8: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false)
        });
        this.radioTagsForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            selected_option: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('any')
        });
        this.switchersForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            notifications: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](true),
            email_notifications: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](false)
        });
        this.counterForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            counter: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](5, Object(__WEBPACK_IMPORTED_MODULE_3__components_counter_input_counter_input__["b" /* counterRangeValidator */])(7, 1)),
            counter2: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](2, Object(__WEBPACK_IMPORTED_MODULE_3__components_counter_input_counter_input__["b" /* counterRangeValidator */])(5, 1))
        });
        this.ratingForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            rate: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](2.5),
            rate2: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](1.5)
        });
        this.radioColorForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            selected_color: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('#fc9961')
        });
    }
    FiltersPage.prototype.rangeChange = function (range) {
        console.log("range, change, ratio: " + range.ratio + ", value: " + range.value);
    };
    FiltersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'filters-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\_filters\filters.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'FILTERS\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="filters-content">\n  <ion-item-group class="filters-group">\n    <ion-item-divider>{{ \'RANGE\' | translate }}</ion-item-divider>\n    <form [formGroup]="rangeForm">\n      <ion-list class="range-list">\n        <ion-item class="range-item">\n          <ion-label>\n            <h3 class="range-value">{{rangeForm.controls.dual.value.lower}}</h3>\n            <h2 class="range-label">{{ \'QUANTITY\' | translate }}</h2>\n            <h3 class="range-value">{{rangeForm.controls.dual.value.upper}}</h3>\n          </ion-label>\n          <ion-range dualKnobs="true" formControlName="dual" (ionChange)="rangeChange($event)" min="21" max="72" step="3" snaps="true" pin="false"></ion-range>\n        </ion-item>\n        <ion-item class="range-item single-range">\n          <ion-label>\n            <h2 class="range-label">{{ \'AMOUNT\' | translate }}</h2>\n            <h3 class="range-value">{{rangeForm.controls.single.value}}</h3>\n          </ion-label>\n          <ion-range formControlName="single" (ionChange)="rangeChange($event)" min="0" max="50" step="1" snaps="true" pin="false"></ion-range>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{\'MULTIPLE_ITEMS\' | translate}}</ion-item-divider>\n    <form [formGroup]="checkboxForm">\n      <ion-list class="checkbox-list">\n        <ion-item class="checkbox-item">\n          <ion-label>Sophia Martin</ion-label>\n          <ion-checkbox formControlName="person_1"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-item">\n          <ion-label>Mattie Abbott</ion-label>\n          <ion-checkbox formControlName="person_2"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-item">\n          <ion-label>Marguerite Alvarez</ion-label>\n          <ion-checkbox formControlName="person_3"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-item">\n          <ion-label>Lewis Padilla</ion-label>\n          <ion-checkbox formControlName="person_4"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-item">\n          <ion-label>Nannie Willis</ion-label>\n          <ion-checkbox formControlName="person_5"></ion-checkbox>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{ \'PICK_ONE\' | translate }}</ion-item-divider>\n    <form [formGroup]="radioForm">\n      <ion-list class="radio-group" radio-group formControlName="selected_option">\n        <ion-item class="radio-item">\n          <ion-label>Apple</ion-label>\n          <ion-radio item-left value="apple"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-item">\n          <ion-label>Banana</ion-label>\n          <ion-radio item-left value="banana"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-item">\n          <ion-label>Orange</ion-label>\n          <ion-radio item-left value="orange" disabled="true"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-item">\n          <ion-label>Kiwi</ion-label>\n          <ion-radio item-left value="kiwi"></ion-radio>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{ \'TAGS_(MULTIPLE)\' | translate }}</ion-item-divider>\n    <form [formGroup]="checkboxTagsForm">\n      <ion-list class="checkbox-tags">\n        <ion-item class="checkbox-tag">\n          <ion-label>Indonesia</ion-label>\n          <ion-checkbox formControlName="tag_1"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Pitcairn Islands</ion-label>\n          <ion-checkbox formControlName="tag_2"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Malta</ion-label>\n          <ion-checkbox formControlName="tag_3"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Sierra Leone</ion-label>\n          <ion-checkbox formControlName="tag_4"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Dominican Republic</ion-label>\n          <ion-checkbox formControlName="tag_5"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Antigua and Barbuda</ion-label>\n          <ion-checkbox formControlName="tag_6"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Macedonia</ion-label>\n          <ion-checkbox formControlName="tag_7"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Vietnam</ion-label>\n          <ion-checkbox formControlName="tag_8"></ion-checkbox>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{ \'MORE_TAGS_(MULTIPLE)\' | translate }}</ion-item-divider>\n    <form [formGroup]="checkboxTagsForm">\n      <ion-list class="checkbox-tags rounded-tags">\n        <ion-item class="checkbox-tag">\n          <ion-label>Indonesia</ion-label>\n          <ion-checkbox formControlName="tag_1"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Pitcairn Islands</ion-label>\n          <ion-checkbox formControlName="tag_2"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Malta</ion-label>\n          <ion-checkbox formControlName="tag_3"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Sierra Leone</ion-label>\n          <ion-checkbox formControlName="tag_4"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Dominican Republic</ion-label>\n          <ion-checkbox formControlName="tag_5"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Antigua and Barbuda</ion-label>\n          <ion-checkbox formControlName="tag_6"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Macedonia</ion-label>\n          <ion-checkbox formControlName="tag_7"></ion-checkbox>\n        </ion-item>\n        <ion-item class="checkbox-tag">\n          <ion-label>Vietnam</ion-label>\n          <ion-checkbox formControlName="tag_8"></ion-checkbox>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{ \'BUDGET_(RADIO_TAGS)\' | translate }}</ion-item-divider>\n    <form [formGroup]="radioTagsForm">\n      <ion-list class="radio-tags" radio-group formControlName="selected_option">\n        <ion-item class="radio-tag">\n          <ion-label>Any</ion-label>\n          <ion-radio value="any"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag">\n          <ion-label>\n            <span>&#36;</span>\n          </ion-label>\n          <ion-radio value="1"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag">\n          <ion-label>\n            <span>&#36;&#36;</span>\n          </ion-label>\n          <ion-radio value="2" disabled="true"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag">\n          <ion-label>\n            <span>&#36;&#36;&#36;</span>\n          </ion-label>\n          <ion-radio value="3"></ion-radio>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{ \'SWITCHERS\' | translate }}</ion-item-divider>\n    <form [formGroup]="switchersForm">\n      <ion-list class="switchers-list">\n        <ion-item class="switcher-item">\n          <ion-label>Notifications</ion-label>\n          <ion-toggle formControlName="notifications"></ion-toggle>\n        </ion-item>\n        <ion-item class="switcher-item">\n          <ion-label>Email notifications</ion-label>\n          <ion-toggle formControlName="email_notifications"></ion-toggle>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{ \'ADD_&_SUBTRACT\' | translate }}</ion-item-divider>\n    <form [formGroup]="counterForm">\n      <ion-list class="counter-list">\n        <ion-item class="counter-item">\n          <span class="counter-label">Amount</span>\n          <counter-input formControlName="counter"></counter-input>\n        </ion-item>\n        <ion-item class="counter-item">\n          <span class="counter-label">Bedrooms</span>\n          <span class="counter-value">{{counterForm.controls.counter2.value}}</span>\n          <counter-input formControlName="counter2" basic></counter-input>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{ \'RATING\' | translate }}</ion-item-divider>\n    <form [formGroup]="ratingForm">\n      <ion-list class="ratings-list">\n        <ion-item class="rating-item">\n          <span class="rating-label">Minimum</span>\n          <rating formControlName="rate" max="5"></rating>\n        </ion-item>\n        <ion-item class="rating-item">\n          <span class="rating-label">Read Only</span>\n          <rating formControlName="rate2" max="3" read-only="true"></rating>\n        </ion-item>\n      </ion-list>\n    </form>\n\n    <ion-item-divider>{{ \'COLOR\' | translate }}</ion-item-divider>\n    <form [formGroup]="radioColorForm">\n      <ion-list class="radio-tags color-tags" radio-group formControlName="selected_color">\n        <ion-item class="radio-tag" color-radio="#fc6161">\n          <ion-label>Red</ion-label>\n          <ion-radio value="#fc6161"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag" color-radio="#fc9961">\n          <ion-radio value="#fc9961"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag" color-radio="#fcea61">\n          <ion-label>Yellow</ion-label>\n          <ion-radio value="#fcea61" disabled="true"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag" color-radio="#affc61">\n          <ion-label>Green</ion-label>\n          <ion-radio value="#affc61"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag" color-radio="#61fcc5">\n          <ion-radio value="#61fcc5"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag" color-radio="#fc61ad">\n          <ion-radio value="#fc61ad"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag" color-radio="#b561fc">\n          <ion-radio value="#b561fc"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag" color-radio="#6182fc">\n          <ion-radio value="#6182fc"></ion-radio>\n        </ion-item>\n        <ion-item class="radio-tag" color-radio="#61d1fc">\n          <ion-radio value="#61d1fc"></ion-radio>\n        </ion-item>\n      </ion-list>\n    </form>\n  </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\_filters\filters.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], FiltersPage);
    return FiltersPage;
}());

//# sourceMappingURL=filters.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormValidationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_validators_username_validator__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_validators_password_validator__ = __webpack_require__(810);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_validators_phone_validator__ = __webpack_require__(811);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__form_validations_model__ = __webpack_require__(812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_text_mask_addons_dist_emailMask__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_text_mask_addons_dist_emailMask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_text_mask_addons_dist_emailMask__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FormValidationsPage = (function () {
    function FormValidationsPage(navCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.emailMask = __WEBPACK_IMPORTED_MODULE_7_text_mask_addons_dist_emailMask___default.a;
        this.validation_messages = {
            'username': [
                { type: 'required', message: 'Username is required.' },
                { type: 'minlength', message: 'Username must be at least 5 characters long.' },
                { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
                { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
                { type: 'validUsername', message: 'Your username has already been taken.' }
            ],
            'name': [
                { type: 'required', message: 'Name is required.' }
            ],
            'lastname': [
                { type: 'required', message: 'Last name is required.' }
            ],
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Enter a valid email.' }
            ],
            'phone': [
                { type: 'required', message: 'Phone is required.' },
                { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' },
                { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Confirm password is required' }
            ],
            'matching_passwords': [
                { type: 'areEqual', message: 'Password mismatch' }
            ],
            'terms': [
                { type: 'pattern', message: 'You must accept terms and conditions.' }
            ],
        };
    }
    FormValidationsPage.prototype.ionViewWillLoad = function () {
        this.countries = [
            new __WEBPACK_IMPORTED_MODULE_6__form_validations_model__["a" /* Country */]('UY', 'Uruguay'),
            new __WEBPACK_IMPORTED_MODULE_6__form_validations_model__["a" /* Country */]('US', 'United States'),
            new __WEBPACK_IMPORTED_MODULE_6__form_validations_model__["a" /* Country */]('AR', 'Argentina')
        ];
        this.genders = [
            "Male",
            "Female"
        ];
        this.matching_passwords_group = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(5),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ])),
            confirm_password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required)
        }, function (formGroup) {
            return __WEBPACK_IMPORTED_MODULE_4__components_validators_password_validator__["a" /* PasswordValidator */].areEqual(formGroup);
        });
        var country = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](this.countries[0], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required);
        var phone = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_5__components_validators_phone_validator__["a" /* PhoneValidator */].validCountryPhone(country)
        ]));
        this.country_phone_group = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            country: country,
            phone: phone
        });
        this.validations_form = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([
                __WEBPACK_IMPORTED_MODULE_3__components_validators_username_validator__["a" /* UsernameValidator */].validUsername,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(25),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(5),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
            ])),
            name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            lastname: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            gender: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](this.genders[0], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required),
            country_phone: this.country_phone_group,
            matching_passwords: this.matching_passwords_group,
            terms: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](true, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern('true'))
        });
    };
    FormValidationsPage.prototype.onSubmit = function (values) {
        console.log(values);
    };
    FormValidationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'form-validations-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\_form-validations\form-validations.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'FORM_VALIDATIONS\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="forms-validations-content">\n  <form class="sample-form validations-form" [formGroup]="validations_form"  (ngSubmit)="onSubmit(validations_form.value)">\n    <section class="form-section">\n      <h2 class="section-title">{{\'BASIC_VALIDATIONS\' | translate}}</h2>\n      <ion-item>\n        <ion-label floating>{{\'USERNAME\' | translate}}</ion-label>\n        <ion-input type="text" formControlName="username" class="form-controll" required></ion-input>\n      </ion-item>\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.username">\n          <div class="error-message" *ngIf="validations_form.get(\'username\').hasError(validation.type) && (validations_form.get(\'username\').dirty || validations_form.get(\'username\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n\n      <ion-item>\n        <ion-label floating>{{\'NAME\' | translate}}</ion-label>\n        <ion-input type="text" formControlName="name"></ion-input>\n      </ion-item>\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.name">\n          <div class="error-message" *ngIf="validations_form.get(\'name\').hasError(validation.type) && (validations_form.get(\'name\').dirty || validations_form.get(\'name\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n\n      <ion-item>\n        <ion-label floating>{{\'LAST_NAME\' | translate}}</ion-label>\n        <ion-input type="text" formControlName="lastname"></ion-input>\n      </ion-item>\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.lastname">\n          <div class="error-message" *ngIf="validations_form.get(\'lastname\').hasError(validation.type) && (validations_form.get(\'lastname\').dirty || validations_form.get(\'lastname\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n\n      <ion-item>\n        <ion-label floating>{{\'EMAIL\' | translate}}</ion-label>\n        <ion-input [textMask]="emailMask" type="text" formControlName="email"></ion-input>\n      </ion-item>\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.email">\n          <div class="error-message" *ngIf="validations_form.get(\'email\').hasError(validation.type) && (validations_form.get(\'email\').dirty || validations_form.get(\'email\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n\n      <ion-item>\n        <ion-label floating>{{\'GENDER\' | translate}}</ion-label>\n        <ion-select formControlName="gender" cancelText="{{ \'CANCEL\' | translate }}" okText="{{ \'OK\' | translate }}">\n          <ion-option *ngFor="let gender of genders" [value]="gender" >{{ gender }}</ion-option>\n        </ion-select>\n      </ion-item>\n    </section>\n\n    <section class="form-section">\n      <h2 class="section-title">{{\'PHONE_VALIDATIONS\' | translate}}</h2>\n      <div formGroupName="country_phone">\n        <ion-item>\n          <ion-label floating>{{\'COUNTRY\' | translate}}</ion-label>\n          <ion-select formControlName="country" cancelText="{{ \'CANCEL\' | translate }}" okText="{{ \'OK\' | translate }}">\n            <ion-option *ngFor="let item of countries" [value]="item" >{{item.name}}</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-input [textMask]="{mask: validations_form.value.country_phone.country.phone_mask}" placeholder="{{ validations_form.value.country_phone.country.sample_phone }}" type="text" formControlName="phone"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.phone">\n            <div class="error-message" *ngIf="validations_form.get(\'country_phone\').get(\'phone\').hasError(validation.type) && (validations_form.get(\'country_phone\').get(\'phone\').dirty || validations_form.get(\'country_phone\').get(\'phone\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n      </div>\n    </section>\n\n    <section class="form-section">\n      <h2 class="section-title">{{\'PASSWORD_VALIDATIONS\' | translate}}</h2>\n      <div formGroupName="matching_passwords">\n        <ion-item>\n          <ion-label floating>{{\'PASSWORD\' | translate}}</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.password">\n            <div class="error-message" *ngIf="validations_form.get(\'matching_passwords\').get(\'password\').hasError(validation.type) && (validations_form.get(\'matching_passwords\').get(\'password\').dirty || validations_form.get(\'matching_passwords\').get(\'password\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n\n        <ion-item>\n          <ion-label floating>{{\'CONFIRM_PASSWORD\' | translate}}</ion-label>\n          <ion-input type="password" formControlName="confirm_password"></ion-input>\n        </ion-item>\n        <div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.confirm_password">\n            <div class="error-message" *ngIf="validations_form.get(\'matching_passwords\').get(\'confirm_password\').hasError(validation.type) && (validations_form.get(\'matching_passwords\').get(\'confirm_password\').dirty || validations_form.get(\'matching_passwords\').get(\'confirm_password\').touched)">\n              {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>\n      </div>\n      <!-- These validations are for the form group -->\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.matching_passwords">\n          <div class="error-message" *ngIf="validations_form.get(\'matching_passwords\').hasError(validation.type) && (validations_form.get(\'matching_passwords\').get(\'confirm_password\').dirty || validations_form.get(\'matching_passwords\').get(\'confirm_password\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n    </section>\n\n    <section class="form-section">\n      <h2 class="section-title">{{\'ACCEPT_TERMS_VALIDATIONS\' | translate}}</h2>\n      <ion-item class="terms-item">\n        <ion-label>I accept terms and conditions</ion-label>\n        <ion-checkbox formControlName="terms"></ion-checkbox>\n      </ion-item>\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.terms">\n          <div class="error-message" *ngIf="validations_form.get(\'terms\').hasError(validation.type) && (validations_form.get(\'terms\').dirty || validations_form.get(\'terms\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n    </section>\n\n    <button ion-button full type="submit" [disabled]="!validations_form.valid">{{\'SUBMIT\' | translate}}</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\_form-validations\form-validations.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]])
    ], FormValidationsPage);
    return FormValidationsPage;
}());

//# sourceMappingURL=form-validations.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ScheduleService = (function () {
    function ScheduleService(http) {
        this.http = http;
    }
    ScheduleService.prototype.getData = function () {
        return this.http.get('./assets/example_data/schedule.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ScheduleService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ScheduleService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], ScheduleService);
    return ScheduleService;
}());

//# sourceMappingURL=schedule.service.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List2Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var List2Service = (function () {
    function List2Service(http) {
        this.http = http;
    }
    List2Service.prototype.getData = function () {
        return this.http.get('./assets/example_data/lists.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    List2Service.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    List2Service = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], List2Service);
    return List2Service;
}());

//# sourceMappingURL=list-2.service.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FunctionalitiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maps_maps__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__facebook_login_facebook_login__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__google_login_google_login__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__twitter_login_twitter_login__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contact_card_contact_card__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ads_ads__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__video_playlist_video_playlist__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var FunctionalitiesPage = (function () {
    function FunctionalitiesPage(nav, translate) {
        this.nav = nav;
        this.translate = translate;
    }
    FunctionalitiesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_9_rxjs_Observable__["Observable"].forkJoin(this.translate.get('FACEBOOK_INTEGRATION'), this.translate.get('GOOGLE_INTEGRATION'), this.translate.get('TWITTER_INTEGRATION'), this.translate.get('CONTACT_CARD'), this.translate.get('MAPS'), this.translate.get('VIDEO_PLAYLIST'), this.translate.get('ADS')).subscribe(function (data) {
            _this.items = [
                { title: data[0], component: __WEBPACK_IMPORTED_MODULE_3__facebook_login_facebook_login__["a" /* FacebookLoginPage */] },
                { title: data[1], component: __WEBPACK_IMPORTED_MODULE_4__google_login_google_login__["a" /* GoogleLoginPage */] },
                { title: data[2], component: __WEBPACK_IMPORTED_MODULE_5__twitter_login_twitter_login__["a" /* TwitterLoginPage */] },
                { title: data[3], component: __WEBPACK_IMPORTED_MODULE_6__contact_card_contact_card__["a" /* ContactCardPage */] },
                { title: data[4], component: __WEBPACK_IMPORTED_MODULE_2__maps_maps__["a" /* MapsPage */] },
                { title: data[5], component: __WEBPACK_IMPORTED_MODULE_8__video_playlist_video_playlist__["a" /* VideoPlaylistPage */] },
                { title: data[6], component: __WEBPACK_IMPORTED_MODULE_7__ads_ads__["a" /* AdsPage */] }
            ];
        });
    };
    FunctionalitiesPage.prototype.itemTapped = function (event, item) {
        this.nav.push(item.component);
    };
    FunctionalitiesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'functionalities-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\functionalities\functionalities.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>News</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="functionalities-content">\n  <ion-list class="functionalities-list">\n    <button class="list-item" ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-row no-padding>\n        <ion-col no-padding class="item-content">\n          <h3 class="item-title">{{item.title}}</h3>\n          <span class="item-note" *ngIf="item.note">{{item.note}}</span>\n        </ion-col>\n        <ion-col no-padding width-10 class="item-icon">\n          <ion-icon name="arrow-forward"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\functionalities\functionalities.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */]])
    ], FunctionalitiesPage);
    return FunctionalitiesPage;
}());

//# sourceMappingURL=functionalities.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_google_map_google_map__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__maps_service__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__maps_model__ = __webpack_require__(817);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MapsPage = (function () {
    function MapsPage(nav, loadingCtrl, toastCtrl, GoogleMapsService, geolocation, keyboard) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.GoogleMapsService = GoogleMapsService;
        this.geolocation = geolocation;
        this.keyboard = keyboard;
        this.map_model = new __WEBPACK_IMPORTED_MODULE_7__maps_model__["a" /* MapsModel */]();
    }
    MapsPage.prototype.ngOnInit = function () {
        var _this = this;
        var _loading = this.loadingCtrl.create();
        _loading.present();
        this._GoogleMap.$mapReady.subscribe(function (map) {
            _this.map_model.init(map);
            _loading.dismiss();
        });
    };
    MapsPage.prototype.searchPlacesPredictions = function (query) {
        var env = this;
        if (query !== "") {
            env.GoogleMapsService.getPlacePredictions(query).subscribe(function (places_predictions) {
                env.map_model.search_places_predictions = places_predictions;
            }, function (e) {
                console.log('onError: %s', e);
            }, function () {
                console.log('onCompleted');
            });
        }
        else {
            env.map_model.search_places_predictions = [];
        }
    };
    MapsPage.prototype.setOrigin = function (location) {
        var env = this;
        // Clean map
        env.map_model.cleanMap();
        // Set the origin for later directions
        env.map_model.directions_origin.location = location;
        env.map_model.addPlaceToMap(location, '#00e9d5');
        // With this result we should find restaurants (*places) arround this location and then show them in the map
        // Now we are able to search *restaurants near this location
        env.GoogleMapsService.getPlacesNearby(location).subscribe(function (nearby_places) {
            // Create a location bound to center the map based on the results
            var bound = new google.maps.LatLngBounds();
            for (var i = 0; i < nearby_places.length; i++) {
                bound.extend(nearby_places[i].geometry.location);
                env.map_model.addNearbyPlace(nearby_places[i]);
            }
            // Select first place to give a hint to the user about how this works
            env.choosePlace(env.map_model.nearby_places[0]);
            // To fit map with places
            env.map_model.map.fitBounds(bound);
        }, function (e) {
            console.log('onError: %s', e);
        }, function () {
            console.log('onCompleted');
        });
    };
    MapsPage.prototype.selectSearchResult = function (place) {
        var env = this;
        env.map_model.search_query = place.description;
        env.map_model.search_places_predictions = [];
        // We need to get the location from this place. Let's geocode this place!
        env.GoogleMapsService.geocodePlace(place.place_id).subscribe(function (place_location) {
            env.setOrigin(place_location);
        }, function (e) {
            console.log('onError: %s', e);
        }, function () {
            console.log('onCompleted');
        });
    };
    MapsPage.prototype.clearSearch = function () {
        var env = this;
        this.keyboard.close();
        // Clean map
        env.map_model.cleanMap();
    };
    MapsPage.prototype.geolocateMe = function () {
        var env = this, _loading = env.loadingCtrl.create();
        _loading.present();
        this.geolocation.getCurrentPosition().then(function (position) {
            var current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            env.map_model.search_query = position.coords.latitude.toFixed(2) + ", " + position.coords.longitude.toFixed(2);
            env.setOrigin(current_location);
            env.map_model.using_geolocation = true;
            _loading.dismiss();
        }).catch(function (error) {
            console.log('Error getting location', error);
            _loading.dismiss();
        });
    };
    MapsPage.prototype.choosePlace = function (place) {
        var _this = this;
        var env = this;
        // Check if the place is not already selected
        if (!place.selected) {
            // De-select previous places
            env.map_model.deselectPlaces();
            // Select current place
            place.select();
            // Get both route directions and distance between the two locations
            var directions_observable = env.GoogleMapsService
                .getDirections(env.map_model.directions_origin.location, place.location), distance_observable = env.GoogleMapsService
                .getDistanceMatrix(env.map_model.directions_origin.location, place.location);
            __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].forkJoin(directions_observable, distance_observable).subscribe(function (data) {
                var directions = data[0], distance = data[1].rows[0].elements[0].distance.text, duration = data[1].rows[0].elements[0].duration.text;
                env.map_model.directions_display.setDirections(directions);
                if (env.toast) {
                    env.toast.dismiss();
                }
                env.toast = _this.toastCtrl.create({
                    message: 'That\'s ' + distance + ' away and will take ' + duration,
                    duration: 2000
                });
                env.toast.present();
            }, function (e) {
                console.log('onError: %s', e);
            }, function () {
                console.log('onCompleted');
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_5__components_google_map_google_map__["a" /* GoogleMap */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__components_google_map_google_map__["a" /* GoogleMap */])
    ], MapsPage.prototype, "_GoogleMap", void 0);
    MapsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'maps-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\maps\maps.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'GOOGLE_MAPS\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-row no-padding class="map-row">\n    <ion-col no-padding class="map-col">\n      <div class="search-container">\n        <!-- <ion-toolbar class="search-toolbar transparent-background"> -->\n        <ion-toolbar class="search-toolbar">\n          <ion-buttons start>\n            <button ion-button icon-only (click)="geolocateMe()" class="geolocation-button" [ngClass]="{\'using-geolocation\': map_model.using_geolocation}">\n              <ion-icon name="locate"></ion-icon>\n            </button>\n          </ion-buttons>\n          <ion-searchbar class="search-places-bar" placeholder="Search places near location" [(ngModel)]="map_model.search_query" (ionInput)="searchPlacesPredictions(map_model.search_query)" (ionClear)="clearSearch()"></ion-searchbar>\n        </ion-toolbar>\n        <ion-list [hidden]="map_model.search_places_predictions.length == 0" class="search-options-list">\n          <ion-item *ngFor="let place of map_model.search_places_predictions" tappable (click)="selectSearchResult(place)">\n            {{ place.description }}\n          </ion-item>\n        </ion-list>\n      </div>\n      <div class="map-container">\n        <google-map [options]="map_model.map_options"></google-map>\n      </div>\n      <ion-scroll [hidden]="map_model.nearby_places.length == 0" scrollX="true" class="nearby-places-container">\n        <ion-row class="nearby-places-row">\n          <ion-col width-64 class="place-item-outer" *ngFor="let place of map_model.nearby_places" [ngClass]="{\'selected-place\': place.selected}" (click)="choosePlace(place)">\n            <ion-card class="place-card">\n              <background-image class="place-image-heading" [src]="place.details.image">\n                <ion-row class="heading-row">\n                  <ion-col no-padding width-100>\n                    <h2 class="place-title">{{ place.details.name }}</h2>\n                  </ion-col>\n                </ion-row>\n              </background-image>\n              <div class="place-details-container">\n                <ion-row class="details-row">\n                  <ion-col no-padding width-50>\n                    <span class="opening-hours" [ngClass]="{\'opened\': (place.details && place.details.opening_hours && place.details.opening_hours.open_now), \'closed\': !(place.details && place.details.opening_hours && place.details.opening_hours.open_now)}">\n                      {{ (place.details && place.details.opening_hours && place.details.opening_hours.open_now) ? \'OPENED\' : \'CLOSED\' }}\n                    </span>\n                  </ion-col>\n                  <ion-col no-padding width-50>\n                    <div class="place-rating">\n                      <ion-item class="rating-item">\n                        <rating [(ngModel)]="place.details.rating" max="5" read-only="true"></rating>\n                      </ion-item>\n                    </div>\n                  </ion-col>\n                </ion-row>\n                <ion-list class="details-list" no-lines>\n                  <ion-item class="place-location">\n                    <ion-avatar item-left>\n                      <ion-icon name="pin"></ion-icon>\n                    </ion-avatar>\n                    <span class="location-text">{{ place.details.vicinity }}</span>\n                  </ion-item>\n                </ion-list>\n              </div>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-scroll>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\maps\maps.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_6__maps_service__["a" /* GoogleMapsService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__["a" /* Keyboard */]])
    ], MapsPage);
    return MapsPage;
}());

//# sourceMappingURL=maps.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment_environment__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_forkJoin__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_forkJoin__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var WordpressService = (function () {
    function WordpressService(http, nativeStorage) {
        this.http = http;
        this.nativeStorage = nativeStorage;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDc0ODEyODUsIm5iZiI6MTU0NzQ4MTI4NSwiZXhwIjoxNTQ4MDg2MDg1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.XozAbXubbYDEP5FDmzQGN03Hw-xMU5AGFU9P-yfvexc'
        });
    }
    WordpressService.prototype.getRecentPosts = function (categoryId, page) {
        if (page === void 0) { page = 1; }
        //if we want to query posts by category
        var category_url = categoryId ? ("&categories=" + categoryId) : "";
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url
            + 'posts?_embed&orderby=modified&page=' + page
            + category_url, { headers: this.headers })
            .map(function (res) { return res; });
    };
    WordpressService.prototype.updatePost = function (post) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url
            + 'posts/' + post.id, post, { headers: this.headers });
    };
    WordpressService.prototype.getCustomPages = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url + 'pages', { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getCustomPage = function (pageId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url + 'pages/' + pageId, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getCategories = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDc0ODEyODUsIm5iZiI6MTU0NzQ4MTI4NSwiZXhwIjoxNTQ4MDg2MDg1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.XozAbXubbYDEP5FDmzQGN03Hw-xMU5AGFU9P-yfvexc'
        });
        console.log(headers);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url + 'categories', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getComments = function (postId, page) {
        if (page === void 0) { page = 1; }
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url
            + "comments?post=" + postId
            + '&page=' + page, { headers: this.headers })
            .map(function (res) { return res; });
    };
    WordpressService.prototype.getAuthor = function (author) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url + "users/" + author, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getPostCategories = function (post) {
        var _this = this;
        var observableBatch = [];
        post.categories.forEach(function (category) {
            observableBatch.push(_this.getCategory(category));
        });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].forkJoin(observableBatch);
    };
    WordpressService.prototype.getCategory = function (category) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url + "categories/" + category, { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.createComment = function (postId, user, comment) {
        var _this = this;
        var username = 'guestaccount1';
        var password = '8eCo6%cOn6y0jPgwVolSMdHc';
        this.doPostLogin(username, password).subscribe(function (data) {
            console.log(JSON.parse(data._body).token, "wpis");
            var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            header.append('Authorization', 'Bearer ' + JSON.parse(data._body).token);
            _this.http.post(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url + "comments?token=" + JSON.parse(data._body).token, {
                author_name: user.displayname,
                author_email: user.email,
                post: postId,
                content: comment
            }, { headers: JSON.parse(data._body).headers })
                .subscribe(function (res) {
                res.json();
                console.log(res, "response");
            }, function (error) {
                console.log(error);
            });
        });
    };
    WordpressService.prototype.getUser = function () {
        return this.nativeStorage.getItem('ion2fullapp_wordpress_user');
    };
    WordpressService.prototype.setUser = function (user) {
        return this.nativeStorage.setItem('ion2fullapp_wordpress_user', user);
    };
    WordpressService.prototype.logOut = function () {
        return this.nativeStorage.remove('ion2fullapp_wordpress_user');
    };
    WordpressService.prototype.doLogin = function (username, password) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_url + '/wp-json/jwt-auth/v1/token?username=' + username + '&password=' + password, {}, { headers: header });
    };
    WordpressService.prototype.validateAuthToken = function (token) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append('Authorization', 'Basic ' + token);
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_url + 'wp-json/jwt-auth/v1/token/validate?token=' + token, {}, { headers: header });
    };
    WordpressService.prototype.doPostLogin = function (username, password) {
        var data = {
            username: username,
            password: password
        };
        console.log(data);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.set('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].jwt_url, data, { headers: headers });
    };
    WordpressService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */]])
    ], WordpressService);
    return WordpressService;
}());

//# sourceMappingURL=wordpress-integration.service.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoogleMap = (function () {
    function GoogleMap(_elementRef) {
        this._elementRef = _elementRef;
        this._mapOptions = {
            zoom: 15
        };
        this.$mapReady = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._mapIdledOnce = false;
    }
    Object.defineProperty(GoogleMap.prototype, "options", {
        set: function (val) {
            if (Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(val)) {
                this._mapOptions = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    GoogleMap.prototype.ngOnInit = function () {
        this.initMap();
    };
    GoogleMap.prototype.initMap = function () {
        var _this = this;
        this._el = this._elementRef.nativeElement;
        this._map = new google.maps.Map(this._el, this._mapOptions);
        // Workarround for init method: try to catch the first idel event after the map cretion (this._mapIdledOnce). The following idle events don't matter.
        var _ready_listener = this._map.addListener('idle', function () {
            console.log("mapReady - IDLE");
            if (!_this._mapIdledOnce) {
                _this.$mapReady.emit(_this._map);
                _this._mapIdledOnce = true;
                // Stop listening to event, the map is ready
                google.maps.event.removeListener(_ready_listener);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], GoogleMap.prototype, "options", null);
    GoogleMap = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'google-map',
            template: ''
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], GoogleMap);
    return GoogleMap;
}());

//# sourceMappingURL=google-map.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoogleMapsService = (function () {
    // There are some issues with async observers (https://gist.github.com/endash/1f961830d0c5b744598a)
    //    - That's why we need to use ngZones
    // Here's another post explaining the issue (http://stackoverflow.com/a/38100262/1116959)
    //    - Seems that google.maps API is not patched by Angular's zone
    function GoogleMapsService(zone) {
        this.zone = zone;
        this._AutocompleteService = new google.maps.places.AutocompleteService();
        this._Geocoder = new google.maps.Geocoder;
        // As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
        this._PlacesService = new google.maps.places.PlacesService(document.createElement("div"));
        this._DirectionsService = new google.maps.DirectionsService;
        this._DistanceMatrixService = new google.maps.DistanceMatrixService;
    }
    // Caveat:  As we are using Observable.create don't forget a well-formed finite Observable must attempt to call
    //          either the observer’s onCompleted method exactly once or its onError method exactly once, and must not
    //          thereafter attempt to call any of the observer’s other methods.
    //    - http://reactivex.io/documentation/operators/create.html
    //    - http://stackoverflow.com/a/38376519/1116959
    // https://developers.google.com/maps/documentation/javascript/reference#AutocompletePrediction
    GoogleMapsService.prototype.getPlacePredictions = function (query) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._AutocompleteService.getPlacePredictions({ input: query }, function (places_predictions, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    _this.zone.run(function () {
                        observer.next([]);
                        observer.complete();
                    });
                }
                else {
                    _this.zone.run(function () {
                        observer.next(places_predictions);
                        observer.complete();
                    });
                }
            });
        });
    };
    GoogleMapsService.prototype.geocodePlace = function (placeId) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._Geocoder.geocode({ 'placeId': placeId }, function (results, status) {
                if (status.toString() === 'OK') {
                    if (results[0]) {
                        _this.zone.run(function () {
                            observer.next(results[0].geometry.location);
                            observer.complete();
                        });
                    }
                    else {
                        _this.zone.run(function () {
                            observer.error(new Error("no results"));
                        });
                    }
                }
                else {
                    _this.zone.run(function () {
                        observer.error(new Error("error"));
                    });
                }
            });
        });
    };
    // https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
    GoogleMapsService.prototype.getPlacesNearby = function (location) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._PlacesService.nearbySearch({
                location: location,
                radius: 500,
                types: ['restaurant']
            }, function (results, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    _this.zone.run(function () {
                        observer.next([]);
                        observer.complete();
                    });
                }
                else {
                    _this.zone.run(function () {
                        observer.next(results);
                        observer.complete();
                    });
                }
            });
        });
    };
    // https://developers.google.com/maps/documentation/javascript/reference#DirectionsResult
    GoogleMapsService.prototype.getDirections = function (origin, destination) {
        var _this = this;
        var _origin = {
            location: origin
        }, _destination = {
            location: destination
        }, route_query = {
            origin: _origin,
            destination: _destination,
            travelMode: google.maps.TravelMode.WALKING
        };
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._DirectionsService.route(route_query, function (route, status) {
                if (status.toString() === 'OK') {
                    _this.zone.run(function () {
                        // Yield a single value and complete
                        observer.next(route);
                        observer.complete();
                    });
                }
                else {
                    _this.zone.run(function () {
                        observer.error(new Error("error due to " + status));
                    });
                }
            });
        });
    };
    GoogleMapsService.prototype.getDistanceMatrix = function (origin, destination) {
        var _this = this;
        var _origin = {
            location: origin
        }, _destination = {
            location: destination
        }, distance_query = {
            origins: [_origin],
            destinations: [_destination],
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._DistanceMatrixService.getDistanceMatrix(distance_query, function (distance, status) {
                if (status.toString() === 'OK') {
                    _this.zone.run(function () {
                        // Yield a single value and complete
                        observer.next(distance);
                        observer.complete();
                    });
                }
                else {
                    _this.zone.run(function () {
                        observer.error(new Error("error due to " + status));
                    });
                }
            });
        });
    };
    GoogleMapsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], GoogleMapsService);
    return GoogleMapsService;
}());

//# sourceMappingURL=maps.service.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facebook_user_model__ = __webpack_require__(818);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__facebook_login_service__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FacebookLoginPage = (function () {
    function FacebookLoginPage(nav, facebookLoginService, loadingCtrl) {
        this.nav = nav;
        this.facebookLoginService = facebookLoginService;
        this.loadingCtrl = loadingCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__facebook_user_model__["a" /* FacebookUserModel */]();
        this.loading = this.loadingCtrl.create();
    }
    FacebookLoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loading.present();
        this.facebookLoginService.getFacebookUser()
            .then(function (user) {
            _this.user = user;
            _this.loading.dismiss();
        }, function (error) {
            console.log(error);
            _this.loading.dismiss();
        });
    };
    FacebookLoginPage.prototype.doFacebookLogout = function () {
        var _this = this;
        this.facebookLoginService.doFacebookLogout()
            .then(function (res) {
            _this.user = new __WEBPACK_IMPORTED_MODULE_2__facebook_user_model__["a" /* FacebookUserModel */]();
        }, function (error) {
            console.log("Facebook logout error", error);
        });
    };
    FacebookLoginPage.prototype.doFacebookLogin = function () {
        var _this = this;
        this.facebookLoginService.doFacebookLogin()
            .then(function (user) {
            _this.user = user;
        }, function (err) {
            console.log("Facebook Login error", err);
        });
    };
    FacebookLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'facebook-login-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\facebook-login\facebook-login.html"*/'<ion-header class="facebook-header">\n  <ion-navbar>\n    <ion-title>{{\'FACEBOOK\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="facebook-integration-content" [ngClass]="{connected: user.userId}">\n  <div *ngIf="!user.userId">\n    <h1 class="no-connection-message">{{\'NOT_LOGGED_FACEBOOK\' | translate}}</h1>\n    <ion-row *ngIf="!user.userId" class="actions-row facebook-connect-row">\n      <ion-col no-padding width-100>\n        <button ion-button block class="auth-action-button facebook-auth-button" (click)="doFacebookLogin()">{{\'CONNECT_WITH_FACEBOOK\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <ion-card class="facebook-card" *ngIf="user.userId">\n    <background-image class="user-image-heading" [src]="user.image">\n      <ion-row class="heading-row">\n        <ion-col no-padding width-72 class="user-details-col">\n          <h2 class="user-name">{{user.name}}</h2>\n        </ion-col>\n        <ion-col no-padding width-28 class="user-details-col">\n          <ion-icon *ngIf="(user.gender | lowercase) == \'female\'" class="user-gender-icon" name="female"></ion-icon>\n          <ion-icon *ngIf="(user.gender | lowercase) == \'male\'" class="user-gender-icon" name="male"></ion-icon>\n          <span class="user-gender">{{user.gender}}</span>\n        </ion-col>\n      </ion-row>\n    </background-image>\n    <h3 class="divider-heading">{{ \'FRIENDS\' | translate }}</h3>\n    <ion-row class="friends-row">\n      <ion-col no-padding class="friend-col" *ngFor="let friend_image of user.friends">\n        <preload-image class="rounded-image" [ratio]="{w:1, h:1}" [src]="friend_image" alt="facebook friend" title="facebook friend"></preload-image>\n      </ion-col>\n      <ion-col no-padding class="friend-col">\n        <h3 class="more-friends">22</h3>\n      </ion-col>\n    </ion-row>\n    <h3 class="divider-heading">{{\'PHOTOS\' | translate }}</h3>\n    <ion-row class="photos-row" wrap>\n      <ion-col no-padding width-25 class="photo-col" *ngFor="let photo of user.photos; let i = index">\n        <preload-image [ratio]="{w:1, h:1}" [src]="photo" alt="facebook photo" title="facebook photo"></preload-image>\n        <div *ngIf="i == (user.photos.length -1)" class="has-more-images">\n          <h3 class="images-count">107</h3>\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-row class="actions-row">\n      <ion-col no-padding width-100>\n        <button ion-button block class="auth-action-button logout-button" (click)="doFacebookLogout()">{{ \'LOG_OUT\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\facebook-login\facebook-login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_3__facebook_login_service__["a" /* FacebookLoginService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], FacebookLoginPage);
    return FacebookLoginPage;
}());

//# sourceMappingURL=facebook-login.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_user_model__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__google_login_service__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GoogleLoginPage = (function () {
    function GoogleLoginPage(navCtrl, googleLoginService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.googleLoginService = googleLoginService;
        this.loadingCtrl = loadingCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__google_user_model__["a" /* GoogleUserModel */]();
        this.loading = this.loadingCtrl.create();
    }
    GoogleLoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loading.present();
        this.googleLoginService.getGoogleUser()
            .then(function (user) {
            _this.user = user;
            _this.loading.dismiss();
        }, function (error) {
            console.log(error);
            _this.loading.dismiss();
        });
    };
    GoogleLoginPage.prototype.doGoogleLogout = function () {
        var _this = this;
        this.googleLoginService.doGoogleLogout()
            .then(function (res) {
            _this.user = new __WEBPACK_IMPORTED_MODULE_2__google_user_model__["a" /* GoogleUserModel */]();
        }, function (error) {
            console.log("Google logout error", error);
        });
    };
    GoogleLoginPage.prototype.doGoogleLogin = function () {
        var _this = this;
        this.googleLoginService.doGoogleLogin()
            .then(function (user) {
            _this.user = user;
        }, function (err) {
            console.log("Google Login error", err);
        });
    };
    GoogleLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'google-login-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\google-login\google-login.html"*/'<ion-header class="google-header">\n  <ion-navbar>\n    <ion-title>Google</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="google-integration-content">\n\n  <div *ngIf="!user.userId">\n    <h1 class="no-connection-message">{{ \'NOT_LOGGED_GOOGLE\' | translate }}</h1>\n    <ion-row class="actions-row google-connect-row">\n      <ion-col no-padding width-100>\n        <button ion-button block class="auth-action-button google-auth-button" (click)="doGoogleLogin()">{{ \'CONNECT_WITH_GOOGLE\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <div *ngIf="user.userId">\n    <background-image class="user-image-heading" [src]="user.image"></background-image>\n    <ion-row class="contact-details-row" wrap>\n      <ion-col no-padding width-100>\n        <h2 class="contact-name">{{user.name}}</h2>\n      </ion-col>\n      <ion-col no-padding width-100>\n        <p class="contact-description">\n          {{user.email}}\n        </p>\n      </ion-col>\n    </ion-row>\n    <h3 class="divider-heading">{{\'FRIENDS\' | translate}}</h3>\n    <ion-row class="friends-row">\n      <ion-col no-padding class="friend-col" *ngFor="let friend_image of user.friends">\n        <preload-image class="rounded-image" [ratio]="{w:1, h:1}" [src]="friend_image" alt="google friend" title="google friend"></preload-image>\n        <h4 class="friend-name">Tom</h4>\n      </ion-col>\n      <ion-col no-padding class="friend-col">\n        <div class="more-friends">\n          <h3 class="more-friends-text">22</h3>\n        </div>\n      </ion-col>\n    </ion-row>\n    <h3 class="divider-heading">{{\'PHOTOS\' | translate}}</h3>\n    <ion-scroll scrollX="true" class="horizontal-photos-scroll">\n      <ion-row class="photos-row">\n        <ion-col no-padding width-30 class="photo-col" *ngFor="let photo of user.photos; let i = index">\n          <preload-image [ratio]="{w:1, h:1}" [src]="photo" alt="google photo" title="google photo"></preload-image>\n          <div *ngIf="i == (user.photos.length -1)" class="has-more-images">\n            <h3 class="images-count">107</h3>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-scroll>\n    <ion-row class="actions-row">\n      <ion-col no-padding width-100>\n        <button ion-button block class="auth-action-button logout-button" (click)="doGoogleLogout()">{{ \'LOG_OUT\' | translate }}</button>\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\google-login\google-login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_3__google_login_service__["a" /* GoogleLoginService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], GoogleLoginPage);
    return GoogleLoginPage;
}());

//# sourceMappingURL=google-login.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__twitter_user_model__ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__twitter_login_service__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TwitterLoginPage = (function () {
    function TwitterLoginPage(navCtrl, twitterLoginService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.twitterLoginService = twitterLoginService;
        this.loadingCtrl = loadingCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__twitter_user_model__["a" /* TwitterUserModel */]();
        this.loading = this.loadingCtrl.create();
    }
    TwitterLoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loading.present();
        this.twitterLoginService.getTwitterUser()
            .then(function (user) {
            _this.user = user;
            _this.loading.dismiss();
        }, function (err) {
            console.log(err);
            _this.loading.dismiss();
        });
    };
    TwitterLoginPage.prototype.doTwitterLogout = function () {
        var _this = this;
        this.twitterLoginService.doTwitterLogout()
            .then(function (res) {
            _this.user = new __WEBPACK_IMPORTED_MODULE_2__twitter_user_model__["a" /* TwitterUserModel */]();
        }, function (err) {
            console.log("Twitter logout error", err);
        });
    };
    TwitterLoginPage.prototype.doTwitterLogin = function () {
        var _this = this;
        this.twitterLoginService.doTwitterLogin()
            .then(function (user) {
            _this.user = user;
        }, function (err) {
            console.log("Twitter Login error", err);
        });
    };
    TwitterLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'twitter-login-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\twitter-login\twitter-login.html"*/'<ion-header class="twitter-header">\n  <ion-navbar>\n    <ion-title>{{\'TWITTER\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="twitter-integration-content" [ngClass]="{connected: user.userId}">\n\n  <div *ngIf="!user.userId">\n    <h1 class="no-connection-message">{{\'NOT_LOGGED_TWITTER\' | translate}}</h1>\n    <ion-row class="actions-row twitter-connect-row">\n      <ion-col no-padding width-100>\n        <button ion-button block class="auth-action-button twitter-auth-button" (click)="doTwitterLogin()">{{\'CONNECT_WITH_TWITTER\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <div *ngIf="user.userId">\n    <ion-row class="main-user-data-row">\n      <ion-col no-padding width-100>\n        <preload-image class="twitter-user-image" [ratio]="{w:1, h:1}" [src]="user.image" alt="twitter user image" title="twitter user image"></preload-image>\n      </ion-col>\n      <ion-col class="social-connections-col" no-padding width-50>\n        <span class="connection-type">Followers</span>\n        <h2 class="connection-number">{{ user.followers }}</h2>\n      </ion-col>\n      <ion-col class="social-connections-col" no-padding width-50>\n        <span class="connection-type">Following</span>\n        <h2 class="connection-number">{{ user.following }}</h2>\n      </ion-col>\n    </ion-row>\n    <ion-row class="user-extended-data-row">\n      <ion-col no-padding width-100>\n        <h2 class="user-display-name">{{ user.name }}</h2>\n        <h3 class="user-username">@{{ user.screenName }}</h3>\n        <p class="user-description">{{ user.description }}</p>\n        <div class="user-location">\n          <ion-icon class="location-icon" name="ios-pin-outline"></ion-icon>\n          <span class="location-name">{{ user.location }}</span>\n        </div>\n      </ion-col>\n    </ion-row>\n    <ion-row class="actions-row">\n      <ion-col no-padding width-100>\n        <button ion-button block class="auth-action-button logout-button" (click)="doTwitterLogout()">{{\'LOG_OUT\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\twitter-login\twitter-login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_3__twitter_login_service__["a" /* TwitterLoginService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], TwitterLoginPage);
    return TwitterLoginPage;
}());

//# sourceMappingURL=twitter-login.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_model__ = __webpack_require__(821);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContactCardPage = (function () {
    function ContactCardPage(navCtrl, emailComposer, inAppBrowser) {
        this.navCtrl = navCtrl;
        this.emailComposer = emailComposer;
        this.inAppBrowser = inAppBrowser;
        this.contact = new __WEBPACK_IMPORTED_MODULE_4__contact_model__["a" /* ContactModel */]();
    }
    //Note: we commented this method because the Call Number plugin was unstable and causing lots of errors. If you want to use it please go: https://ionicframework.com/docs/native/call-number/
    // call(number: string){
    //   this.callNumber.callNumber(number, true)
    //   .then(() => console.log('Launched dialer!'))
    //   .catch(() => console.log('Error launching dialer'));
    // }
    ContactCardPage.prototype.sendMail = function () {
        //for more option please go here: http://ionicframework.com/docs/native/email-composer/
        var email = {
            to: 'contact@ionicthemes.com',
            subject: 'This app is the best!',
            body: "Hello, I'm trying this fantastic app that will save me hours of development"
        };
        // Send a text message using default options
        this.emailComposer.open(email);
    };
    ContactCardPage.prototype.openInAppBrowser = function (website) {
        this.inAppBrowser.create(website, '_blank', "location=yes");
    };
    ContactCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'contact-card-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\contact-card\contact-card.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'CONTACT_CARD\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="contact-card-content">\n  <ion-slides class="contact-slides" pager="true" autoplay="4000" loop="false">\n    <ion-slide class="contact-slide" *ngFor="let image of contact.images">\n      <background-image class="slide-image" [src]="image"></background-image>\n    </ion-slide>\n  </ion-slides>\n  <ion-row class="contact-details-row" wrap>\n    <ion-col no-padding width-65>\n      <h2 class="contact-name">{{ contact.name }}</h2>\n    </ion-col>\n    <ion-col no-padding width-35 class="rating-col">\n      <div class="contact-rating">\n        <ion-item class="rating-item">\n          <rating [(ngModel)]="contact.rating" max="5" read-only="true"></rating>\n        </ion-item>\n      </div>\n    </ion-col>\n    <ion-col no-padding width-100>\n      <p class="contact-description">\n        Today opens from 8:30 am to 6:00 pm\n      </p>\n    </ion-col>\n  </ion-row>\n  <div class="button-bar">\n    <!-- <button ion-button primary (click)="call(contact.phone)"> -->\n    <button ion-button primary>\n      <ion-icon name="call"></ion-icon>\n    </button>\n    <button ion-button primary (click)="sendMail(contact.email)">\n      <ion-icon name="mail"></ion-icon>\n    </button>\n    <button ion-button primary (click)="openInAppBrowser(contact.website)">\n      <ion-icon name="globe"></ion-icon>\n    </button>\n  </div>\n  <preload-image [ratio]="{w:4, h:3}" src="./assets/images/staticmap.png" alt="{{ contact.name }} location map" title="{{ contact.name }} - {{ contact.address }}"></preload-image>\n  <ion-list class="details-list">\n    <ion-item class="detail-item">\n      <ion-avatar item-left>\n        <ion-icon name="pin"></ion-icon>\n      </ion-avatar>\n      <span class="detail-text">{{ contact.address }}</span>\n    </ion-item>\n    <ion-item class="detail-item">\n      <ion-avatar item-left>\n        <ion-icon name="globe"></ion-icon>\n      </ion-avatar>\n      <span class="detail-text">{{ contact.website }}</span>\n    </ion-item>\n    <ion-item class="detail-item">\n      <ion-avatar item-left>\n        <ion-icon name="call"></ion-icon>\n      </ion-avatar>\n      <span class="detail-text">{{ contact.phone }}</span>\n    </ion-item>\n    <ion-item class="detail-item">\n      <ion-avatar item-left>\n        <ion-icon name="mail"></ion-icon>\n      </ion-avatar>\n      <span class="detail-text">{{ contact.email }}</span>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\contact-card\contact-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], ContactCardPage);
    return ContactCardPage;
}());

//# sourceMappingURL=contact-card.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_admob_free__ = __webpack_require__(391);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdsPage = (function () {
    function AdsPage(nav, admob, toastCtrl) {
        this.nav = nav;
        this.admob = admob;
        this.toastCtrl = toastCtrl;
        this.bannerConfig = {
            // add your banner config here
            // for the sake of this example we will just use the test config
            isTesting: true,
            autoShow: true,
        };
        this.interstitialConfig = {
            // add your config here
            // for the sake of this example we will just use the test config
            isTesting: true,
            autoShow: true,
        };
    }
    AdsPage.prototype.ionViewWillLoad = function () {
        this.admob.banner.config(this.bannerConfig);
        this.admob.interstitial.config(this.interstitialConfig);
    };
    AdsPage.prototype.showBanner = function () {
        var toast = this.toastCtrl.create({
            message: 'Your ad is being created...',
            duration: 3000,
            position: 'top'
        });
        toast.present();
        this.admob.banner.prepare()
            .then(function () {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
            .catch(function (e) { return console.log(e); });
    };
    AdsPage.prototype.removeBanner = function () {
        this.admob.banner.remove()
            .then(function () {
            console.log("removeBanner");
        })
            .catch(function (e) { return console.log(e); });
    };
    AdsPage.prototype.showInterstitial = function () {
        this.admob.interstitial.prepare()
            .then(function () {
            // interstitial Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
            .catch(function (e) { return console.log(e); });
    };
    AdsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ads-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\ads\ads.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Ads</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <h2 class="ads-heading">Earn money displaying ads in your app</h2>\n  <div class="ad-button-outer" (click)="showInterstitial()">\n    <ion-row class="ad-button-row">\n      <ion-col class="illustration-col" no-padding col-5>\n        <preload-image class="interstitial-illustration" [ratio]="{w:60, h:71}" src="./assets/images/ads/instertitial-illustration.png" alt="interstitial illustration" title="interstitial illustration"></preload-image>\n      </ion-col>\n      <ion-col class="text-col" col-7>\n        <h3 class="ad-button-text">{{\'SHOW_INTERSTITIAL\' | translate}}</h3>\n      </ion-col>\n    </ion-row>\n  </div>\n  <div class="ad-button-outer" (click)="showBanner()">\n    <ion-row class="ad-button-row" no-padding>\n      <ion-col class="text-col" col-7>\n        <h3 class="ad-button-text">{{\'SHOW_BANNER\' | translate}}</h3>\n      </ion-col>\n      <ion-col class="illustration-col" no-padding col-5>\n        <preload-image class="banner-illustration" [ratio]="{w:60, h:71}" src="./assets/images/ads/banner-illustration.png" alt="banner illustration" title="banner illustration"></preload-image>\n      </ion-col>\n    </ion-row>\n  </div>\n</ion-content>\n\n<ion-footer class="ads-footer">\n  <ion-toolbar>\n    <button class="remove-ad-button" ion-button block (click)="removeBanner()">{{\'REMOVE_BANNER\' | translate}}</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\ads\ads.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_admob_free__["a" /* AdMobFree */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
    ], AdsPage);
    return AdsPage;
}());

//# sourceMappingURL=ads.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPlaylistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__video_playlist_model__ = __webpack_require__(822);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VideoPlaylistPage = (function () {
    function VideoPlaylistPage(nav, loadingCtrl, socialSharing) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.socialSharing = socialSharing;
        this.start_playing = false;
        this.video_playlist_model = new __WEBPACK_IMPORTED_MODULE_3__video_playlist_model__["a" /* VideoPlaylistModel */]();
    }
    VideoPlaylistPage.prototype.createLoader = function () {
        this.loading = this.loadingCtrl.create();
    };
    VideoPlaylistPage.prototype.presentLoader = function () {
        // Check if the current instance is usable
        if (this.loading === undefined || (this.loading !== undefined && this.loading.instance === null)) {
            // If it's not usable, then create a new one
            this.createLoader();
        }
        this.loading.present();
    };
    VideoPlaylistPage.prototype.dismissLoader = function () {
        // Check if the current instance is usable
        if (this.loading !== undefined) {
            // If it's not usable, then create a new one
            this.loading.dismiss();
        }
    };
    VideoPlaylistPage.prototype.playMedia = function (media) {
        // Check if this media is not the same we are currently playing
        if (media !== this.video_playlist_model.selected_video) {
            this.presentLoader();
            // Change sources
            this.video_playlist_model.selected_video = media;
            // When changing sources we wait until the metadata is loaded and then we start playing the video
        }
    };
    VideoPlaylistPage.prototype.onPlayerReady = function (api) {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    };
    VideoPlaylistPage.prototype.playVideo = function () {
        if (this.start_playing) {
            this.dismissLoader();
            this.api.play();
        }
        else {
            this.start_playing = true;
        }
    };
    VideoPlaylistPage.prototype.shareVideo = function () {
        var current_video = this.video_playlist_model.selected_video;
        //this code is to use the social sharing plugin
        // message, subject, file, url
        this.socialSharing.share(current_video.description, current_video.title, current_video.thumbnail, null)
            .then(function () {
            console.log('Success!');
        })
            .catch(function () {
            console.log('Error');
        });
    };
    VideoPlaylistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'video-playlist-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\video-playlist\video-playlist.html"*/'<ion-header class="video-playlist-header">\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{\'VIDEO_PLAYLIST\' | translate}}</ion-title>\n    <ion-buttons end>\n      <button class="share-button" ion-button icon-only (click)="shareVideo()">\n        <ion-icon name="md-share"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="video-playlist-content">\n	<div class="video-player-container">\n		<vg-player class="video-player" (onPlayerReady)="onPlayerReady($event)">\n			<vg-buffering></vg-buffering>\n			<vg-overlay-play></vg-overlay-play>\n\n			<vg-controls [vgAutohide]="true" [vgAutohideTime]="5">\n				<ion-row class="controls-row">\n					<ion-col no-padding width-18>\n						<vg-time-display [vgProperty]="\'current\'" [vgFormat]="\'mm:ss\'"></vg-time-display>\n					</ion-col>\n					<ion-col no-padding width-64>\n						<vg-scrub-bar>\n								<vg-scrub-bar-current-time></vg-scrub-bar-current-time>\n								<vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\n						</vg-scrub-bar>\n					</ion-col>\n					<ion-col no-padding width-18>\n						<vg-time-display [vgProperty]="\'left\'" [vgFormat]="\'mm:ss\'"></vg-time-display>\n					</ion-col>\n				</ion-row>\n	    </vg-controls>\n\n			<video class="expand-horizontally" #player_video [vgMedia]="player_video" id="player-video" preload="auto">\n	      <source *ngFor="let video of video_playlist_model.selected_video.sources" [src]="video.src" [type]="video.type">\n	    </video>\n	  </vg-player>\n	</div>\n\n	<ion-row class="video-data-row">\n		<ion-col no-padding>\n			<h2 class="video-title">{{ video_playlist_model.selected_video.title }}</h2>\n			<p class="video-description">{{ video_playlist_model.selected_video.description }}</p>\n		</ion-col>\n	</ion-row>\n\n	<ion-list class="video-playlist">\n	  <ion-item class="playlist-item" *ngFor="let media of video_playlist_model.video_playlist">\n			<ion-thumbnail class="media-thumbnail" item-left (click)="playMedia(media)">\n	      <preload-image class="media-thumbnail-image" [ratio]="{w:16, h:9}" [src]="media.thumbnail"></preload-image>\n	    </ion-thumbnail>\n			<h2 class="media-title">{{ media.title }}</h2>\n	    <p class="media-description" rows="2">{{ media.description }}</p>\n	  </ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\video-playlist\video-playlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], VideoPlaylistPage);
    return VideoPlaylistPage;
}());

//# sourceMappingURL=video-playlist.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_signup_firebase_signup__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__firebase_tabs_navigation_firebase_tabs_navigation__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__firebase_auth_service__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FirebaseLoginPage = (function () {
    function FirebaseLoginPage(nav, loadingCtrl, fAuthService) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.fAuthService = fAuthService;
        this.errorMessage = '';
        this.login = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('test', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    }
    FirebaseLoginPage.prototype.doLogin = function (value) {
        var _this = this;
        this.fAuthService.doLogin(value)
            .then(function (res) {
            _this.nav.push(__WEBPACK_IMPORTED_MODULE_4__firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */]);
        }, function (err) { return _this.errorMessage = err.message; });
    };
    FirebaseLoginPage.prototype.doFacebookLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.fAuthService.doFacebookLogin()
            .then(function (res) {
            _this.nav.push(__WEBPACK_IMPORTED_MODULE_4__firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */]);
            _this.loading.dismiss();
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    FirebaseLoginPage.prototype.doGoogleLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.fAuthService.doGoogleLogin()
            .then(function (data) {
            _this.nav.push(__WEBPACK_IMPORTED_MODULE_4__firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */]);
            _this.loading.dismiss();
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    FirebaseLoginPage.prototype.doTwitterLogin = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.fAuthService.doTwitterLogin()
            .then(function (data) {
            _this.nav.push(__WEBPACK_IMPORTED_MODULE_4__firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */]);
            _this.loading.dismiss();
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    FirebaseLoginPage.prototype.goToSignup = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__firebase_signup_firebase_signup__["a" /* FirebaseSignupPage */]);
    };
    FirebaseLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'firebase-login-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-login\firebase-login.html"*/'<ion-header class="login-header auth-header">\n  <ion-navbar>\n    <ion-title>Sports</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content auth-content">\n  <form class="login-form auth-form" [formGroup]="login" (ngSubmit)="doLogin(login.value)">\n    <ion-item>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n    </ion-item>\n    <show-hide-container>\n      <ion-item>\n        <ion-input type="password" placeholder="Password" formControlName="password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <button ion-button block class="auth-action-button login-button" type="submit" [disabled]="!login.valid">{{\'LOG_IN\' | translate}}</button>\n  </form>\n  <ion-row class="alt-options">\n    <ion-col no-padding width-50>\n    </ion-col>\n    <ion-col no-padding width-50>\n      <button ion-button block clear class="signup-button" (click)="goToSignup()">{{\'SIGN_UP!\' | translate}}</button>\n    </ion-col>\n  </ion-row>\n  <label class="error-message">{{errorMessage}}</label>\n  <p class="auth-divider">\n    Or\n  </p>\n  <button ion-button block class="facebook-auth-button" (click)="doFacebookLogin()">Log in with Facebook</button>\n  <button ion-button block class="google-auth-button" (click)="doGoogleLogin()">Log in with Google</button>\n  <button ion-button block class="twitter-auth-button" (click)="doTwitterLogin()">Log in with Twitter</button>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-login\firebase-login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_5__firebase_auth_service__["a" /* FirebaseAuthService */]])
    ], FirebaseLoginPage);
    return FirebaseLoginPage;
}());

//# sourceMappingURL=firebase-login.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseSignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_tabs_navigation_firebase_tabs_navigation__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__firebase_auth_service__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FirebaseSignupPage = (function () {
    function FirebaseSignupPage(nav, loadingCtrl, fAuthService) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.fAuthService = fAuthService;
        this.errorMessage = '';
        this.signup = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('test', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    }
    FirebaseSignupPage.prototype.doSignup = function (value) {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.fAuthService.doRegister(value)
            .then(function (res) {
            _this.fAuthService.doLogin(value)
                .then(function (res) {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_3__firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */]);
                _this.loading.dismiss();
            }, function (error) { return _this.errorMessage = error.message; });
        }, function (err) { return _this.errorMessage = err.message; });
    };
    FirebaseSignupPage.prototype.doFacebookSignup = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.fAuthService.doFacebookLogin()
            .then(function (res) {
            _this.nav.push(__WEBPACK_IMPORTED_MODULE_3__firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */]);
            _this.loading.dismiss();
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    FirebaseSignupPage.prototype.doGoogleSignup = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.fAuthService.doGoogleLogin()
            .then(function (data) {
            _this.nav.push(__WEBPACK_IMPORTED_MODULE_3__firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */]);
            _this.loading.dismiss();
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    FirebaseSignupPage.prototype.doTwitterSignup = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create();
        this.fAuthService.doTwitterLogin()
            .then(function (data) {
            _this.nav.push(__WEBPACK_IMPORTED_MODULE_3__firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */]);
            _this.loading.dismiss();
        }, function (err) {
            _this.errorMessage = err.message;
        });
    };
    FirebaseSignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'firebase-signup-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-signup\firebase-signup.html"*/'<ion-header class="signup-header auth-header">\n  <ion-navbar>\n    <ion-title>{{\'SIGN_UP\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="signup-content auth-content">\n  <h2 class="auth-title">{{\'CREATE_AN_ACCOUNT\' | translate}}</h2>\n  <form class="signup-form auth-form" [formGroup]="signup" (ngSubmit)="doSignup(signup.value)">\n    <ion-item>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n    </ion-item>\n    <show-hide-container>\n      <ion-item>\n        <ion-input type="password" placeholder="Password" formControlName="password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <button ion-button block class="auth-action-button signup-button" type="submit" [disabled]="!signup.valid">{{\'SIGN_UP\' | translate}}</button>\n  </form>\n  <label class="error-message">{{errorMessage}}</label>\n  <p class="auth-divider">\n    Or\n  </p>\n  <button ion-button block class="facebook-auth-button" (click)="doFacebookSignup()">{{\'SIGN_UP_WITH_FACEBOOK\' | translate}}</button>\n  <button ion-button block class="google-auth-button" (click)="doGoogleSignup()">{{\'SIGN_UP_WITH_GOOGLE\' | translate}}</button>\n  <button ion-button block class="twitter-auth-button" (click)="doTwitterSignup()">{{\'SIGN_UP_WITH_TWITTER\' | translate}}</button>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-signup\firebase-signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_4__firebase_auth_service__["a" /* FirebaseAuthService */]])
    ], FirebaseSignupPage);
    return FirebaseSignupPage;
}());

//# sourceMappingURL=firebase-signup.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseFeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firebase_new_user_modal_firebase_new_user_modal__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_details_firebase_details__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__firebase_integration_service__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FirebaseFeedPage = (function () {
    function FirebaseFeedPage(modalCtrl, navCtrl, firebaseService) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.firebaseService = firebaseService;
        this.rangeForm = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormGroup"]({
            dual: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]({ lower: 1, upper: 99 })
        });
    }
    FirebaseFeedPage.prototype.ionViewWillEnter = function () {
        this.searchValue = "";
        this.getData();
    };
    FirebaseFeedPage.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getPeople()
            .then(function (users) {
            //we use 3 lists for the filters. Check the template docs to learn more.
            _this.items = users;
            _this.age_filtered_items = users;
            _this.name_filtered_items = users;
        });
    };
    FirebaseFeedPage.prototype.viewDetails = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__firebase_details_firebase_details__["a" /* FirebaseDetailsPage */], {
            data: item
        });
    };
    FirebaseFeedPage.prototype.openNewUserModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__firebase_new_user_modal_firebase_new_user_modal__["a" /* FirebaseNewUserModalPage */]);
        modal.onDidDismiss(function (data) {
            _this.getData();
        });
        modal.present();
    };
    FirebaseFeedPage.prototype.rangeChange = function (range) {
        var _this = this;
        this.firebaseService.searchPeopleByAge(this.rangeForm.controls.dual.value.lower, this.rangeForm.controls.dual.value.upper)
            .then(function (res) {
            _this.age_filtered_items = res;
            _this.items = _this.combineLists(res, _this.name_filtered_items);
        });
    };
    FirebaseFeedPage.prototype.onInputChange = function (event) {
        var _this = this;
        var value = this.searchValue.toLowerCase();
        this.firebaseService.searchPeople(value)
            .then(function (res) {
            _this.name_filtered_items = res;
            _this.items = _this.combineLists(res, _this.age_filtered_items);
        });
    };
    FirebaseFeedPage.prototype.combineLists = function (a, b) {
        var result = [];
        a.filter(function (x) {
            return b.filter(function (x2) {
                if (x2.payload.doc.id == x.payload.doc.id) {
                    result.push(x2);
                }
            });
        });
        return result;
    };
    FirebaseFeedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'firebase-feed-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-feed\firebase-feed.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Test</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openNewUserModal()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-searchbar\n    [(ngModel)]="searchValue"\n    (ionInput)="onInputChange($event)"\n    placeholder="Search by first name..."\n    debounce=1000>\n  </ion-searchbar>\n  <form [formGroup]="rangeForm">\n    <ion-list class="range-list">\n      <ion-item class="range-item">\n        <ion-label>\n          <h3 class="range-value">{{rangeForm.controls.dual.value.lower}}</h3>\n          <h2 class="range-label">Filter by Age</h2>\n          <h3 class="range-value">{{rangeForm.controls.dual.value.upper}}</h3>\n        </ion-label>\n        <ion-range dualKnobs="true" debounce=1000 formControlName="dual" (ionChange)="rangeChange($event)" min="1" max="99" step="1" snaps="true" pin="false"></ion-range>\n      </ion-item>\n    </ion-list>\n  </form>\n</ion-header>\n<ion-content class="list-mini-content">\n  <div class="list-mini">\n    <ion-list>\n      <button class="list-item" ion-item *ngFor="let item of items" (click)="viewDetails(item)">\n        <ion-row no-padding class="content-row one-line">\n          <ion-col no-padding width-18 class="item-avatar">\n            <preload-image class="avatar-image" [ratio]="{w:1, h:1}" [src]="item.payload.doc.data().avatar"></preload-image>\n          </ion-col>\n          <ion-col no-padding width-72 class="item-content">\n            <h3 class="item-title">{{item.payload.doc.data().name}} {{item.payload.doc.data().surname}}</h3>\n            <p class="item-description">{{item.payload.doc.data().age}} years old</p>\n          </ion-col>\n          <ion-col no-padding width-10 class="item-icon">\n            <ion-icon name="arrow-forward"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </button>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-feed\firebase-feed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_5__firebase_integration_service__["a" /* FirebaseService */]])
    ], FirebaseFeedPage);
    return FirebaseFeedPage;
}());

//# sourceMappingURL=firebase-feed.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseNewUserModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_avatar_select_firebase_avatar_select__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__firebase_integration_service__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FirebaseNewUserModalPage = (function () {
    function FirebaseNewUserModalPage(viewCtrl, formBuilder, popoverCtrl, firebaseService) {
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.popoverCtrl = popoverCtrl;
        this.firebaseService = firebaseService;
    }
    FirebaseNewUserModalPage.prototype.ionViewWillLoad = function () {
        this.resetFields();
    };
    FirebaseNewUserModalPage.prototype.resetFields = function () {
        this.avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg";
        this.validations_form = this.formBuilder.group({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            surname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            age: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    };
    FirebaseNewUserModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FirebaseNewUserModalPage.prototype.onSubmit = function (value) {
        var _this = this;
        this.firebaseService.createPerson(value, this.avatar)
            .then(function (res) {
            _this.resetFields();
            _this.viewCtrl.dismiss();
        });
    };
    FirebaseNewUserModalPage.prototype.openImagePicker = function () {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__firebase_avatar_select_firebase_avatar_select__["a" /* FirebaseAvatarSelect */]);
        popover.onDidDismiss(function (data) {
            if (data != null) {
                _this.avatar = data;
            }
        });
        popover.present();
    };
    FirebaseNewUserModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-firebase-new-user-modal',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-new-user-modal\firebase-new-user-modal.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="dismiss()">\n        <ion-icon name="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      New User\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="new-user-modal-content">\n  <div class="user-image-content">\n    <ion-row no-padding class="user-image-row">\n      <ion-col no-padding width-40>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="avatar" alt="this is the image"></preload-image>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding class="user-image-row">\n      <ion-col no-padding width-60>\n        <button class="image-action-button" ion-button outline block small (click)="openImagePicker()">Change Picture</button>\n      </ion-col>\n    </ion-row>\n  </div>\n  <form class="new-user-form" [formGroup]="validations_form" (ngSubmit)="onSubmit(validations_form.value)">\n    <ion-item>\n      <ion-label floating color="primary">Name</ion-label>\n      <ion-input type="text" formControlName="name" class="form-control" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating color="primary">Surname</ion-label>\n      <ion-input type="text" formControlName="surname" class="form-control" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating color="primary">Age</ion-label>\n      <ion-input type="number" formControlName="age" class="form-control" required></ion-input>\n    </ion-item>\n    <button class="form-action-button" ion-button block type="submit" [disabled]="!validations_form.valid">Create</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-new-user-modal\firebase-new-user-modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_4__firebase_integration_service__["a" /* FirebaseService */]])
    ], FirebaseNewUserModalPage);
    return FirebaseNewUserModalPage;
}());

//# sourceMappingURL=firebase-new-user-modal.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_avatar_select_firebase_avatar_select__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__firebase_integration_service__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FirebaseDetailsPage = (function () {
    function FirebaseDetailsPage(navParams, alertCtrl, navCtrl, formBuilder, popoverCtrl, firebaseService, platform) {
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.popoverCtrl = popoverCtrl;
        this.firebaseService = firebaseService;
        this.platform = platform;
    }
    FirebaseDetailsPage.prototype.ionViewWillLoad = function () {
        this.getData();
    };
    FirebaseDetailsPage.prototype.getData = function () {
        this.changeAvatar = false;
        this.item = this.navParams.get('data');
        this.avatar = this.item.payload.doc.data().avatar;
        this.details_form = this.formBuilder.group({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](this.item.payload.doc.data().name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            surname: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](this.item.payload.doc.data().surname, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            age: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](this.item.payload.doc.data().age, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    };
    FirebaseDetailsPage.prototype.openImagePicker = function () {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__firebase_avatar_select_firebase_avatar_select__["a" /* FirebaseAvatarSelect */]);
        popover.onDidDismiss(function (data) {
            if (data != null) {
                _this.changeAvatar = true;
                _this.avatar = data;
            }
        });
        popover.present();
    };
    FirebaseDetailsPage.prototype.delete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Do you want to delete ' + this.item.payload.doc.data().name + '?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.firebaseService.deletePerson(_this.item.payload.doc.id)
                            .then(function () { return _this.navCtrl.pop(); }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        confirm.present();
    };
    FirebaseDetailsPage.prototype.onSubmit = function (value) {
        var _this = this;
        value.avatar = this.avatar;
        value.age = Number(value.age);
        this.firebaseService.updatePerson(this.item.payload.doc.id, value)
            .then(function (res) { return _this.navCtrl.pop(); }, function (err) { return console.log(err); });
    };
    FirebaseDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'firebase-details-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-details\firebase-details.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      User Details\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button [disabled]="!details_form.dirty && !changeAvatar" (click)="onSubmit(details_form.value)">\n        Save\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="user-details-content">\n  <div class="user-image-content">\n    <ion-row no-padding class="user-image-row">\n      <ion-col no-padding width-40>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="avatar" alt="this is the image" title="IMAGE!"></preload-image>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding class="user-image-row">\n      <ion-col no-padding width-60>\n        <button class="image-action-button" ion-button outline block small (click)="openImagePicker()">Change picture</button>\n      </ion-col>\n    </ion-row>\n  </div>\n  <form class="edit-user-form" [formGroup]="details_form" >\n    <ion-item>\n      <ion-label floating>Name</ion-label>\n      <ion-input type="text" formControlName="name" class="form-controll" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Surname</ion-label>\n      <ion-input type="text" formControlName="surname" class="form-controll" required></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Age</ion-label>\n      <ion-input type="number" formControlName="age" class="form-controll" required></ion-input>\n    </ion-item>\n  </form>\n  <button class="form-action-button" ion-button block color=\'danger\' (click)="delete()" type="submit">Delete User</button>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-details\firebase-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
            __WEBPACK_IMPORTED_MODULE_4__firebase_integration_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], FirebaseDetailsPage);
    return FirebaseDetailsPage;
}());

//# sourceMappingURL=firebase-details.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firebase_integration_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_auth_service__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_crop__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FirebaseProfilePage = (function () {
    function FirebaseProfilePage(nav, firebaseService, fAuthService, app, imagePicker, cropService, platform, toastCtrl) {
        this.nav = nav;
        this.firebaseService = firebaseService;
        this.fAuthService = fAuthService;
        this.app = app;
        this.imagePicker = imagePicker;
        this.cropService = cropService;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.user = {
            id: "",
            name: "",
            image: ""
        };
        this.validation_messages = {
            'name': [
                { type: 'required', message: 'Name is required.' },
            ],
            'description': [
                { type: 'required', message: 'Description is required.' },
            ]
        };
        this.profile_form = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormGroup"]({
            name: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required),
            description: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]({
                value: 'This is an example of Social Authentication using Firebase in an Ionic 3 mobile app.',
                disabled: true
            })
        });
    }
    FirebaseProfilePage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.fAuthService.getCurrentUser()
            .then(function (user) {
            _this.user = user;
            _this.updateFormValues(_this.user.name);
        }, function (err) { return console.log(err); });
    };
    FirebaseProfilePage.prototype.updateFormValues = function (name) {
        this.profile_form.patchValue({
            name: name
        });
    };
    FirebaseProfilePage.prototype.saveFormValues = function (value) {
        var _this = this;
        this.fAuthService.updateFormValues(value)
            .then(function (res) {
            console.log(res);
            var toast = _this.toastCtrl.create({
                message: 'Your name was updated successfully',
                duration: 3000
            });
            toast.present();
        }, function (err) { return console.log(err); });
    };
    FirebaseProfilePage.prototype.logout = function () {
        var _this = this;
        this.fAuthService.doLogout()
            .then(function (res) {
            _this.app.getRootNav().pop();
        }, function (error) {
            console.log("Logout error", error);
        });
    };
    FirebaseProfilePage.prototype.openImagePicker = function () {
        var _this = this;
        this.imagePicker.hasReadPermission().then(function (result) {
            if (result == false) {
                // no callbacks required as this opens a popup which returns async
                _this.imagePicker.requestReadPermission();
            }
            else if (result == true) {
                _this.imagePicker.getPictures({
                    maximumImagesCount: 1
                }).then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        _this.cropService.crop(results[i], { quality: 75 }).then(function (newImage) {
                            _this.uploadImageToFirebase(newImage);
                        }, function (error) { return console.error("Error cropping image", error); });
                    }
                }, function (err) { return console.log(err); });
            }
        }, function (err) {
            console.log(err);
        });
    };
    FirebaseProfilePage.prototype.uploadImageToFirebase = function (image) {
        var _this = this;
        image = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["normalizeURL"])(image);
        //uploads img to firebase storage
        this.firebaseService.uploadImage(this.user.id, image)
            .then(function (photoURL) {
            //updates firebase current user photo
            _this.fAuthService.updatePhotoUrl(photoURL);
            _this.user.image = photoURL;
            var toast = _this.toastCtrl.create({
                message: 'Image was updated successfully',
                duration: 3000
            });
            toast.present();
        });
    };
    FirebaseProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'firebase-profile-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-profile\firebase-profile.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'SETTINGS\' | translate }}</ion-title>\n    <ion-buttons end [hidden]="!profile_form.dirty || !profile_form.valid">\n      <button ion-button (click)="saveFormValues(profile_form.value)">\n        {{ \'SAVE\' | translate }}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="settings-content">\n  <div class="user-image-content">\n    <ion-row no-padding class="user-image-row">\n      <ion-col no-padding width-40>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="user.image" alt="this is the image" title="IMAGE!"></preload-image>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding class="user-image-row">\n      <ion-col no-padding width-60>\n        <button class="image-action-button" ion-button outline block small (click)="openImagePicker()">{{ \'CHANGE_PROFILE_PICTURE\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <form [formGroup]="profile_form" class="settings-form">\n    <ion-list class="user-data-content">\n      <ion-item>\n        <ion-label stacked>{{ \'NAME\' | translate }}</ion-label>\n        <ion-input type="text" formControlName="name"></ion-input>\n      </ion-item>\n      <div class="validation-errors">\n        <ng-container *ngFor="let validation of validation_messages.name">\n          <div class="error-message" *ngIf="profile_form.get(\'name\').hasError(validation.type) && (profile_form.get(\'name\').dirty || profile_form.get(\'name\').touched)">\n            {{ validation.message }}\n          </div>\n        </ng-container>\n      </div>\n      <ion-item>\n        <ion-label stacked>{{ \'DESCRIPTION\' | translate }}</ion-label>\n        <ion-textarea formControlName="description" disabled rows="5"></ion-textarea>\n      </ion-item>\n    </ion-list>\n  </form>\n\n  <button class="alt-button logout-button" ion-button full icon-start (click)="logout()">\n    <ion-icon name="log-out"></ion-icon>\n    {{\'LOG_OUT\' | translate }}\n  </button>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\firebase-integration\firebase-profile\firebase-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_2__firebase_integration_service__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_3__firebase_auth_service__["a" /* FirebaseAuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
    ], FirebaseProfilePage);
    return FirebaseProfilePage;
}());

//# sourceMappingURL=firebase-profile.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blog_feed_blog_feed__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wordpress_login_wordpress_login__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blog_categories_blog_categories__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__blog_custom_pages_blog_custom_pages__ = __webpack_require__(405);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WordpressMenuPage = (function () {
    function WordpressMenuPage(nav) {
        this.nav = nav;
    }
    WordpressMenuPage.prototype.ionViewWillEnter = function () {
        this.items = [
            { title: "Recent Posts", component: __WEBPACK_IMPORTED_MODULE_2__blog_feed_blog_feed__["a" /* BlogFeedPage */] },
            { title: "Authentication", component: __WEBPACK_IMPORTED_MODULE_3__wordpress_login_wordpress_login__["a" /* WordpressLoginPage */] },
            { title: "Categories", component: __WEBPACK_IMPORTED_MODULE_4__blog_categories_blog_categories__["a" /* BlogCategoriesPage */] },
            { title: "Custom Pages", component: __WEBPACK_IMPORTED_MODULE_5__blog_custom_pages_blog_custom_pages__["a" /* BlogCustomPagesPage */] }
        ];
    };
    WordpressMenuPage.prototype.itemTapped = function (event, item) {
        this.nav.push(item.component);
    };
    WordpressMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'wordpress-menu-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\wordpress-menu\wordpress-menu.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>{{ \'HEALTH\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="wordpress-menu-content">\n  <ion-list class="wordpress-menu-list">\n    <button class="list-item" ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-row no-padding>\n        <ion-col no-padding class="item-content">\n          <h3 class="item-title">{{item.title}}</h3>\n          <span class="item-note" *ngIf="item.note">{{item.note}}</span>\n        </ion-col>\n        <ion-col no-padding width-10 class="item-icon">\n          <ion-icon name="arrow-forward"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\wordpress-menu\wordpress-menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]])
    ], WordpressMenuPage);
    return WordpressMenuPage;
}());

//# sourceMappingURL=wordpress-menu.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogCategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordpress_integration_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog_feed_blog_feed__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BlogCategoriesPage = (function () {
    function BlogCategoriesPage(navCtrl, loadingCtrl, wordpressService) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.wordpressService = wordpressService;
    }
    BlogCategoriesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.wordpressService.getCategories()
            .subscribe(function (data) {
            _this.categories = data;
            loading.dismiss();
        });
    };
    BlogCategoriesPage.prototype.itemTapped = function (event, category) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__blog_feed_blog_feed__["a" /* BlogFeedPage */], {
            id: category.id,
            title: category.name
        });
    };
    BlogCategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-blog-categories',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-categories\blog-categories.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Categories</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="list-mini-content">\n\n  <div class="list-mini">\n\n    <ion-list>\n\n      <button class="list-item" ion-item *ngFor="let category of categories" (click)="itemTapped($event, category)">\n\n        <ion-row no-padding class="content-row one-line">\n\n          <ion-col no-padding class="item-content">\n\n            <h3 class="item-title">{{category.name}}</h3>\n\n            <p class="item-description">{{category.description}}</p>\n\n          </ion-col>\n\n          <ion-col no-padding width-10 class="item-icon">\n\n            <ion-icon name="arrow-forward"></ion-icon>\n\n          </ion-col>\n\n        </ion-row>\n\n      </button>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-categories\blog-categories.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_2__wordpress_integration_service__["a" /* WordpressService */]])
    ], BlogCategoriesPage);
    return BlogCategoriesPage;
}());

//# sourceMappingURL=blog-categories.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogCustomPagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordpress_integration_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog_custom_page_blog_custom_page__ = __webpack_require__(406);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BlogCustomPagesPage = (function () {
    function BlogCustomPagesPage(navCtrl, loadingCtrl, wordpressService) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.wordpressService = wordpressService;
    }
    BlogCustomPagesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.wordpressService.getCustomPages()
            .subscribe(function (data) {
            _this.pages = data;
            loading.dismiss();
        });
    };
    BlogCustomPagesPage.prototype.itemTapped = function (event, page) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__blog_custom_page_blog_custom_page__["a" /* BlogCustomPagePage */], {
            id: page.id,
            title: page.title
        });
    };
    BlogCustomPagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-blog-custom-pages',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-custom-pages\blog-custom-pages.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Custom Pages</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="list-mini-content">\n\n  <div class="list-mini">\n\n    <ion-list>\n\n      <button class="list-item" ion-item *ngFor="let page of pages" (click)="itemTapped($event, page)">\n\n        <ion-row no-padding class="content-row one-line">\n\n          <ion-col no-padding class="item-content">\n\n            <h3 class="item-title">{{page.title.rendered}}</h3>\n\n          </ion-col>\n\n          <ion-col no-padding width-10 class="item-icon">\n\n            <ion-icon name="arrow-forward"></ion-icon>\n\n          </ion-col>\n\n        </ion-row>\n\n      </button>\n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-custom-pages\blog-custom-pages.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_2__wordpress_integration_service__["a" /* WordpressService */]])
    ], BlogCustomPagesPage);
    return BlogCustomPagesPage;
}());

//# sourceMappingURL=blog-custom-pages.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogCustomPagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordpress_integration_service__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BlogCustomPagePage = (function () {
    function BlogCustomPagePage(navParams, loadingCtrl, wordpressService) {
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.wordpressService = wordpressService;
    }
    BlogCustomPagePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.pageId = this.navParams.get('id');
        this.wordpressService.getCustomPage(this.pageId)
            .subscribe(function (data) {
            _this.page = data;
            loading.dismiss();
        });
    };
    BlogCustomPagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-blog-custom-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-custom-page\blog-custom-page.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Custom Page</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="custom-page-content">\n\n  <div *ngIf="page" class="blog-page">\n\n    <div class="page-title" [innerHTML]="page.title.rendered"></div>\n\n    <p class="page-content" [innerHTML]="page.content.rendered"></p>\n\n    <p class="page-date">Published on {{page.date.split(\'T\')[0]}}</p>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-custom-page\blog-custom-page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_2__wordpress_integration_service__["a" /* WordpressService */]])
    ], BlogCustomPagePage);
    return BlogCustomPagePage;
}());

//# sourceMappingURL=blog-custom-page.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feed_model__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__feed_service__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FeedPage = (function () {
    function FeedPage(nav, feedService, navParams, socialSharing) {
        this.nav = nav;
        this.feedService = feedService;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.feed = new __WEBPACK_IMPORTED_MODULE_4__feed_model__["a" /* FeedModel */]();
        this.feed.category = navParams.get('category');
    }
    FeedPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.feedService
            .getPosts()
            .then(function (posts) {
            _this.feed.posts = posts;
        });
    };
    FeedPage.prototype.goToProfile = function (event, item) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */], {
            user: item
        });
    };
    FeedPage.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    FeedPage.prototype.sharePost = function (post) {
        //this code is to use the social sharing plugin
        // message, subject, file, url
        this.socialSharing.share(post.description, post.title, post.image, null)
            .then(function () {
            console.log('Success!');
        })
            .catch(function () {
            console.log('Error');
        });
    };
    FeedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'feed-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\feed\feed.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <span>{{ feed.category.title }}</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="feed-content">\n  <div class="feed-item" *ngFor="let post of feed.posts">\n    <ion-card>\n      <preload-image [ratio]="{w:3, h:2}" [src]="post.image" title="post.title"></preload-image>\n      <ion-card-content>\n        <ion-card-title class="item-title">\n          {{post.title}}\n        </ion-card-title>\n        <p class="item-text">\n          {{post.description}}\n        </p>\n      </ion-card-content>\n      <ion-row no-padding class="actions-row">\n        <ion-col no-padding width-30 text-left>\n          <button class="action-button" ion-button clear small icon-start>\n            <ion-icon isActive="{{post.liked}}" name=\'heart\'></ion-icon>\n            {{post.likes}} {{\'LIKES\' | translate}}\n          </button>\n        </ion-col>\n        <ion-col no-padding width-45 text-center>\n          <button class="action-button" ion-button clear small icon-start>\n            <ion-icon name=\'chatbubbles\'></ion-icon>\n            {{post.comments}} {{\'COMMENTS\' | translate}}\n          </button>\n        </ion-col>\n        <ion-col no-padding width-25 text-right>\n          <button class="action-button" ion-button clear small (click)="sharePost(post)" icon-start>\n            <ion-icon name=\'share-alt\'></ion-icon>\n            {{\'SHARE\' | translate}}\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\feed\feed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_5__feed_service__["a" /* FeedService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], FeedPage);
    return FeedPage;
}());

//# sourceMappingURL=feed.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FeedService = (function () {
    function FeedService(http) {
        this.http = http;
    }
    FeedService.prototype.getPosts = function () {
        return this.http.get('./assets/example_data/feed.json')
            .toPromise()
            .then(function (response) { return response.json().feed; })
            .catch(this.handleError);
    };
    FeedService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    FeedService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], FeedService);
    return FeedService;
}());

//# sourceMappingURL=feed.service.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListingService = (function () {
    function ListingService(http) {
        this.http = http;
    }
    ListingService.prototype.getData = function () {
        return this.http.get('./assets/example_data/listing.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ListingService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ListingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], ListingService);
    return ListingService;
}());

//# sourceMappingURL=listing.service.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShowHideInput = (function () {
    function ShowHideInput(el) {
        this.el = el;
        this.type = 'password';
    }
    ShowHideInput.prototype.changeType = function (type) {
        this.type = type;
        this.el.nativeElement.children[0].type = this.type;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])(),
        __metadata("design:type", String)
    ], ShowHideInput.prototype, "type", void 0);
    ShowHideInput = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[show-hide-input]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], ShowHideInput);
    return ShowHideInput;
}());

//# sourceMappingURL=show-hide-input.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(523);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_edit_blog_edit_blog__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_registration_registration__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_create_post_create_post__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular___ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__environment_environment__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_select_searchable__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ionic_select_searchable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_transfer__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_tag_input__ = __webpack_require__(849);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_tag_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_angular2_tag_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_listing_listing__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_feed_feed__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_followers_followers__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_forms_forms__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_login__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_notifications_notifications__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_profile_profile__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_tabs_navigation_tabs_navigation__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_signup_signup__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_forgot_password_forgot_password__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_schedule_schedule__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_ads_ads__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_list_1_list_1__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_list_2_list_2__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_grid_grid__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_form_layout_form_layout__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_terms_of_service_terms_of_service__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_privacy_policy_privacy_policy__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_functionalities_functionalities__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_maps_maps__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_facebook_login_facebook_login__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_google_login_google_login__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_twitter_login_twitter_login__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_contact_card_contact_card__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_video_playlist_video_playlist__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_firebase_integration_firebase_feed_firebase_feed__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_firebase_integration_firebase_new_user_modal_firebase_new_user_modal__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_firebase_integration_firebase_details_firebase_details__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_firebase_integration_firebase_avatar_select_firebase_avatar_select__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_firebase_integration_firebase_profile_firebase_profile__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_firebase_integration_firebase_signup_firebase_signup__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_firebase_integration_firebase_login_firebase_login__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_firebase_integration_firebase_tabs_navigation_firebase_tabs_navigation__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_wordpress_integration_blog_feed_blog_feed__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_wordpress_integration_blog_post_blog_post__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_wordpress_integration_blog_custom_pages_blog_custom_pages__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_wordpress_integration_blog_custom_page_blog_custom_page__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_wordpress_integration_blog_categories_blog_categories__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_wordpress_integration_wordpress_login_wordpress_login__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_wordpress_integration_wordpress_menu_wordpress_menu__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__components_preload_image_preload_image__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__components_background_image_background_image__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__components_show_hide_password_show_hide_container__ = __webpack_require__(860);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__components_show_hide_password_show_hide_input__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__components_color_radio_color_radio__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__components_counter_input_counter_input__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__components_rating_rating__ = __webpack_require__(862);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__components_google_map_google_map__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__components_video_player_video_player_module__ = __webpack_require__(863);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__components_validators_validators_module__ = __webpack_require__(889);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__pages_feed_feed_service__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__pages_listing_listing_service__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__pages_profile_profile_service__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__pages_notifications_notifications_service__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__pages_list_1_list_1_service__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__pages_list_2_list_2_service__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__pages_schedule_schedule_service__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__pages_facebook_login_facebook_login_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__pages_google_login_google_login_service__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__pages_twitter_login_twitter_login_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__pages_maps_maps_service__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__pages_firebase_integration_firebase_integration_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__pages_firebase_integration_firebase_auth_service__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__providers_language_language_service__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__ionic_native_splash_screen__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__ionic_native_status_bar__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__ionic_native_social_sharing__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__ionic_native_native_storage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86__ionic_native_in_app_browser__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87__ionic_native_facebook__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88__ionic_native_google_plus__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89__ionic_native_keyboard__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_90__ionic_native_geolocation__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_91__ionic_native_twitter_connect__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_92__ionic_native_admob_free__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_93__ionic_native_app_rate__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_94__ionic_native_image_picker__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_95__ionic_native_crop__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_96__ionic_native_email_composer__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97_angularfire2__ = __webpack_require__(891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_97_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98_angularfire2_firestore__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_98_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99_angularfire2_auth__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_99_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_100__pages_form_validations_form_validations__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_101__pages_filters_filters__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_102__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_103__pages_wordpress_integration_wordpress_integration_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_104__pages_walkthrough_walkthrough__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_105__pages_recent_layouts__ = __webpack_require__(892);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















//pages

























//firebase integration








//wordpress integration







//custom components










//services














// Ionic Native Plugins















//Angular Fire









function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_listing_listing__["a" /* ListingPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_feed_feed__["a" /* FeedPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_followers_followers__["a" /* FollowersPage */],
                __WEBPACK_IMPORTED_MODULE_105__pages_recent_layouts__["a" /* LayoutsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_forms_forms__["a" /* FormsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */],
                // WalkthroughPage,
                // SettingsPage,
                __WEBPACK_IMPORTED_MODULE_26__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_schedule_schedule__["a" /* SchedulePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_list_1_list_1__["a" /* List1Page */],
                __WEBPACK_IMPORTED_MODULE_31__pages_list_2_list_2__["a" /* List2Page */],
                __WEBPACK_IMPORTED_MODULE_32__pages_grid_grid__["a" /* GridPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_form_layout_form_layout__["a" /* FormLayoutPage */],
                __WEBPACK_IMPORTED_MODULE_101__pages_filters_filters__["a" /* FiltersPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_terms_of_service_terms_of_service__["a" /* TermsOfServicePage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_privacy_policy_privacy_policy__["a" /* PrivacyPolicyPage */],
                //functionalities
                __WEBPACK_IMPORTED_MODULE_37__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_functionalities_functionalities__["a" /* FunctionalitiesPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_facebook_login_facebook_login__["a" /* FacebookLoginPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_google_login_google_login__["a" /* GoogleLoginPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_contact_card_contact_card__["a" /* ContactCardPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_twitter_login_twitter_login__["a" /* TwitterLoginPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_ads_ads__["a" /* AdsPage */],
                __WEBPACK_IMPORTED_MODULE_100__pages_form_validations_form_validations__["a" /* FormValidationsPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_video_playlist_video_playlist__["a" /* VideoPlaylistPage */],
                //firebase integration
                __WEBPACK_IMPORTED_MODULE_43__pages_firebase_integration_firebase_feed_firebase_feed__["a" /* FirebaseFeedPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_firebase_integration_firebase_new_user_modal_firebase_new_user_modal__["a" /* FirebaseNewUserModalPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_firebase_integration_firebase_details_firebase_details__["a" /* FirebaseDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_firebase_integration_firebase_avatar_select_firebase_avatar_select__["a" /* FirebaseAvatarSelect */],
                __WEBPACK_IMPORTED_MODULE_49__pages_firebase_integration_firebase_login_firebase_login__["a" /* FirebaseLoginPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_firebase_integration_firebase_profile_firebase_profile__["a" /* FirebaseProfilePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_firebase_integration_firebase_signup_firebase_signup__["a" /* FirebaseSignupPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_firebase_integration_firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */],
                //wordpress integration
                __WEBPACK_IMPORTED_MODULE_51__pages_wordpress_integration_blog_feed_blog_feed__["a" /* BlogFeedPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_wordpress_integration_blog_post_blog_post__["a" /* BlogPostPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_wordpress_integration_blog_custom_pages_blog_custom_pages__["a" /* BlogCustomPagesPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_wordpress_integration_blog_custom_page_blog_custom_page__["a" /* BlogCustomPagePage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_wordpress_integration_wordpress_login_wordpress_login__["a" /* WordpressLoginPage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_wordpress_integration_wordpress_menu_wordpress_menu__["a" /* WordpressMenuPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_wordpress_integration_blog_categories_blog_categories__["a" /* BlogCategoriesPage */],
                //custom components
                __WEBPACK_IMPORTED_MODULE_58__components_preload_image_preload_image__["a" /* PreloadImage */],
                __WEBPACK_IMPORTED_MODULE_59__components_background_image_background_image__["a" /* BackgroundImage */],
                __WEBPACK_IMPORTED_MODULE_60__components_show_hide_password_show_hide_container__["a" /* ShowHideContainer */],
                __WEBPACK_IMPORTED_MODULE_61__components_show_hide_password_show_hide_input__["a" /* ShowHideInput */],
                __WEBPACK_IMPORTED_MODULE_62__components_color_radio_color_radio__["a" /* ColorRadio */],
                __WEBPACK_IMPORTED_MODULE_63__components_counter_input_counter_input__["a" /* CounterInput */],
                __WEBPACK_IMPORTED_MODULE_64__components_rating_rating__["a" /* Rating */],
                __WEBPACK_IMPORTED_MODULE_65__components_google_map_google_map__["a" /* GoogleMap */],
                __WEBPACK_IMPORTED_MODULE_104__pages_walkthrough_walkthrough__["a" /* WalkthroughPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_wordpress_integration_wordpress_login_wordpress_login__["a" /* WordpressLoginPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_wordpress_integration_blog_categories_blog_categories__["a" /* BlogCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_wordpress_integration_blog_custom_page_blog_custom_page__["a" /* BlogCustomPagePage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_wordpress_integration_wordpress_menu_wordpress_menu__["a" /* WordpressMenuPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_create_post_create_post__["a" /* CreatePostPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_registration_registration__["a" /* RegistrationPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_edit_blog_edit_blog__["a" /* EditBlogPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_13_ionic_select_searchable__["SelectSearchableModule"],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular___["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {
                    modalEnter: 'modal-slide-in',
                    modalLeave: 'modal-slide-out',
                    pageTransition: 'ios-transition',
                    swipeBackEnabled: false
                }, {
                    links: [
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_17_angular2_tag_input__["RlTagInputModule"],
                __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_11__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_97_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_12__environment_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_98_angularfire2_firestore__["AngularFirestoreModule"],
                __WEBPACK_IMPORTED_MODULE_99_angularfire2_auth__["AngularFireAuthModule"],
                __WEBPACK_IMPORTED_MODULE_66__components_video_player_video_player_module__["a" /* VideoPlayerModule */],
                __WEBPACK_IMPORTED_MODULE_67__components_validators_validators_module__["a" /* ValidatorsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular___["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_listing_listing__["a" /* ListingPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_feed_feed__["a" /* FeedPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_followers_followers__["a" /* FollowersPage */],
                __WEBPACK_IMPORTED_MODULE_105__pages_recent_layouts__["a" /* LayoutsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_forms_forms__["a" /* FormsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */],
                __WEBPACK_IMPORTED_MODULE_104__pages_walkthrough_walkthrough__["a" /* WalkthroughPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_schedule_schedule__["a" /* SchedulePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_list_1_list_1__["a" /* List1Page */],
                __WEBPACK_IMPORTED_MODULE_31__pages_list_2_list_2__["a" /* List2Page */],
                __WEBPACK_IMPORTED_MODULE_32__pages_grid_grid__["a" /* GridPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_form_layout_form_layout__["a" /* FormLayoutPage */],
                __WEBPACK_IMPORTED_MODULE_101__pages_filters_filters__["a" /* FiltersPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_terms_of_service_terms_of_service__["a" /* TermsOfServicePage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_privacy_policy_privacy_policy__["a" /* PrivacyPolicyPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_functionalities_functionalities__["a" /* FunctionalitiesPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_facebook_login_facebook_login__["a" /* FacebookLoginPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_google_login_google_login__["a" /* GoogleLoginPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_contact_card_contact_card__["a" /* ContactCardPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_twitter_login_twitter_login__["a" /* TwitterLoginPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_ads_ads__["a" /* AdsPage */],
                __WEBPACK_IMPORTED_MODULE_100__pages_form_validations_form_validations__["a" /* FormValidationsPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_video_playlist_video_playlist__["a" /* VideoPlaylistPage */],
                //firebase integration
                __WEBPACK_IMPORTED_MODULE_43__pages_firebase_integration_firebase_feed_firebase_feed__["a" /* FirebaseFeedPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_firebase_integration_firebase_new_user_modal_firebase_new_user_modal__["a" /* FirebaseNewUserModalPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_firebase_integration_firebase_details_firebase_details__["a" /* FirebaseDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_firebase_integration_firebase_avatar_select_firebase_avatar_select__["a" /* FirebaseAvatarSelect */],
                __WEBPACK_IMPORTED_MODULE_49__pages_firebase_integration_firebase_login_firebase_login__["a" /* FirebaseLoginPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_firebase_integration_firebase_signup_firebase_signup__["a" /* FirebaseSignupPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_firebase_integration_firebase_tabs_navigation_firebase_tabs_navigation__["a" /* FirebaseTabsNavigationPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_firebase_integration_firebase_profile_firebase_profile__["a" /* FirebaseProfilePage */],
                //wordpress integration
                __WEBPACK_IMPORTED_MODULE_51__pages_wordpress_integration_blog_feed_blog_feed__["a" /* BlogFeedPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_wordpress_integration_blog_post_blog_post__["a" /* BlogPostPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_wordpress_integration_blog_custom_pages_blog_custom_pages__["a" /* BlogCustomPagesPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_wordpress_integration_blog_custom_page_blog_custom_page__["a" /* BlogCustomPagePage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_wordpress_integration_wordpress_login_wordpress_login__["a" /* WordpressLoginPage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_wordpress_integration_wordpress_menu_wordpress_menu__["a" /* WordpressMenuPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_wordpress_integration_blog_categories_blog_categories__["a" /* BlogCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_wordpress_integration_wordpress_login_wordpress_login__["a" /* WordpressLoginPage */],
                __WEBPACK_IMPORTED_MODULE_55__pages_wordpress_integration_blog_categories_blog_categories__["a" /* BlogCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_wordpress_integration_blog_custom_page_blog_custom_page__["a" /* BlogCustomPagePage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_wordpress_integration_wordpress_menu_wordpress_menu__["a" /* WordpressMenuPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_edit_blog_edit_blog__["a" /* EditBlogPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_registration_registration__["a" /* RegistrationPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_create_post_create_post__["a" /* CreatePostPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_68__pages_feed_feed_service__["a" /* FeedService */],
                __WEBPACK_IMPORTED_MODULE_69__pages_listing_listing_service__["a" /* ListingService */],
                __WEBPACK_IMPORTED_MODULE_70__pages_profile_profile_service__["a" /* ProfileService */],
                __WEBPACK_IMPORTED_MODULE_71__pages_notifications_notifications_service__["a" /* NotificationsService */],
                __WEBPACK_IMPORTED_MODULE_72__pages_list_1_list_1_service__["a" /* List1Service */],
                __WEBPACK_IMPORTED_MODULE_73__pages_list_2_list_2_service__["a" /* List2Service */],
                __WEBPACK_IMPORTED_MODULE_74__pages_schedule_schedule_service__["a" /* ScheduleService */],
                //functionalities
                __WEBPACK_IMPORTED_MODULE_75__pages_facebook_login_facebook_login_service__["a" /* FacebookLoginService */],
                __WEBPACK_IMPORTED_MODULE_76__pages_google_login_google_login_service__["a" /* GoogleLoginService */],
                __WEBPACK_IMPORTED_MODULE_77__pages_twitter_login_twitter_login_service__["a" /* TwitterLoginService */],
                __WEBPACK_IMPORTED_MODULE_78__pages_maps_maps_service__["a" /* GoogleMapsService */],
                __WEBPACK_IMPORTED_MODULE_81__providers_language_language_service__["a" /* LanguageService */],
                __WEBPACK_IMPORTED_MODULE_103__pages_wordpress_integration_wordpress_integration_service__["a" /* WordpressService */],
                __WEBPACK_IMPORTED_MODULE_80__pages_firebase_integration_firebase_auth_service__["a" /* FirebaseAuthService */],
                __WEBPACK_IMPORTED_MODULE_79__pages_firebase_integration_firebase_integration_service__["a" /* FirebaseService */],
                //ionic native plugins
                __WEBPACK_IMPORTED_MODULE_82__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_83__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_84__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_85__ionic_native_native_storage__["a" /* NativeStorage */],
                __WEBPACK_IMPORTED_MODULE_86__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_87__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_88__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_89__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_90__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_91__ionic_native_twitter_connect__["a" /* TwitterConnect */],
                __WEBPACK_IMPORTED_MODULE_92__ionic_native_admob_free__["a" /* AdMobFree */],
                __WEBPACK_IMPORTED_MODULE_93__ionic_native_app_rate__["a" /* AppRate */],
                __WEBPACK_IMPORTED_MODULE_94__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_95__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_96__ionic_native_email_composer__["a" /* EmailComposer */],
                __WEBPACK_IMPORTED_MODULE_102__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__["a" /* Camera */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_4__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
//you should replace this values with yours
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyCHjrxeH8VUADKLhR5Csa54cqPRMDr4Pw8",
        authDomain: "rosy-dynamics-171007.firebaseapp.com",
        databaseURL: "https://rosy-dynamics-171007.firebaseio.com",
        projectId: "rosy-dynamics-171007",
        storageBucket: "rosy-dynamics-171007.appspot.com",
        messagingSenderId: "303898922125"
    },
    google_web_client_id: "1092390853283-i98feg7fb1dlsm92kkcbim62855pepi8.apps.googleusercontent.com",
    facebook_app_id: 1429694130495692,
    wordpress_url: 'https://www.hyroglf.net',
    wordpress_rest_api_url: 'https://www.hyroglf.net/wp-json/wp/v2/',
    jwt_url: "https://hyroglf.net/wp-json/jwt-auth/v1/token",
    registration_url: "https://www.hyroglf.net/wp-json/wp/v2/users",
    current_user_url: "https://hyroglf.net/wp-json/wp/v2/users/me"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogFeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blog_post_blog_post__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wordpress_login_wordpress_login__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_integration_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__blog_post_model__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__create_post_create_post__ = __webpack_require__(361);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var BlogFeedPage = (function () {
    function BlogFeedPage(nav, menu, navParams, loadingCtrl, wordpressService) {
        this.nav = nav;
        this.menu = menu;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.wordpressService = wordpressService;
        this.feed = new __WEBPACK_IMPORTED_MODULE_6__blog_post_model__["a" /* BlogFeedModel */]();
        this.loggedUser = false;
        this.current_posts_page = 1;
        this.morePagesAvailable = true;
    }
    BlogFeedPage.prototype.itemTapped = function (event, item) {
        this.nav.push(item.component);
    };
    BlogFeedPage.prototype.ionViewWillEnter = function () {
        if (localStorage.getItem("_token")) {
            this.loggedUser = true;
            console.log("token from blog feed");
        }
        //if we are browsing a category
        this.categoryId = this.navParams.get('id');
        this.categoryTitle = this.navParams.get('title');
        if (!(this.feed.posts.length > 0)) {
            this.loading = this.loadingCtrl.create();
            this.loading.present();
            this.loadContents(this.categoryId);
        }
    };
    BlogFeedPage.prototype.loadContents = function (categoryId) {
        var _this = this;
        this.wordpressService.getRecentPosts(categoryId)
            .subscribe(function (data) {
            console.log(data);
            _this.feed.posts_count = Number(data.headers.get('x-wp-total'));
            _this.feed.posts_pages = Number(data.headers.get('x-wp-totalpages'));
            for (var _i = 0, _a = data.json(); _i < _a.length; _i++) {
                var post = _a[_i];
                post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
                _this.feed.posts.push(post);
            }
            _this.loading.dismiss();
        });
    };
    BlogFeedPage.prototype.getPosts = function (event) {
        var val = event.target.value;
        if (val && val.trim() != '') {
            return this.feed.posts = this.feed.posts.filter(function (post) {
                return (post.title.rendered.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        this.loadContents(this.categoryId);
    };
    BlogFeedPage.prototype.readMore = function (post) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_1__blog_post_blog_post__["a" /* BlogPostPage */], {
            post: post
        });
    };
    BlogFeedPage.prototype.loadMorePosts = function (infiniteScroll) {
        var _this = this;
        this.morePagesAvailable = this.feed.posts_pages > this.current_posts_page;
        if (this.morePagesAvailable) {
            this.current_posts_page += 1;
            this.wordpressService.getRecentPosts(this.categoryId, this.current_posts_page)
                .subscribe(function (data) {
                for (var _i = 0, _a = data.json(); _i < _a.length; _i++) {
                    var post = _a[_i];
                    post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
                    _this.feed.posts.push(post);
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    BlogFeedPage.prototype.logOut = function () {
        var _this = this;
        this.wordpressService.logOut()
            .then(function (res) { return _this.nav.push(__WEBPACK_IMPORTED_MODULE_2__wordpress_login_wordpress_login__["a" /* WordpressLoginPage */]); }, function (err) { return console.log('Error in log out'); });
    };
    BlogFeedPage.prototype.goToLogin = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__wordpress_login_wordpress_login__["a" /* WordpressLoginPage */]);
    };
    BlogFeedPage.prototype.createPost = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__create_post_create_post__["a" /* CreatePostPage */]);
    };
    BlogFeedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-blog-feed',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-feed\blog-feed.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n      <ion-title *ngIf="!categoryTitle">Recent Edits</ion-title>\n\n      <ion-title *ngIf="categoryTitle"> {{categoryTitle}} posts</ion-title>\n\n      <ion-buttons end>\n\n          <button ion-button icon-only (click)="createPost()">\n\n            <ion-icon class="toolbar-icon" name="md-add-circle"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n    <ion-searchbar\n\n      (ionInput)="getPosts($event)"\n\n      [(ngModel)]="searchQuery"\n\n      hideCancelButton="true"\n\n      (ionCancel)="onCancel($event)">\n\n    </ion-searchbar>\n\n  </ion-header>\n\n  \n\n  <ion-content class="content">\n\n\n\n      <ion-item class="top-banner">\n\n          Lorem ipsum dolor sit amet at blog feed\n\n      </ion-item>\n\n\n\n\n\n    <div class="feed-item" *ngFor="let post of feed.posts">\n\n      <ion-card >\n\n        <background-image (click)="readMore(post)" class="item-image" *ngIf="post._embedded[\'wp:featuredmedia\']" [src]="post._embedded[\'wp:featuredmedia\'][0].source_url"></background-image>\n\n        <ion-card-content>\n\n          <ion-card-title class="item-title" [innerHTML]="post.title.rendered"></ion-card-title>\n\n          <!-- <p class="item-text" [innerHTML]="post.excerpt.rendered"></p> -->\n\n        </ion-card-content>\n\n        <ion-row no-padding class="actions-row">\n\n          <ion-col class="item-date" no-padding text-left>\n\n            <span>\n\n              {{post.date.split(\'T\')[0]}}\n\n            </span>\n\n          </ion-col>\n\n          <ion-col no-padding text-right>\n\n            <button ion-button small class="read-more" (click)="readMore(post)" icon-start>\n\n               Read More\n\n            </button>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-card>\n\n    </div>\n\n    <ion-infinite-scroll [enabled]="morePagesAvailable" (ionInfinite)="loadMorePosts($event)">\n\n      <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="Loading more posts...">\n\n      </ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </ion-content>'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\blog-feed\blog-feed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["MenuController"],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_5__wordpress_integration_service__["a" /* WordpressService */]])
    ], BlogFeedPage);
    return BlogFeedPage;
}());

//# sourceMappingURL=blog-feed.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_storage__ = __webpack_require__(838);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FirebaseService = (function () {
    function FirebaseService(afs, platform) {
        this.afs = afs;
        this.platform = platform;
    }
    FirebaseService.prototype.getAvatars = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afs.collection('/avatars').valueChanges()
                .subscribe(function (snapshots) {
                resolve(snapshots);
            });
        });
    };
    FirebaseService.prototype.updatePerson = function (personKey, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            value.nameToSearch = value.name.toLowerCase();
            _this.afs.collection('/people').doc(personKey).set(value)
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.deletePerson = function (personKey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afs.collection('/people').doc(personKey).delete()
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.getPeople = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afs.collection('/people').snapshotChanges()
                .subscribe(function (snapshots) {
                resolve(snapshots);
            });
        });
    };
    FirebaseService.prototype.searchPeople = function (searchValue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afs.collection('people', function (ref) { return ref.where('nameToSearch', '>=', searchValue)
                .where('nameToSearch', '<=', searchValue + '\uf8ff'); })
                .snapshotChanges()
                .subscribe(function (snapshots) {
                resolve(snapshots);
            });
        });
    };
    FirebaseService.prototype.searchPeopleByAge = function (lower, upper) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afs.collection('people', function (ref) { return ref.orderBy('age').startAt(lower).endAt(upper); })
                .snapshotChanges()
                .subscribe(function (snapshots) {
                resolve(snapshots);
            });
        });
    };
    FirebaseService.prototype.createPerson = function (value, avatar) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.afs.collection('/people').add({
                name: value.name,
                nameToSearch: value.name.toLowerCase(),
                surname: value.surname,
                age: parseInt(value.age),
                avatar: avatar
            })
                .then(function (res) { return resolve(res); }, function (err) { return reject(err); });
        });
    };
    FirebaseService.prototype.encodeImageUri = function (imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            var aux = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL);
        };
        img.src = imageUri;
    };
    ;
    FirebaseService.prototype.uploadImage = function (personId, imageURI) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["storage"]().ref();
            var imageRef = storageRef.child('people').child(personId).child('image');
            _this.encodeImageUri(imageURI, function (image64) {
                imageRef.putString(image64, 'data_url')
                    .then(function (snapshot) {
                    resolve(snapshot.downloadURL);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    FirebaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["AngularFirestore"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], FirebaseService);
    return FirebaseService;
}());

//# sourceMappingURL=firebase-integration.service.js.map

/***/ }),

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ListModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List1Model; });
var ListModel = (function () {
    function ListModel() {
    }
    return ListModel;
}());

var List1Model = (function () {
    function List1Model() {
    }
    return List1Model;
}());

//# sourceMappingURL=list-1.model.js.map

/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NotificationModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsModel; });
var NotificationModel = (function () {
    function NotificationModel() {
    }
    return NotificationModel;
}());

var NotificationsModel = (function () {
    function NotificationsModel() {
        this.today = [];
        this.yesterday = [];
    }
    return NotificationsModel;
}());

//# sourceMappingURL=notifications.model.js.map

/***/ }),

/***/ 808:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular___ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_navigation_tabs_navigation__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_forms_forms__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_layouts_layouts__ = __webpack_require__(814);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_settings_settings__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_functionalities_functionalities__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_firebase_integration_firebase_login_firebase_login__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_wordpress_integration_wordpress_menu_wordpress_menu__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_wordpress_integration_wordpress_login_wordpress_login__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_wordpress_integration_blog_feed_blog_feed__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_wordpress_integration_wordpress_integration_service__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var MyApp = (function () {
    function MyApp(platform, menu, app, splashScreen, statusBar, translate, wordpressService, toastCtrl) {
        var _this = this;
        this.menu = menu;
        this.app = app;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.translate = translate;
        this.wordpressService = wordpressService;
        this.toastCtrl = toastCtrl;
        // make WalkthroughPage the root (or first) page
        // rootPage: any = WalkthroughPage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */];
        this.textDir = "ltr";
        this.loggedUser = false;
        if (localStorage.getItem("author_id")) {
            this.loggedUser = true;
            this.displayName = localStorage.getItem("displayname");
            console.log(localStorage.getItem("displayname"), 'display name');
        }
        console.log(localStorage.getItem("author_id"));
        translate.setDefaultLang('en');
        translate.use('en');
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.splashScreen.hide();
            _this.statusBar.styleDefault();
        });
        this.translate.onLangChange.subscribe(function (event) {
            if (event.lang == 'ar') {
                platform.setDir('rtl', true);
            }
            else {
                platform.setDir('ltr', true);
            }
            __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].forkJoin(_this.translate.get('HOME'), _this.translate.get('NEWS'), _this.translate.get('POLITICS'), _this.translate.get('ECONOMY'), _this.translate.get('HEALTH'), _this.translate.get('SPORTS'), _this.translate.get('TECH')).subscribe(function (data) {
                _this.pages = [
                    { title: data[0], icon: 'home', component: __WEBPACK_IMPORTED_MODULE_5__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] },
                    { title: data[1], icon: 'create', component: __WEBPACK_IMPORTED_MODULE_6__pages_forms_forms__["a" /* FormsPage */] },
                    { title: data[2], icon: 'code', component: __WEBPACK_IMPORTED_MODULE_9__pages_functionalities_functionalities__["a" /* FunctionalitiesPage */] }
                ];
                _this.wordpressService.getCategories()
                    .subscribe(function (data) {
                    _this.categories = data;
                });
                _this.pushPages = [
                    { title: data[3], icon: 'grid', component: __WEBPACK_IMPORTED_MODULE_7__pages_layouts_layouts__["a" /* LayoutsPage */] },
                    { title: data[4], icon: 'settings', component: __WEBPACK_IMPORTED_MODULE_8__pages_settings_settings__["a" /* SettingsPage */] },
                    { title: data[5], icon: 'logo-wordpress', component: __WEBPACK_IMPORTED_MODULE_11__pages_wordpress_integration_wordpress_menu_wordpress_menu__["a" /* WordpressMenuPage */] },
                    { title: data[6], icon: 'flame', component: __WEBPACK_IMPORTED_MODULE_10__pages_firebase_integration_firebase_login_firebase_login__["a" /* FirebaseLoginPage */] }
                ];
            });
        });
    }
    MyApp.prototype.openPage = function () {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */]);
    };
    MyApp.prototype.pushPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
        this.app.getRootNav().push(page.component);
    };
    MyApp.prototype.gotoCategoryPage = function (category) {
        this.menu.close();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_14__pages_wordpress_integration_blog_feed_blog_feed__["a" /* BlogFeedPage */], {
            id: category.id,
            title: category.name
        });
    };
    MyApp.prototype.ionViewWillEnter = function () {
    };
    MyApp.prototype.logOut = function () {
        this.menu.close();
        localStorage.removeItem('_token');
        localStorage.removeItem("author_id");
        localStorage.removeItem('username');
        localStorage.removeItem('displayname');
        localStorage.removeItem('email');
        this.nav.push(__WEBPACK_IMPORTED_MODULE_13__pages_wordpress_integration_wordpress_login_wordpress_login__["a" /* WordpressLoginPage */]);
    };
    MyApp.prototype.goToLogin = function () {
        console.log("login from app component");
        this.menu.close();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_13__pages_wordpress_integration_wordpress_login_wordpress_login__["a" /* WordpressLoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular___["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular___["Nav"])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\app\app.html"*/'<ion-menu [content]="content" [swipeEnabled]="false">\n  <ion-content class="menu-content">\n    <ion-list class="menu-list">\n      <button ion-item detail-none (click)="openPage()">\n        <ion-icon name="home" item-left></ion-icon>\n        Home\n\n        <!-- <ion-buttons *ngIf="loggedUser && page.title == \'Home\'" end>\n            {{ displayName }} | Logout \n            <button ion-button icon-only (click)="logOut()">\n              <ion-icon class="toolbar-icon" name="log-out"></ion-icon>\n            </button>\n          </ion-buttons> -->\n\n      </button>\n      <!-- <button ion-item detail-none *ngFor="let page of pushPages" (click)="pushPage(page)">\n        <ion-icon *ngIf="page.icon" name="{{page.icon}}" item-left></ion-icon>\n        {{page.title}}\n      </button> -->\n\n      <ion-buttons *ngIf="loggedUser" end>\n          Welcome, {{ displayName }} | Logout \n          <button ion-button icon-only (click)="logOut()">\n            <ion-icon class="toolbar-icon" name="log-out"></ion-icon>\n          </button>\n        </ion-buttons>\n\n        <ion-buttons *ngIf="!loggedUser" end>\n          <button ion-button icon-only (click)="goToLogin()">\n            <ion-icon class="toolbar-icon" name="log-in"></ion-icon>\n          </button>\n        </ion-buttons>\n\n      <button ion-item detail-none *ngFor="let category of categories" \n      (click)="gotoCategoryPage(category)">\n      <ion-icon *ngIf="category.icon" name="{{category.icon}}" item-left></ion-icon>\n        {{category.name}}\n      </button>\n\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular___["Platform"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular___["MenuController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular___["App"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_15__pages_wordpress_integration_wordpress_integration_service__["a" /* WordpressService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular___["ToastController"]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 809:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsernameValidator; });
var UsernameValidator = (function () {
    function UsernameValidator() {
    }
    UsernameValidator.validUsername = function (fc) {
        if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc") {
            return {
                validUsername: true
            };
        }
        else {
            return null;
        }
    };
    return UsernameValidator;
}());

//# sourceMappingURL=username.validator.js.map

/***/ }),

/***/ 810:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidator; });
var PasswordValidator = (function () {
    function PasswordValidator() {
    }
    // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
    PasswordValidator.areEqual = function (formGroup) {
        var val;
        var valid = true;
        for (var key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                var control = formGroup.controls[key];
                if (val === undefined) {
                    val = control.value;
                }
                else {
                    if (val !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    };
    return PasswordValidator;
}());

//# sourceMappingURL=password.validator.js.map

/***/ }),

/***/ 811:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_google_libphonenumber__);

var PhoneValidator = (function () {
    function PhoneValidator() {
    }
    // Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
    PhoneValidator.validCountryPhone = function (countryControl) {
        var subscribe = false;
        return function (phoneControl) {
            if (!subscribe) {
                subscribe = true;
                countryControl.valueChanges.subscribe(function () {
                    phoneControl.updateValueAndValidity();
                });
            }
            if (phoneControl.value !== "") {
                try {
                    var phoneUtil = __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber___default.a.PhoneNumberUtil.getInstance();
                    var phoneNumber = "" + phoneControl.value + "", region = countryControl.value.iso, number = phoneUtil.parse(phoneNumber, region), isValidNumber = phoneUtil.isValidNumber(number);
                    if (isValidNumber) {
                        return null;
                    }
                }
                catch (e) {
                    // console.log(e);
                    return {
                        validCountryPhone: true
                    };
                }
                return {
                    validCountryPhone: true
                };
            }
            else {
                return null;
            }
        };
    };
    return PhoneValidator;
}());

//# sourceMappingURL=phone.validator.js.map

/***/ }),

/***/ 812:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Country; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_google_libphonenumber__);

var Country = (function () {
    function Country(iso, name) {
        this.iso = iso;
        this.name = name;
        var phoneUtil = __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber___default.a.PhoneNumberUtil.getInstance(), PNF = __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber___default.a.PhoneNumberFormat, PNT = __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber___default.a.PhoneNumberType, country_example_number = phoneUtil.getExampleNumberForType(this.iso, PNT.MOBILE), 
        // We need to define what kind of country phone number type we are going to use as a mask.
        // You can choose between many types including:
        //    - FIXED_LINE
        //    - MOBILE
        //    - For more types please refer to google libphonenumber repo (https://github.com/googlei18n/libphonenumber/blob/f9e9424769964ce1970c6ed2bd60b25b976dfe6f/javascript/i18n/phonenumbers/phonenumberutil.js#L913)
        example_number_formatted = phoneUtil.format(country_example_number, PNF.NATIONAL);
        // We need to define how are we going to format the phone number
        // You can choose between many formats including:
        //    - NATIONAL
        //    - INTERNATIONAL
        //    - E164
        //    - RFC3966
        this.sample_phone = example_number_formatted;
        this.code = "+" + country_example_number.getCountryCode();
        // Now let's transform the formatted example number into a valid text-mask
        // Inspired in text-mask example (https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#included-conformtomask)
        this.phone_mask = this.getMaskFromString(example_number_formatted);
    }
    Country.prototype.getMaskFromString = function (string) {
        var _string_chars = string.split(''), _digit_reg_exp = new RegExp(/\d/), _mask = _string_chars.map(function (char) {
            // Replace any digit with a digit RegExp
            return (_digit_reg_exp.test(char)) ? _digit_reg_exp : char;
        });
        return _mask;
    };
    return Country;
}());

//# sourceMappingURL=form-validations.model.js.map

/***/ }),

/***/ 814:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schedule_schedule__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_1_list_1__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_2_list_2__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__grid_grid__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notifications_notifications__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_profile__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LayoutsPage = (function () {
    function LayoutsPage(nav, translate) {
        this.nav = nav;
        this.translate = translate;
    }
    LayoutsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"].forkJoin(this.translate.get('SCHEDULE'), this.translate.get('LISTS'), this.translate.get('LISTS'), this.translate.get('GRID'), this.translate.get('NOTIFICATIONS'), this.translate.get('PROFILE')).subscribe(function (data) {
            _this.items = [
                { title: data[0], component: __WEBPACK_IMPORTED_MODULE_2__schedule_schedule__["a" /* SchedulePage */] },
                { title: data[1], note: '(Big)', component: __WEBPACK_IMPORTED_MODULE_3__list_1_list_1__["a" /* List1Page */] },
                { title: data[2], note: '(Mini)', component: __WEBPACK_IMPORTED_MODULE_4__list_2_list_2__["a" /* List2Page */] },
                { title: data[3], component: __WEBPACK_IMPORTED_MODULE_5__grid_grid__["a" /* GridPage */] },
                { title: data[4], component: __WEBPACK_IMPORTED_MODULE_6__notifications_notifications__["a" /* NotificationsPage */] },
                { title: data[5], component: __WEBPACK_IMPORTED_MODULE_7__profile_profile__["a" /* ProfilePage */] },
            ];
        });
    };
    LayoutsPage.prototype.itemTapped = function (event, item) {
        this.nav.push(item.component);
    };
    LayoutsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'layouts-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\layouts\layouts.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'POLITICS\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="layouts-content">\n  <ion-list class="layouts-list">\n    <button class="list-item" ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-row no-padding>\n        <ion-col no-padding class="item-content">\n          <h3 class="item-title">{{item.title}}</h3>\n          <span class="item-note" *ngIf="item.note">{{item.note}}</span>\n        </ion-col>\n        <ion-col no-padding width-10 class="item-icon">\n          <ion-icon name="arrow-forward"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\layouts\layouts.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */]])
    ], LayoutsPage);
    return LayoutsPage;
}());

//# sourceMappingURL=layouts.js.map

/***/ }),

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EventModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleModel; });
/* unused harmony export EventDate */
var EventModel = (function () {
    function EventModel() {
    }
    return EventModel;
}());

var ScheduleModel = (function () {
    function ScheduleModel() {
        this.today = [];
        this.upcoming = [];
    }
    return ScheduleModel;
}());

var EventDate = (function () {
    function EventDate() {
    }
    return EventDate;
}());

//# sourceMappingURL=schedule.model.js.map

/***/ }),

/***/ 816:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ListModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List2Model; });
var ListModel = (function () {
    function ListModel() {
    }
    return ListModel;
}());

var List2Model = (function () {
    function List2Model() {
    }
    return List2Model;
}());

//# sourceMappingURL=list-2.model.js.map

/***/ }),

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsModel; });
/* unused harmony export MapPlace */
var MapsModel = (function () {
    function MapsModel() {
        this.map_options = {
            center: { lat: 40.785091, lng: -73.968285 },
            zoom: 13,
            disableDefaultUI: true
        };
        this.map_places = [];
        this.search_query = '';
        this.search_places_predictions = [];
        this.nearby_places = [];
        this.directions_origin = new MapPlace();
        this.using_geolocation = false;
    }
    // https://developers.google.com/maps/documentation/javascript/reference#Map
    MapsModel.prototype.init = function (map) {
        this.map = map;
        // https://developers.google.com/maps/documentation/javascript/reference#DirectionsRenderer
        this.directions_display = new google.maps.DirectionsRenderer({
            map: this.map,
            suppressMarkers: true,
            preserveViewport: true
        });
    };
    MapsModel.prototype.cleanMap = function () {
        // Empty nearby places array
        this.nearby_places = [];
        // To clear previous directions
        this.directions_display.setDirections({ routes: [] });
        // To remove all previous markers from the map
        this.map_places.forEach(function (place) {
            place.marker.setMap(null);
        });
        // Empty markers array
        this.map_places = [];
        this.using_geolocation = false;
    };
    MapsModel.prototype.addPlaceToMap = function (location, color) {
        if (color === void 0) { color = '#333333'; }
        var _map_place = new MapPlace();
        _map_place.location = location;
        _map_place.marker = new google.maps.Marker({
            position: location,
            map: this.map,
            icon: MapPlace.createIcon(color)
        });
        this.map_places.push(_map_place);
        return _map_place;
    };
    MapsModel.prototype.addNearbyPlace = function (place_result) {
        var _map_place = this.addPlaceToMap(place_result.geometry.location, '#666666');
        // This is an extra attribute for nearby places only
        _map_place.details = place_result;
        var getRandom = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        // Add a random image
        _map_place.details["image"] = "./assets/images/maps/place-" + getRandom(1, 9) + ".jpg";
        this.nearby_places.push(_map_place);
    };
    MapsModel.prototype.deselectPlaces = function () {
        this.nearby_places.forEach(function (place) {
            place.deselect();
        });
    };
    return MapsModel;
}());

var MapPlace = (function () {
    function MapPlace() {
        this.selected = false;
    }
    // https://developers.google.com/maps/documentation/javascript/reference#Symbol
    MapPlace.createIcon = function (color) {
        var _icon = {
            path: "M144 400c80 0 144 -60 144 -134c0 -104 -144 -282 -144 -282s-144 178 -144 282c0 74 64 134 144 134zM144 209c26 0 47 21 47 47s-21 47 -47 47s-47 -21 -47 -47s21 -47 47 -47z",
            fillColor: color,
            fillOpacity: .6,
            anchor: new google.maps.Point(0, 0),
            strokeWeight: 0,
            scale: 0.08,
            rotation: 180
        };
        return _icon;
    };
    MapPlace.prototype.setIcon = function (color) {
        this.marker.setIcon(MapPlace.createIcon(color));
    };
    MapPlace.prototype.deselect = function () {
        this.selected = false;
        this.setIcon('#666666');
    };
    MapPlace.prototype.select = function () {
        this.selected = true;
        this.setIcon('#ae75e7');
    };
    return MapPlace;
}());

//# sourceMappingURL=maps.model.js.map

/***/ }),

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookUserModel; });
var FacebookUserModel = (function () {
    function FacebookUserModel() {
        this.friends = [];
        this.photos = [];
    }
    return FacebookUserModel;
}());

//# sourceMappingURL=facebook-user.model.js.map

/***/ }),

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleUserModel; });
var GoogleUserModel = (function () {
    function GoogleUserModel() {
        this.friends = [];
        this.photos = [];
    }
    return GoogleUserModel;
}());

//# sourceMappingURL=google-user.model.js.map

/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterUserModel; });
var TwitterUserModel = (function () {
    function TwitterUserModel() {
    }
    return TwitterUserModel;
}());

//# sourceMappingURL=twitter-user.model.js.map

/***/ }),

/***/ 821:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactModel; });
var ContactModel = (function () {
    function ContactModel() {
        this.images = [];
        this.images = [
            './assets/images/maps/place-1.jpg',
            './assets/images/maps/place-2.jpg',
            './assets/images/maps/place-3.jpg',
            './assets/images/maps/place-4.jpg'
        ];
        this.name = "Railway Cafe";
        this.rating = 4;
        this.email = "contact@ionicthemes.com";
        this.phone = "555-555-555";
        this.website = "https://ionicthemes.com";
        this.address = "7644 sable st";
    }
    return ContactModel;
}());

//# sourceMappingURL=contact.model.js.map

/***/ }),

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VideoModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPlaylistModel; });
var VideoModel = (function () {
    function VideoModel(title, description, thumbnail, sources) {
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.sources = sources;
    }
    return VideoModel;
}());

var VideoPlaylistModel = (function () {
    function VideoPlaylistModel() {
        this.video_playlist = [];
        var __video_1 = new VideoModel('Big Buck Bunny', 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain\'t no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.', './assets/images/video-playlist/big_buck_bunny.png', [
            {
                src: './assets/videos/big_buck_bunny.mp4',
                type: 'video/mp4'
            }
        ]);
        var __video_2 = new VideoModel('EARTH: Seen From ISS Expedition 28 & 29', 'Thanks to NASA and the crews of ISS for this wonderful video footage.', './assets/images/video-playlist/earth_seen_from_iss.png', [
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.webm",
                type: "video/webm"
            }
        ]);
        var __video_3 = new VideoModel('Elephant Dream', 'Elephants Dream is the world\'s first open movie, made entirely with open source graphics software such as Blender, and with all production files freely available to use however you please', './assets/images/video-playlist/elephants_dream.png', [
            {
                src: './assets/videos/elephants_dream.mp4',
                type: 'video/mp4'
            }
        ]);
        this.video_playlist.push(__video_1);
        this.video_playlist.push(__video_2);
        this.video_playlist.push(__video_3);
        this.selected_video = this.video_playlist[0];
    }
    return VideoPlaylistModel;
}());

//# sourceMappingURL=video-playlist.model.js.map

/***/ }),

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feed_feed__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__listing_model__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__listing_service__ = __webpack_require__(411);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ListingPage = (function () {
    function ListingPage(nav, listingService) {
        this.nav = nav;
        this.listingService = listingService;
        this.listing = new __WEBPACK_IMPORTED_MODULE_4__listing_model__["a" /* ListingModel */]();
    }
    ListingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.listingService
            .getData()
            .then(function (data) {
            _this.listing.banner_image = data.banner_image;
            _this.listing.banner_title = data.banner_title;
            _this.listing.populars = data.populars;
            _this.listing.categories = data.categories;
        });
    };
    ListingPage.prototype.goToFeed = function (category) {
        console.log("Clicked goToFeed", category);
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__feed_feed__["a" /* FeedPage */], { category: category });
    };
    ListingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'listing-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\listing\listing.html"*/'<ion-header class="listing-header">\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <div class="header-logo">Hyroglf</div>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="listing-content">\n  <background-image class="image-heading" [src]="listing.banner_image">\n    <ion-row class="heading-row">\n      <ion-col no-padding offset-100>\n        <h2 class="main-title">{{listing.banner_title}}</h2>\n      </ion-col>\n    </ion-row>\n  </background-image>\n  <h4 class="categories-title">{{\'POPULAR\' | translate}}</h4>\n  <ion-scroll scrollX="true" class="horizontal-categories">\n    <ion-row class="categories-row">\n      <ion-col width-30 class="horizontal-item"  *ngFor="let popular of listing.populars">\n        <preload-image [ratio]="{w:1, h:1}" [src]="popular.image" title="popular.title"></preload-image>\n      </ion-col>\n    </ion-row>\n  </ion-scroll>\n  <h4 class="categories-title">{{\'BROWSE_CATEGORIES\' | translate}}</h4>\n  <ion-row class="grid-categories">\n    <ion-col width-50 class="category-item" *ngFor="let category of listing.categories">\n      <background-image tappable class="category-heading" [src]="category.image" (click)="goToFeed(category)">\n        <ion-row class="heading-row">\n          <ion-col no-padding width-100>\n            <h2 class="category-title">{{category.title}}</h2>\n          </ion-col>\n        </ion-row>\n      </background-image>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\listing\listing.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_5__listing_service__["a" /* ListingService */]])
    ], ListingPage);
    return ListingPage;
}());

//# sourceMappingURL=listing.js.map

/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FeedPostModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedModel; });
var FeedPostModel = (function () {
    function FeedPostModel() {
        this.likes = 0;
        this.comments = 0;
        this.liked = false;
    }
    return FeedPostModel;
}());

var FeedModel = (function () {
    function FeedModel() {
    }
    return FeedModel;
}());

//# sourceMappingURL=feed.model.js.map

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingModel; });
/* unused harmony export ListingItemModel */
var ListingModel = (function () {
    function ListingModel() {
    }
    return ListingModel;
}());

var ListingItemModel = (function () {
    function ListingItemModel() {
    }
    return ListingItemModel;
}());

//# sourceMappingURL=listing.model.js.map

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreloadImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PreloadImage = (function () {
    function PreloadImage(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._src = '';
        this._img = new Image();
    }
    Object.defineProperty(PreloadImage.prototype, "src", {
        set: function (val) {
            this._src = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(val) ? val : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreloadImage.prototype, "ratio", {
        set: function (ratio) {
            this._ratio = ratio || null;
        },
        enumerable: true,
        configurable: true
    });
    PreloadImage.prototype.ngOnChanges = function (changes) {
        var ratio_height = (this._ratio.h / this._ratio.w * 100) + "%";
        // Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'padding-bottom', ratio_height);
        this._update();
        // console.log("CHANGES preload-image", this._src);
        // console.log(changes['src'].isFirstChange());
    };
    PreloadImage.prototype._update = function () {
        var _this = this;
        if (Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(this.alt)) {
            this._img.alt = this.alt;
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(this.title)) {
            this._img.title = this.title;
        }
        this._img.addEventListener('load', function () {
            _this._elementRef.nativeElement.appendChild(_this._img);
            _this._loaded(true);
        });
        this._img.src = this._src;
        this._loaded(false);
    };
    PreloadImage.prototype._loaded = function (isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PreloadImage.prototype, "alt", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PreloadImage.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PreloadImage.prototype, "src", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PreloadImage.prototype, "ratio", null);
    PreloadImage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'preload-image',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\components\preload-image\preload-image.html"*/'<ion-spinner name="bubbles"></ion-spinner>\n<ng-content></ng-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\components\preload-image\preload-image.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], PreloadImage);
    return PreloadImage;
}());

//# sourceMappingURL=preload-image.js.map

/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BackgroundImage = (function () {
    function BackgroundImage(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._src = '';
    }
    Object.defineProperty(BackgroundImage.prototype, "src", {
        set: function (val) {
            this._src = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(val) ? val : '';
        },
        enumerable: true,
        configurable: true
    });
    BackgroundImage.prototype.ngOnChanges = function (changes) {
        this._update();
        // console.log("CHANGES background-image", this._src);
        // console.log(changes['src'].isFirstChange());
    };
    BackgroundImage.prototype._update = function () {
        var _this = this;
        var img = new Image();
        img.addEventListener('load', function () {
            _this._elementRef.nativeElement.style.backgroundImage = 'url(' + _this._src + ')';
            _this._loaded(true);
        });
        img.src = this._src;
        this._loaded(false);
    };
    BackgroundImage.prototype._loaded = function (isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], BackgroundImage.prototype, "class", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BackgroundImage.prototype, "src", null);
    BackgroundImage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'background-image',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\components\background-image\background-image.html"*/'<span class="bg-overlay"></span>\n<ion-spinner name="bubbles"></ion-spinner>\n<ng-content></ng-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\components\background-image\background-image.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], BackgroundImage);
    return BackgroundImage;
}());

//# sourceMappingURL=background-image.js.map

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__show_hide_input__ = __webpack_require__(412);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShowHideContainer = (function () {
    function ShowHideContainer() {
        this.show = false;
    }
    ShowHideContainer.prototype.toggleShow = function () {
        this.show = !this.show;
        if (this.show) {
            this.input.changeType("text");
        }
        else {
            this.input.changeType("password");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])(__WEBPACK_IMPORTED_MODULE_1__show_hide_input__["a" /* ShowHideInput */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__show_hide_input__["a" /* ShowHideInput */])
    ], ShowHideContainer.prototype, "input", void 0);
    ShowHideContainer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'show-hide-container',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\components\show-hide-password\show-hide-password.html"*/'<ng-content></ng-content>\n<a class="type-toggle" (click)="toggleShow()">\n	<ion-icon class="show-option" [hidden]="show" name="eye"></ion-icon>\n	<ion-icon class="hide-option" [hidden]="!show" name="eye-off"></ion-icon>\n</a>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\components\show-hide-password\show-hide-password.html"*/,
            host: {
                'class': 'show-hide-password'
            }
        }),
        __metadata("design:paramtypes", [])
    ], ShowHideContainer);
    return ShowHideContainer;
}());

//# sourceMappingURL=show-hide-container.js.map

/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorRadio; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorRadio = (function () {
    function ColorRadio(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ColorRadio.prototype.setColor = function (color) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
        this.renderer.setElementStyle(this.el.nativeElement, 'borderColor', color);
    };
    ColorRadio.prototype.ngOnInit = function () {
        console.log(this.color);
        this.setColor(this.color);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('color-radio'),
        __metadata("design:type", String)
    ], ColorRadio.prototype, "color", void 0);
    ColorRadio = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[color-radio]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], ColorRadio);
    return ColorRadio;
}());

//# sourceMappingURL=color-radio.js.map

/***/ }),

/***/ 862:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RATING_CONTROL_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rating; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var noop = function () { };
var RATING_CONTROL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return Rating; }),
    multi: true
};
var Rating = (function () {
    function Rating() {
        this.max = 5;
        this.readOnly = false;
        this.propagateChange = noop;
    }
    Rating.prototype.ngOnInit = function () {
        var states = [];
        for (var i = 0; i < this.max; i++) {
            if (this.innerValue > i && this.innerValue < i + 1) {
                states[i] = 2;
            }
            else if (this.innerValue > i) {
                states[i] = 1;
            }
            else {
                states[i] = 0;
            }
        }
        this.range = states;
    };
    Object.defineProperty(Rating.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (val) {
            if (val !== this.innerValue) {
                this.innerValue = val;
                this.propagateChange(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    Rating.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    Rating.prototype.registerOnTouched = function () { };
    Rating.prototype.rate = function (amount) {
        if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
            this.value = amount;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], Rating.prototype, "max", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('read-only'),
        __metadata("design:type", Object)
    ], Rating.prototype, "readOnly", void 0);
    Rating = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rating',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\components\rating\rating.html"*/'<button class="rating-icon" ion-button icon-only round *ngFor="let r of range; let i = index" (click)="rate(i + 1)">\n	<ion-icon [name]="value === undefined ? (r === 1 ? \'star\' : (r === 2 ? \'star-half\' : \'star-outline\')) : (value > i ? (value < i+1 ? \'star-half\' : \'star\') : \'star-outline\')"></ion-icon>\n</button>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\components\rating\rating.html"*/,
            providers: [RATING_CONTROL_VALUE_ACCESSOR]
        })
    ], Rating);
    return Rating;
}());

//# sourceMappingURL=rating.js.map

/***/ }),

/***/ 863:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPlayerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_videogular2_core__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_videogular2_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_videogular2_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_videogular2_controls__ = __webpack_require__(869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_videogular2_controls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_videogular2_controls__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_videogular2_overlay_play__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_videogular2_overlay_play___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_videogular2_overlay_play__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_videogular2_buffering__ = __webpack_require__(886);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_videogular2_buffering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_videogular2_buffering__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// Video stuff




var VideoPlayerModule = (function () {
    function VideoPlayerModule() {
    }
    VideoPlayerModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [
                __WEBPACK_IMPORTED_MODULE_1_videogular2_core__["VgCoreModule"],
                __WEBPACK_IMPORTED_MODULE_2_videogular2_controls__["VgControlsModule"],
                __WEBPACK_IMPORTED_MODULE_3_videogular2_overlay_play__["VgOverlayPlayModule"],
                __WEBPACK_IMPORTED_MODULE_4_videogular2_buffering__["VgBufferingModule"]
            ]
        })
    ], VideoPlayerModule);
    return VideoPlayerModule;
}());

//# sourceMappingURL=video-player.module.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BlogPostModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogFeedModel; });
var BlogPostModel = (function () {
    function BlogPostModel() {
        this.comments_count = 0;
        this.comments_pages = 0;
    }
    return BlogPostModel;
}());

var BlogFeedModel = (function () {
    function BlogFeedModel() {
        this.posts = new Array();
        this.posts_count = 0;
        this.posts_pages = 0;
    }
    return BlogFeedModel;
}());

//# sourceMappingURL=blog-post.model.js.map

/***/ }),

/***/ 889:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidatorsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_text_mask__ = __webpack_require__(890);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_text_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_text_mask__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ValidatorsModule = (function () {
    function ValidatorsModule() {
    }
    ValidatorsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [
                __WEBPACK_IMPORTED_MODULE_1_angular2_text_mask__["TextMaskModule"]
            ]
        })
    ], ValidatorsModule);
    return ValidatorsModule;
}());

//# sourceMappingURL=validators.module.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular___ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blog_feed_blog_feed__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wordpress_integration_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__registration_registration__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__list_1_list_1__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var WordpressLoginPage = (function () {
    function WordpressLoginPage(navCtrl, menu, loadingCtrl, formBuilder, wordpressService, authProvider) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.wordpressService = wordpressService;
        this.authProvider = authProvider;
    }
    WordpressLoginPage.prototype.ionViewWillLoad = function () {
        this.login_form = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required)
        });
    };
    WordpressLoginPage.prototype.login = function (value) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.authProvider.postLogin(value.username, value.password).subscribe(function (data) {
            _this.authProvider.getCurrentUser(data.token).subscribe(function (val) {
                console.log(val.id);
                localStorage.setItem("author_id", val.id);
            }, function (error) {
                console.log(error);
            });
            localStorage.setItem("_token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("displayname", data.user_display_name);
            localStorage.setItem("email", data.user_email);
        });
        loading.dismiss();
        this.menu.close();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__list_1_list_1__["a" /* List1Page */]);
    };
    WordpressLoginPage.prototype.skipLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__blog_feed_blog_feed__["a" /* BlogFeedPage */]);
    };
    WordpressLoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__registration_registration__["a" /* RegistrationPage */]);
    };
    WordpressLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-wordpress-login',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\wordpress-login\wordpress-login.html"*/'<ion-header class="login-header auth-header">\n  <ion-navbar>\n    <ion-title>Login with Wordpress</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content auth-content">\n  <form class="login-form auth-form" [formGroup]="login_form" (ngSubmit)="login(login_form.value)">\n    <ion-item>\n      <ion-input type="text" placeholder="Username" formControlName="username" value=\'aa\' required></ion-input>\n    </ion-item>\n    <show-hide-container>\n      <ion-item>\n        <ion-input type="password" placeholder="Password" formControlName="password" value=\'aa\' show-hide-input required></ion-input>\n      </ion-item>\n    </show-hide-container>\n\n    <p class="error-message" *ngIf="error_message">{{error_message}}</p>\n\n    <button ion-button block class="auth-action-button login-button" type="submit" [disabled]="!login_form.valid" type="submit">Login</button>\n  </form>\n\n  <button ion-button block class="auth-action-button login-button" \n    type="submit" type="submit" (click)="register()">Registration</button>\n    \n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\wordpress-integration\wordpress-login\wordpress-login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular___["MenuController"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_5__wordpress_integration_service__["a" /* WordpressService */],
            __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */]])
    ], WordpressLoginPage);
    return WordpressLoginPage;
}());

//# sourceMappingURL=wordpress-login.js.map

/***/ }),

/***/ 892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schedule_schedule__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_1_list_1__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_2_list_2__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__grid_grid__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notifications_notifications__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_profile__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LayoutsPage = (function () {
    function LayoutsPage(nav, translate) {
        this.nav = nav;
        this.translate = translate;
    }
    LayoutsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"].forkJoin(this.translate.get('SCHEDULE'), this.translate.get('LISTS'), this.translate.get('LISTS'), this.translate.get('GRID'), this.translate.get('NOTIFICATIONS'), this.translate.get('PROFILE')).subscribe(function (data) {
            _this.items = [
                { title: data[0], component: __WEBPACK_IMPORTED_MODULE_2__schedule_schedule__["a" /* SchedulePage */] },
                { title: data[1], note: '(Big)', component: __WEBPACK_IMPORTED_MODULE_3__list_1_list_1__["a" /* List1Page */] },
                { title: data[2], note: '(Mini)', component: __WEBPACK_IMPORTED_MODULE_4__list_2_list_2__["a" /* List2Page */] },
                { title: data[3], component: __WEBPACK_IMPORTED_MODULE_5__grid_grid__["a" /* GridPage */] },
                { title: data[4], component: __WEBPACK_IMPORTED_MODULE_6__notifications_notifications__["a" /* NotificationsPage */] },
                { title: data[5], component: __WEBPACK_IMPORTED_MODULE_7__profile_profile__["a" /* ProfilePage */] },
            ];
        });
    };
    LayoutsPage.prototype.itemTapped = function (event, item) {
        this.nav.push(item.component);
    };
    LayoutsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'layouts-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\recent\layouts.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'RECENT\'}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="layouts-content">\n  <ion-list class="layouts-list">\n    <button class="list-item" ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-row no-padding>\n        <ion-col no-padding class="item-content">\n          <h3 class="item-title">{{item.title}}</h3>\n          <span class="item-note" *ngIf="item.note">{{item.note}}</span>\n        </ion-col>\n        <ion-col no-padding width-10 class="item-icon">\n          <ion-icon name="arrow-forward"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\recent\layouts.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */]])
    ], LayoutsPage);
    return LayoutsPage;
}());

//# sourceMappingURL=layouts.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment_environment__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(http) {
        this.http = http;
        console.log('Hello AuthProvider Provider');
    }
    AuthProvider.prototype.getCurrentUser = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].current_user_url, { headers: headers });
    };
    AuthProvider.prototype.doRegister = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', 'Bearer ' + JSON.stringify(localStorage.getItem("_token")));
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url, user, { headers: headers });
    };
    AuthProvider.prototype.register = function (user_data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaHlyb2dsZi5uZXQiLCJpYXQiOjE1NDc0ODEyODUsIm5iZiI6MTU0NzQ4MTI4NSwiZXhwIjoxNTQ4MDg2MDg1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NjgifX19.XozAbXubbYDEP5FDmzQGN03Hw-xMU5AGFU9P-yfvexc',
        });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].wordpress_rest_api_url + 'users', user_data, { headers: headers });
    };
    AuthProvider.prototype.postLogin = function (username, password) {
        var data = {
            username: username,
            password: password
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        headers.set('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__environment_environment__["a" /* environment */].jwt_url, data, { headers: headers });
    };
    AuthProvider.prototype._addStandardHeaders = function (header) {
        header = header.append('Content-Type', 'application/json');
        header = header.append('Accept', 'application/json');
        header = header.append('Authorization', 'Bearer ' + localStorage.getItem("_token"));
        return header;
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_1_model__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_1_service__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__wordpress_integration_blog_post_model__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress_integration_wordpress_integration_service__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var List1Page = (function () {
    function List1Page(nav, list1Service, loadingCtrl, socialSharing, wordpressService) {
        this.nav = nav;
        this.list1Service = list1Service;
        this.loadingCtrl = loadingCtrl;
        this.socialSharing = socialSharing;
        this.wordpressService = wordpressService;
        this.list1 = new __WEBPACK_IMPORTED_MODULE_3__list_1_model__["a" /* List1Model */]();
        this.loggedUser = false;
        this.current_posts_page = 1;
        this.morePagesAvailable = true;
        this.feed = new __WEBPACK_IMPORTED_MODULE_6__wordpress_integration_blog_post_model__["a" /* BlogFeedModel */]();
        this.loading = this.loadingCtrl.create();
    }
    List1Page.prototype.ionViewDidLoad = function () {
        this.loadContents(this.sort);
    };
    List1Page.prototype.loadContents = function (sort) {
        var _this = this;
        // this.loading.present();
        this.list1Service
            .getData(sort)
            .subscribe(function (data) {
            _this.items = data.json();
            console.log(data.json());
            _this.feed.posts_count = Number(data.headers.get('x-wp-total'));
            _this.feed.posts_pages = Number(data.headers.get('x-wp-totalpages'));
            for (var _i = 0, _a = data.json(); _i < _a.length; _i++) {
                var post = _a[_i];
                post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
                _this.items.push(post);
            }
            // this.loading.dismiss();
        });
    };
    List1Page.prototype.getPosts = function (event) {
        var val = event.target.value;
        if (val && val.trim() != '') {
            return this.items = this.items.filter(function (post) {
                return (post.title.rendered.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            //   return this.items.filter((post) => {
            //     return post.title.rendered.toLowerCase().includes(val.toLowerCase());
            // });
        }
        this.loadContents(this.sort);
    };
    List1Page.prototype.sortPost = function () {
        this.loadContents(this.sort);
    };
    List1Page.prototype.sharePost = function (post) {
        console.log(post);
        //this code is to use the social sharing plugin
        // message, subject, file, url
        this.socialSharing.share(post.title.rendered, post.title.rendered, "", post.link)
            .then(function () {
            console.log('Success!');
        })
            .catch(function () {
            console.log('Error');
        });
    };
    List1Page.prototype.loadMorePosts = function (infiniteScroll) {
        var _this = this;
        debugger;
        this.morePagesAvailable = this.feed.posts_pages > this.current_posts_page;
        if (this.morePagesAvailable) {
            this.current_posts_page += 1;
            this.list1Service
                .getData(this.sort, this.current_posts_page)
                .subscribe(function (data) {
                console.log(data, "with paginations");
                for (var _i = 0, _a = data.json(); _i < _a.length; _i++) {
                    var post = _a[_i];
                    post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
                    _this.items.push(post);
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    List1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'list-1-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\list-1\list-1.html"*/'<ion-header class="listing-header">\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <div class="header-logo">Hyroglf</div>\n    </ion-title>\n  </ion-navbar>\n\n  <ion-searchbar\n    (ionInput)="getPosts($event)"\n    [(ngModel)]="searchQuery"\n    hideCancelButton="true"\n    autocomplete="on"\n    (ionCancel)="onCancel($event)">\n  </ion-searchbar>\n  \n</ion-header>\n\n<ion-content class="list-big-content">\n\n    <ion-item class="top-banner">\n        Lorem ipsum dolor sit amet\n    </ion-item>\n    \n  <ion-item>\n      <ion-label> Sort </ion-label>\n      <ion-select [(ngModel)]="sort" (ionChange)="sortPost()">\n        <ion-option value="0"> Newest to Oldest </ion-option>\n        <ion-option value="1"> Oldest to Newest </ion-option>\n      </ion-select>\n    </ion-item>\n\n  <div class="list-big">\n    <ion-list>\n      <ion-col class="list-item" ion-item *ngFor="let item of items">\n          <ion-row no-padding class="content-row">\n              <!-- <ion-col no-padding width-33 class="item-avatar"> -->\n                <!-- <preload-image class="avatar-image" [ratio]="{w:1, h:1}" [src]="item.image"></preload-image> -->\n              <!-- </ion-col> -->\n    \n              <ion-thumbnail item-start>\n                  <!-- <img [src]="item._embedded.author[0].name"> -->\n                <img *ngIf="item.featured_media > 0" \n                [src]="item._embedded[\'wp:featuredmedia\'][0].media_details.sizes.thumbnail.source_url"/>\n              </ion-thumbnail>\n    \n              <ion-col no-padding width-57 class="item-content">\n                <h3 class="item-title">{{item.title.rendered}}</h3> <br/>\n                <span class="item-title"> {{item.date | date: \'dd/MM/yyyy\'}} at {{item.date | date: \'hh:mm a\'}} </span>\n                <!-- <p class="item-description" rows="3" [innerHTML]="item.excerpt.rendered"></p> -->\n                <br/>\n                <p> <span *ngFor="let category of item._embedded[\'wp:term\'][0]"> \n                  <u> {{ category.name }} </u> &nbsp; </span> </p>\n                  <br/>\n                <span> By <u> {{ item._embedded.author[0].name }} </u></span> &nbsp; \n                <button class="action-button" ion-button clear small color="danger" \n                (click)="sharePost(item)">\n                  <ion-icon name=\'share-alt\'></ion-icon>\n                </button>\n                <!-- <span> <ion-icon name="share" (click)="shareIt(item)"></ion-icon> </span> -->\n    \n                <!-- <span> {{ item._embedded.featuredmedia[0].href }} </span> -->\n                <!-- <img src="{{ item._embedded[\'wp:featuredmedia\'][0].source_url }}"> -->\n                <!-- You can change the rows quantity by using rows="X", where X can be any number for example: rows="4" -->\n              </ion-col>\n\n              \n\n              <ion-col no-padding width-10 class="item-icon">\n                <ion-icon name="arrow-forward" ></ion-icon>\n              </ion-col>\n            </ion-row>\n          </ion-col>\n    </ion-list>\n  </div>\n\n  <ion-infinite-scroll [enabled]="morePagesAvailable" (ionInfinite)="loadMorePosts($event)">\n    <ion-infinite-scroll-content\n    loadingSpinner="bubbles"\n    loadingText="Loading more posts...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  \n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\list-1\list-1.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4__list_1_service__["a" /* List1Service */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_7__wordpress_integration_wordpress_integration_service__["a" /* WordpressService */]])
    ], List1Page);
    return List1Page;
}());

//# sourceMappingURL=list-1.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsNavigationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_1_list_1__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsNavigationPage = (function () {
    function TabsNavigationPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__list_1_list_1__["a" /* List1Page */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__profile_profile__["a" /* ProfilePage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__["a" /* NotificationsPage */];
    }
    TabsNavigationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tabs-navigation',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\tabs-navigation\tabs-navigation.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="{{\'LISTING\' | translate}}" tabIcon="apps"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="{{\'PROFILE\' | translate}}" tabIcon="person"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="{{\'NOTIFICATIONS\' | translate}}" tabIcon="notifications"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\tabs-navigation\tabs-navigation.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsNavigationPage);
    return TabsNavigationPage;
}());

//# sourceMappingURL=tabs-navigation.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__followers_followers__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_model__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_service__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProfilePage = (function () {
    function ProfilePage(menu, app, navParams, profileService, socialSharing) {
        this.menu = menu;
        this.app = app;
        this.navParams = navParams;
        this.profileService = profileService;
        this.socialSharing = socialSharing;
        this.profile = new __WEBPACK_IMPORTED_MODULE_4__profile_model__["a" /* ProfileModel */]();
        this.display = "list";
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.profileService.getData()
            .then(function (data) {
            _this.profile.user = data.user;
            _this.profile.following = data.following;
            _this.profile.followers = data.followers;
            _this.profile.posts = data.posts;
        });
    };
    ProfilePage.prototype.goToFollowersList = function () {
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__followers_followers__["a" /* FollowersPage */], {
            list: this.profile.followers
        });
    };
    ProfilePage.prototype.goToFollowingList = function () {
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__followers_followers__["a" /* FollowersPage */], {
            list: this.profile.following
        });
    };
    ProfilePage.prototype.goToSettings = function () {
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__settings_settings__["a" /* SettingsPage */]);
    };
    ProfilePage.prototype.onSegmentChanged = function (segmentButton) {
        // console.log('Segment changed to', segmentButton.value);
    };
    ProfilePage.prototype.onSegmentSelected = function (segmentButton) {
        // console.log('Segment selected', segmentButton.value);
    };
    ProfilePage.prototype.sharePost = function (post) {
        //this code is to use the social sharing plugin
        // message, subject, file, url
        this.socialSharing.share(post.description, post.title, post.image)
            .then(function () {
            console.log('Success!');
        })
            .catch(function () {
            console.log('Error');
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'profile-page',template:/*ion-inline-start:"E:\Saifa\hyroglf_4a\src\pages\profile\profile.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'PROFILE\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="profile-content">\n  <div class="user-details">\n    <ion-row class="user-main-data-row">\n      <ion-col no-padding width-33>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [(src)]="profile.user.image" alt="profile.user.name" title="profile.user.name"></preload-image>\n      </ion-col>\n      <ion-col no-padding>\n        <ion-row class="social-presence-row">\n          <ion-col width-50 class="social-presence-item">\n            <a (click)="goToFollowersList()">\n              <h2 class="social-presence-value">{{profile.followers.length}}</h2>\n              <h4 class="social-presence-title">{{\'FOLLOWERS\' | translate }}</h4>\n            </a>\n          </ion-col>\n          <ion-col width-50 class="social-presence-item">\n            <a (click)="goToFollowingList()">\n              <h2 class="social-presence-value">{{profile.following.length}}</h2>\n              <h4 class="social-presence-title">{{\'FOLLOWING\' | translate }}</h4>\n            </a>\n          </ion-col>\n        </ion-row>\n        <ion-row class="profile-action-row">\n          <ion-col no-padding>\n            <button ion-button block small (click)="goToSettings()">\n              {{\'EDIT_PROFILE\' | translate}}\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n    <ion-row wrap class="user-bio-row">\n      <ion-col no-padding width-50>\n        <h2 class="user-name">{{profile.user.name}}</h2>\n      </ion-col>\n      <ion-col no-padding width-50>\n        <span class="user-location">{{profile.user.location}}</span>\n      </ion-col>\n      <ion-col no-padding width-100>\n        <p class="user-description">\n          {{profile.user.about}}\n        </p>\n      </ion-col>\n    </ion-row>\n    <ion-segment class="user-content-segment" [(ngModel)]="display" (ionChange)="onSegmentChanged($event)">\n      <ion-segment-button value="grid" (ionSelect)="onSegmentSelected($event)">\n        {{\'GRID\' | translate}}\n      </ion-segment-button>\n      <ion-segment-button value="list" (ionSelect)="onSegmentSelected($event)">\n        {{\'LIST\' | translate}}\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n  <div [ngSwitch]="display" class="user-content">\n    <div *ngSwitchCase="\'list\'" class="list-view">\n      <div class="list-item" *ngFor="let post of profile.posts">\n        <span class="item-date">{{post.date}}</span>\n        <ion-card>\n          <preload-image [ratio]="{w:1, h:1}" [src]="post.image" title=""></preload-image>\n          <ion-card-content>\n            <p class="item-text">\n              {{post.description}}\n            </p>\n          </ion-card-content>\n          <ion-row no-padding class="actions-row">\n            <ion-col no-padding width-30 text-left>\n              <button class="action-button" ion-button clear small color="danger" icon-start>\n                <ion-icon isActive="{{post.liked}}" name=\'heart\'></ion-icon>\n                  {{post.likes}} {{\'LIKES\' | translate}}\n              </button>\n            </ion-col>\n            <ion-col no-padding width-45 text-center>\n              <button class="action-button" ion-button clear small color="danger" icon-start>\n                <ion-icon name=\'chatbubbles\'></ion-icon>\n                  {{post.comments}} {{\'COMMENTS\' | translate}}\n              </button>\n            </ion-col>\n            <ion-col no-padding width-25 text-right>\n              <button class="action-button" ion-button clear small color="danger" icon-start (click)="sharePost(post)">\n                <ion-icon name=\'share-alt\'></ion-icon>\n                {{\'SHARE\' | translate}}\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </div>\n    </div>\n    <div *ngSwitchCase="\'grid\'" class="grid-view">\n      <ion-row wrap class="grid-row">\n        <ion-col width-33 class="grid-item" *ngFor="let post of profile.posts">\n          <preload-image [ratio]="{w:1, h:1}" [src]="post.image" title="ion2FullApp"></preload-image>\n        </ion-col>\n      </ion-row>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Saifa\hyroglf_4a\src\pages\profile\profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["MenuController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_5__profile_service__["a" /* ProfileService */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

},[416]);
//# sourceMappingURL=main.js.map