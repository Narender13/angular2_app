import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-ans-my-insurance',
  templateUrl: 'myInsurance-ans4.html'
})
export class MyInsuranceAnsPage4 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }
}
