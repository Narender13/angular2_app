import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AutoFaqPage} from './auto-faq/auto-faq';
import {PropertyFaqPage} from './property-faq/property-faq';
import {MyInsuranceFaqPage} from './myInsurance-faq/myInsurance-faq';
import {BillingFaqPage} from './billing-faq/billing-faq';
import {DashboardPage} from '../../dashboard/dashboard';

@Component({
    selector: 'page-faq',
    templateUrl: 'faq.html'
})
export class FaqPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    autoFaqPage() {
        this.navCtrl.push(AutoFaqPage);
    }

    propertyFaqPage(){
        this.navCtrl.push(PropertyFaqPage);
    }
    
    myInsuranceFaqPage(){
        this.navCtrl.push(MyInsuranceFaqPage);
    }

    billingFaqPage(){
        this.navCtrl.push(BillingFaqPage);
    }

    backDashboard = function () {
        this.navCtrl.setRoot(DashboardPage);
    }
}
