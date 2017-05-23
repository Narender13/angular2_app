import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../login/login';

@Component({
  selector: 'page-reg-success',
  templateUrl: 'reg-success.html'
})
export class RegSuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
 
 loginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

}
