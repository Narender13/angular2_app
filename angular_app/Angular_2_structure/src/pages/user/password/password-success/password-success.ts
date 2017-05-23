import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../../login/login';


@Component({
  selector: 'page-password-success',
  templateUrl: 'password-success.html'
})
export class PasswordSuccessPage {

  constructor(public navCtrl: NavController) { }

  loginPage = function() {
      this.navCtrl.setRoot(LoginPage);
   }

}
