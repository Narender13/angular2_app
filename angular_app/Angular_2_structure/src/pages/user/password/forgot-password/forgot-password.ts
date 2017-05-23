import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CreatePasswordPage } from '../create-password/create-password';


@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  constructor(public navCtrl: NavController) { }

  createPasswordPage = function () {
    this.navCtrl.setRoot(CreatePasswordPage);
  }

}
