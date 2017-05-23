import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-email-sent',
  templateUrl: 'usr-success.html'
})
export class EmailSentPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('FORGOT USERNAME');
    }
}
