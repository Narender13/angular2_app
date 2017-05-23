import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PasswordSuccessPage } from '../password-success/password-success';


@Component({
  selector: 'page-create-password',
  templateUrl: 'create-password.html'
})
export class CreatePasswordPage {

  constructor(public navCtrl: NavController) { }

  passwordSuccessPage = function () {
    this.navCtrl.setRoot(PasswordSuccessPage);
  }

}
