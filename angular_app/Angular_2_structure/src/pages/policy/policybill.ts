//Angular Module Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

//App Component Importsimport { Component, OnInit } from '@angular/core';
import { HomePolicyPage } from './home/homepolicy';
import { AutoPolicyPage } from './auto/autopolicy';
import { UmbrellaPolicyPage } from './umbrella/umbrellapolicy';
import { WaterCraftPolicyPage } from './watercraft/watercraftpolicy';
import { DwellingPolicyPage } from './dwelling/dwellingpolicy';

//App Services Imports
import { Globals } from '../../providers/globals';
import { GetPaymentusService } from '../../providers/getPaymentusUrl.service';
import { ConfigService } from '../../providers/config.service';

@Component({
    selector: 'page-policy',
    templateUrl: 'policybill.html'
})
export class MyPolicyBillsPage implements OnInit {

    homePolicyData: any;
    autoPolicyData: any;
    customerName: any;
    umbrellaPolicyData: any;
    waterPolicyData: any;
    firePolicyData: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public global: Globals,
        public http: Http,
        public _config: ConfigService,
        public paymentusService: GetPaymentusService) {
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

    myPolicyBillsPage(policyData) {
        let text: string;
        this.paymentusService.getPolicy(policyData)
            .map((policyRequest) => {
               if (policyRequest.header.error.errorCode === '0001' ||
                     policyRequest.header.status === 'UNAUTHORIZED'){
                    this._config.showError();
                }  else if(policyRequest.header.status === 'UNAUTHORIZED'){
                             this._config.showUnathorisedError();
                          
                }else if(policyRequest.header.error.errorCode === '1001'){
                             this._config.showUnexpectedError();
                           
                }else if(policyRequest.status === '403' ||
                          policyRequest.header.status === 'FORBIDDEN'){
                             this._config.showSessionTimeOutError();
                             
                 }else{
                this.global.payBill(policyRequest.customerPayment.paymentusURL);
            }
            }).subscribe(response => { },
                    error => {
                        this._config.showError();
                    });
    }
}
