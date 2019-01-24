import { UserModel } from './../profile/profile.model';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  registration_form: FormGroup;
  error_message: string;

  user:UserModel = new UserModel();
  success: string;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, 
    public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.registration_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  register(user:any){
    this.authProvider.register(user).subscribe(data => {
      this.success = "Registered successfully!";
    }, error => {
      this.error_message = "Could not register!";
    });
  }

}