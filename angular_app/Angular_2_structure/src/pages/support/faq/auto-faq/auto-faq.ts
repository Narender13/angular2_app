import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { AutoAnsPage1 } from '../auto-ans/auto-ans1';
import { AutoAnsPage2 } from '../auto-ans/auto-ans2';
import { AutoAnsPage3 } from '../auto-ans/auto-ans3';
import { AutoAnsPage4 } from '../auto-ans/auto-ans4';
import { AutoAnsPage5 } from '../auto-ans/auto-ans5';
import { AutoAnsPage6 } from '../auto-ans/auto-ans6';
import { AutoAnsPage7 } from '../auto-ans/auto-ans7';
import { AutoAnsPage8 } from '../auto-ans/auto-ans8';
import { AutoAnsPage9 } from '../auto-ans/auto-ans9';
import { AutoAnsPage10 } from '../auto-ans/auto-ans10';
import { AutoAnsPage11 } from '../auto-ans/auto-ans11';
import { AutoAnsPage12 } from '../auto-ans/auto-ans12';
import { AutoAnsPage13 } from '../auto-ans/auto-ans13';
import { AutoAnsPage14 } from '../auto-ans/auto-ans14';
import { AutoAnsPage15 } from '../auto-ans/auto-ans15';

@Component({
  selector: 'page-faq-auto',
  templateUrl: 'auto-faq.html'
})
export class AutoFaqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

  autoAnsPage1() {
	  this.navCtrl.push(AutoAnsPage1);
  }
  
  autoAnsPage2() {
	  this.navCtrl.push(AutoAnsPage2);
  }
  
  autoAnsPage3() {
	  this.navCtrl.push(AutoAnsPage3);
  }
  
  autoAnsPage4() {
	  this.navCtrl.push(AutoAnsPage4);
  }
  
  autoAnsPage5() {
	  this.navCtrl.push(AutoAnsPage5);
  }
  
  autoAnsPage6() {
	  this.navCtrl.push(AutoAnsPage6);
  }
  
  autoAnsPage7() {
	  this.navCtrl.push(AutoAnsPage7);
  }
  
  autoAnsPage8() {
	  this.navCtrl.push(AutoAnsPage8);
  }
  
  autoAnsPage9() {
	  this.navCtrl.push(AutoAnsPage9);
  }
  
  autoAnsPage10() {
	  this.navCtrl.push(AutoAnsPage10);
  }
  
  autoAnsPage11() {
	  this.navCtrl.push(AutoAnsPage11);
  }
  
  autoAnsPage12() {
	  this.navCtrl.push(AutoAnsPage12);
  }
  
  autoAnsPage13() {
	  this.navCtrl.push(AutoAnsPage13);
  }
  
  autoAnsPage14() {
	  this.navCtrl.push(AutoAnsPage14);
  }
  
  autoAnsPage15() {
	  this.navCtrl.push(AutoAnsPage15);
  }

}
