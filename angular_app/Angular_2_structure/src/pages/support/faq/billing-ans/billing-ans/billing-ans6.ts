import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-ans-billing',
  templateUrl: 'billing-ans6.html'
})
export class BillingAnsPage6 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

   ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

}
