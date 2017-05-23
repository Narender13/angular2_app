import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { LoginPage } from '../login';

@Component({
  selector: 'page-login-terms',
  templateUrl: 'login-terms.html'
})
export class LoginTermsPage {

  constructor(public navCtrl: NavController, public platform: Platform) {
    this.platform = platform;
  }

  loginPage() {
    localStorage.setItem('firstRun', "true");
    this.navCtrl.push(LoginPage);
  }
  exitApp() {
    window.localStorage.removeItem("initialRun");
    this.platform.exitApp();
  }
}
