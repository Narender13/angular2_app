import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { BillingAnsPage1 } from '../billing-ans/billing-ans/billing-ans1';
import { BillingAnsPage2 } from '../billing-ans/billing-ans/billing-ans2';
import { BillingAnsPage3 } from '../billing-ans/billing-ans/billing-ans3';
import { BillingAnsPage4 } from '../billing-ans/billing-ans/billing-ans4';
import { BillingAnsPage5 } from '../billing-ans/billing-ans/billing-ans5';
import { BillingAnsPage6 } from '../billing-ans/billing-ans/billing-ans6';
import { BillingAnsPage7 } from '../billing-ans/billing-ans/billing-ans7';
import { BillingAnsPage8 } from '../billing-ans/billing-ans/billing-ans8';
import { BillingAnsPage9 } from '../billing-ans/billing-ans/billing-ans9';
import { BillingAnsPage10 } from '../billing-ans/billing-ans/billing-ans10';
import { BillingAnsPage11 } from '../billing-ans/billing-ans/billing-ans11';
import { BillingAnsPage12 } from '../billing-ans/billing-ans/billing-ans12';
import { BillingAnsPage13 } from '../billing-ans/billing-ans/billing-ans13';
import { BillingAnsPage14 } from '../billing-ans/billing-ans/billing-ans14';
import { BillingAnsPage15 } from '../billing-ans/billing-ans/billing-ans15';
import { BillingAnsPage16 } from '../billing-ans/billing-ans/billing-ans16';
import { BillingAnsPage17 } from '../billing-ans/billing-ans/billing-ans17';
import { BillingAnsPage18 } from '../billing-ans/billing-ans/billing-ans18';

import { BillingEftAnsPage1 } from '../billing-ans/billingEft-ans/billingEft-ans1';
import { BillingEftAnsPage2 } from '../billing-ans/billingEft-ans/billingEft-ans2';
import { BillingEftAnsPage3 } from '../billing-ans/billingEft-ans/billingEft-ans3';
import { BillingEftAnsPage4 } from '../billing-ans/billingEft-ans/billingEft-ans4';
import { BillingEftAnsPage5 } from '../billing-ans/billingEft-ans/billingEft-ans5';
import { BillingEftAnsPage6 } from '../billing-ans/billingEft-ans/billingEft-ans6';
import { BillingEftAnsPage7 } from '../billing-ans/billingEft-ans/billingEft-ans7';
import { BillingEftAnsPage8 } from '../billing-ans/billingEft-ans/billingEft-ans8';
import { BillingEftAnsPage9 } from '../billing-ans/billingEft-ans/billingEft-ans9';
import { BillingEftAnsPage10 } from '../billing-ans/billingEft-ans/billingEft-ans10';
import { BillingEftAnsPage11 } from '../billing-ans/billingEft-ans/billingEft-ans11';
import { BillingEftAnsPage12 } from '../billing-ans/billingEft-ans/billingEft-ans12';
import { BillingEftAnsPage13 } from '../billing-ans/billingEft-ans/billingEft-ans13';
import { BillingEftAnsPage14 } from '../billing-ans/billingEft-ans/billingEft-ans14';
import { BillingEftAnsPage15 } from '../billing-ans/billingEft-ans/billingEft-ans15';
import { BillingEftAnsPage16 } from '../billing-ans/billingEft-ans/billingEft-ans16';
import { BillingEftAnsPage17 } from '../billing-ans/billingEft-ans/billingEft-ans17';
import { BillingEftAnsPage18 } from '../billing-ans/billingEft-ans/billingEft-ans18';


@Component({
  selector: 'page-faq-billing',
  templateUrl: 'billing-faq.html'
})
export class BillingFaqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

  billingAnsPage1() {
    this.navCtrl.push(BillingAnsPage1);
  }
  
  billingAnsPage2() {
    this.navCtrl.push(BillingAnsPage2);
  }
  
  billingAnsPage3() {
    this.navCtrl.push(BillingAnsPage3);
  }
  
  billingAnsPage4() {
    this.navCtrl.push(BillingAnsPage4);
  }
  
  billingAnsPage5() {
    this.navCtrl.push(BillingAnsPage5);
  }

  billingAnsPage6() {
    this.navCtrl.push(BillingAnsPage6);
  }
  
  billingAnsPage7() {
    this.navCtrl.push(BillingAnsPage7);
  }
  
  billingAnsPage8() {
    this.navCtrl.push(BillingAnsPage8);
  }
  
  billingAnsPage9() {
    this.navCtrl.push(BillingAnsPage9);
  }
  
  billingAnsPage10() {
    this.navCtrl.push(BillingAnsPage10);
  }
  
  billingAnsPage11() {
    this.navCtrl.push(BillingAnsPage11);
  }
  
  billingAnsPage12() {
    this.navCtrl.push(BillingAnsPage12);
  }
    
  billingAnsPage13() {
    this.navCtrl.push(BillingAnsPage13);
  }
  
  billingAnsPage14() {
    this.navCtrl.push(BillingAnsPage14);
  }
  
  billingAnsPage15() {
    this.navCtrl.push(BillingAnsPage15);
  }

  billingAnsPage16() {
    this.navCtrl.push(BillingAnsPage16);
  }

  billingAnsPage17() {
    this.navCtrl.push(BillingAnsPage17);
  }

  billingAnsPage18() {
    this.navCtrl.push(BillingAnsPage18);
  }



  billingEftAnsPage1() {
    this.navCtrl.push(BillingEftAnsPage1);
  }

  billingEftAnsPage2() {
    this.navCtrl.push(BillingEftAnsPage2);
  }

  billingEftAnsPage3() {
    this.navCtrl.push(BillingEftAnsPage3);
  }

  billingEftAnsPage4() {
    this.navCtrl.push(BillingEftAnsPage4);
  }

  billingEftAnsPage5() {
    this.navCtrl.push(BillingEftAnsPage5);
  }

  billingEftAnsPage6() {
    this.navCtrl.push(BillingEftAnsPage6);
  }

  billingEftAnsPage7() {
    this.navCtrl.push(BillingEftAnsPage7);
  }

  billingEftAnsPage8() {
    this.navCtrl.push(BillingEftAnsPage8);
  }

  billingEftAnsPage9() {
    this.navCtrl.push(BillingEftAnsPage9);
  }

  billingEftAnsPage10() {
    this.navCtrl.push(BillingEftAnsPage10);
  }

  billingEftAnsPage11() {
    this.navCtrl.push(BillingEftAnsPage11);
  }

  billingEftAnsPage12() {
    this.navCtrl.push(BillingEftAnsPage12);
  }

  billingEftAnsPage13() {
    this.navCtrl.push(BillingEftAnsPage13);
  }

  billingEftAnsPage14() {
    this.navCtrl.push(BillingEftAnsPage14);
  }

  billingEftAnsPage15() {
    this.navCtrl.push(BillingEftAnsPage15);
  }

  billingEftAnsPage16() {
    this.navCtrl.push(BillingEftAnsPage16);
  }

  billingEftAnsPage17() {
    this.navCtrl.push(BillingEftAnsPage17);
  }

  billingEftAnsPage18() {
    this.navCtrl.push(BillingEftAnsPage18);
  }

}
