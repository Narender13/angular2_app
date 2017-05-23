import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { PropertyAnsPage1 } from '../property-ans/property-ans1';
import { PropertyAnsPage2 } from '../property-ans/property-ans2';
import { PropertyAnsPage3 } from '../property-ans/property-ans3';
import { PropertyAnsPage4 } from '../property-ans/property-ans4';
import { PropertyAnsPage5 } from '../property-ans/property-ans5';
import { PropertyAnsPage6 } from '../property-ans/property-ans6';
import { PropertyAnsPage7 } from '../property-ans/property-ans7';
import { PropertyAnsPage8 } from '../property-ans/property-ans8';
import { PropertyAnsPage9 } from '../property-ans/property-ans9';
import { PropertyAnsPage10 } from '../property-ans/property-ans10';
import { PropertyAnsPage11 } from '../property-ans/property-ans11';
import { PropertyAnsPage12 } from '../property-ans/property-ans12';

@Component({
  selector: 'property-faq-auto',
  templateUrl: 'property-faq.html'
})
export class PropertyFaqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

  propertyAnsPage1() {
	  this.navCtrl.push(PropertyAnsPage1);
  }
  
  propertyAnsPage2() {
	  this.navCtrl.push(PropertyAnsPage2);
  }
  
  propertyAnsPage3() {
	  this.navCtrl.push(PropertyAnsPage3);
  }
  
  propertyAnsPage4() {
	  this.navCtrl.push(PropertyAnsPage4);
  }
  
  propertyAnsPage5() {
	  this.navCtrl.push(PropertyAnsPage5);
  }
  
  propertyAnsPage6() {
	  this.navCtrl.push(PropertyAnsPage6);
  }
  
  propertyAnsPage7() {
	  this.navCtrl.push(PropertyAnsPage7);
  }
  
  propertyAnsPage8() {
	  this.navCtrl.push(PropertyAnsPage8);
  }
  
  propertyAnsPage9() {
	  this.navCtrl.push(PropertyAnsPage9);
  }
  
  propertyAnsPage10() {
	  this.navCtrl.push(PropertyAnsPage10);
  }
  
  propertyAnsPage11() {
	  this.navCtrl.push(PropertyAnsPage11);
  }
  
  propertyAnsPage12() {
	  this.navCtrl.push(PropertyAnsPage12);
  }
  
}
