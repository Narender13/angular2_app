import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-term-conditions',
  templateUrl: 'term-conditions.html'
})
export class TermConditionsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) { }
  
  close() {
	  this.viewCtrl.dismiss();
  }
}
