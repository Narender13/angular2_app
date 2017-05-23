import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-ans-billing',
  templateUrl: 'billing-ans14.html'
})
export class BillingAnsPage14 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
