import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { MyInsuranceAnsPage1 } from '../myInsurance-ans/myInsurance-ans1';
import { MyInsuranceAnsPage2 } from '../myInsurance-ans/myInsurance-ans2';
import { MyInsuranceAnsPage3 } from '../myInsurance-ans/myInsurance-ans3';
import { MyInsuranceAnsPage4 } from '../myInsurance-ans/myInsurance-ans4';
import { MyInsuranceAnsPage5 } from '../myInsurance-ans/myInsurance-ans5';
import { MyInsuranceAnsPage6 } from '../myInsurance-ans/myInsurance-ans6';
import { MyInsuranceAnsPage7 } from '../myInsurance-ans/myInsurance-ans7';
import { MyInsuranceAnsPage8 } from '../myInsurance-ans/myInsurance-ans8';

@Component({
  selector: 'page-faq-my-insurance',
  templateUrl: 'myInsurance-faq.html'
})
export class MyInsuranceFaqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

  myInsuranceAnsPage1() {
	  this.navCtrl.push(MyInsuranceAnsPage1);
  }
  
  myInsuranceAnsPage2() {
	  this.navCtrl.push(MyInsuranceAnsPage2);
  }
  
  myInsuranceAnsPage3() {
	  this.navCtrl.push(MyInsuranceAnsPage3);
  }
  
  myInsuranceAnsPage4() {
	  this.navCtrl.push(MyInsuranceAnsPage4);
  }
  
  myInsuranceAnsPage5() {
	  this.navCtrl.push(MyInsuranceAnsPage5);
  }
  
  myInsuranceAnsPage6() {
	  this.navCtrl.push(MyInsuranceAnsPage6);
  }
  
  myInsuranceAnsPage7() {
	  this.navCtrl.push(MyInsuranceAnsPage7);
  }
  
  myInsuranceAnsPage8() {
	  this.navCtrl.push(MyInsuranceAnsPage8);
  }
}
