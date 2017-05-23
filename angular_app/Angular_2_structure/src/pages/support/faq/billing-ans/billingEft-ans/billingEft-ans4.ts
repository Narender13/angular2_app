import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-ans-billingEft',
  templateUrl: 'billingEft-ans4.html'
})
export class BillingEftAnsPage4 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

}
