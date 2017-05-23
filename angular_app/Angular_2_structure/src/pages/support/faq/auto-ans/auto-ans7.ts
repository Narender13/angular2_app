import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-ans-auto',
  templateUrl: 'auto-ans7.html'
})
export class AutoAnsPage7 {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController) {}

 ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

  repairShopPage() {
        let browser = new InAppBrowser('http://www.geoaccess.com/hanover/po/gateway.asp?status=E', '_blank', 'location=yes');
    }

}
