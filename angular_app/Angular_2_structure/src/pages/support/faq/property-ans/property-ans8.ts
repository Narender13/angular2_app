import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-ans-property',
  templateUrl: 'property-ans8.html'
})
export class PropertyAnsPage8 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

 ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

}
