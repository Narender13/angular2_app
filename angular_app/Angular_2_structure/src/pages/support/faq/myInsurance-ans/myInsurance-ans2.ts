import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-ans-my-insurance',
  templateUrl: 'myInsurance-ans2.html'
})
export class MyInsuranceAnsPage2 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

 ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }
}
