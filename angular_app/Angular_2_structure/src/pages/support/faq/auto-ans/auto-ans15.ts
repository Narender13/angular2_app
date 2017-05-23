import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-ans-auto',
  templateUrl: 'auto-ans15.html'
})
export class AutoAnsPage15 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
