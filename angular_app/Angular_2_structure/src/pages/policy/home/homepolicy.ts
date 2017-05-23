//Angular Module Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigService } from '../../../providers/config.service';
import { ViewController } from 'ionic-angular';
//App Services Imports
import { Globals } from '../../../providers/globals';
import { GetPaymentusService } from '../../../providers/getPaymentusUrl.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { PolicyDocumentPage } from '../document/policydocument';

@Component({
    selector: 'page-home-policy',
    templateUrl: 'homepolicy.html'
})
export class HomePolicyPage implements OnInit {

    homePolicyData: any;
    index: number;
    customerName: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public global: Globals, public http: Http,
        public _config: ConfigService,
        public paymentusService: GetPaymentusService,
        public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('My Policy');
    }

    ngOnInit() {
        this.homePolicyData = this.navParams.get('param1');
        this.index = this.navParams.get('param2');
        this.customerName = this.navParams.get('param3');
        this.homePolicyData.csppolicyNickName = "HOME";
    }

    policyDocumentPage() {
        this.navCtrl.push(PolicyDocumentPage, {
            param1: this.homePolicyData,
            param2: this.index,
            param3: this.customerName
        });
    }

    myBillsPage() {
        let text: string;
        this.paymentusService.getPolicy(this.homePolicyData)
            .map((policyRequest) => {
                 if (policyRequest.header.error.errorCode === '0001') {
                    this._config.showError();
                }else if(policyRequest.header.status === 'UNAUTHORIZED'){
                             this._config.showUnathorisedError();
                }else if(policyRequest.header.error.errorCode === '1001'){
                             this._config.showUnexpectedError();
                }else if(policyRequest.status === '403' ||
                         policyRequest.header.status === 'FORBIDDEN'){
                             this._config.showSessionTimeOutError();
                } else{
                this.global.payBill(policyRequest.customerPayment.paymentusURL);
            }
            }).subscribe(response => { },
                    error => {
                        this._config.showError();
                    });


    }

}
