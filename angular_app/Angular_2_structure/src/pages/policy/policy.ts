//Angular Module Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

//App Component Importsimport { Component, OnInit } from '@angular/core';
import { HomePolicyPage } from './home/homepolicy';
import { AutoPolicyPage } from './auto/autopolicy';
import { UmbrellaPolicyPage } from './umbrella/umbrellapolicy';
import { WaterCraftPolicyPage } from './watercraft/watercraftpolicy';
import { DwellingPolicyPage } from './dwelling/dwellingpolicy';

@Component({
    selector: 'page-policy',
    templateUrl: 'policy.html'
})
export class MyPolicyPage implements OnInit {

    homePolicyData: any;
    autoPolicyData: any;
    customerName: any;
    umbrellaPolicyData: any;
    waterPolicyData: any;
    firePolicyData: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('HOME');
    }

    ngOnInit() {
        this.homePolicyData = this.navParams.get('param1');
        this.autoPolicyData = this.navParams.get('param2');
        this.customerName = this.navParams.get('param3');
        this.umbrellaPolicyData = this.navParams.get('param4');
        this.waterPolicyData = this.navParams.get('param5');
        this.firePolicyData = this.navParams.get('param6');
    }

    homePage(homePolicy, index) {
        this.navCtrl.push(HomePolicyPage, {
            param1: homePolicy,
            param2: index,
            param3: this.customerName
        });
    }

    autoPage(autoPolicy, index) {
        this.navCtrl.push(AutoPolicyPage, {
            param1: autoPolicy,
            param2: index,
            param3: this.customerName
        });
    }

    umbrellaPage(umbrellaPolicy, index) {
        this.navCtrl.push(UmbrellaPolicyPage, {
            param1: umbrellaPolicy,
            param2: index,
            param3: this.customerName
        });
    }

    waterPage(waterPolicy, index) {
        this.navCtrl.push(WaterCraftPolicyPage, {
            param1: waterPolicy,
            param2: index,
            param3: this.customerName
        });
    }

    firePage(firePolicy, index) {
        this.navCtrl.push(DwellingPolicyPage, {
            param1: firePolicy,
            param2: index,
            param3: this.customerName
        });
    }
}
