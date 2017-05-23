import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-ans-billing',
  templateUrl: 'billing-ans7.html'
})
export class BillingAnsPage7 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

   ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

}
