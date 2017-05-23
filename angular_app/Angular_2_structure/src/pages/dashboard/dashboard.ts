import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GetPolicyListService } from '../../providers/getPolicyList.service';
import { ConfigService } from '../../providers/config.service';
import { GetCustomerById } from '../../providers/getCustomerById.service';
import { Globals } from '../../providers/globals';
import { MyPolicyPage } from '../policy/policy';
import { MyAgentPage } from '../agent/agent';
import { ContactUsPage } from '../support/contact/contact-us';
import { RoadsideAssistancePage } from '../support/roadside/roadside-assistance';
import { AccidentSupportPage } from '../support/accident/accident-support';
import { IdCardPage } from '../idcard/id-card';
import { GetPaymentusService } from '../../providers/getPaymentusUrl.service';
import { MyPolicyBillsPage } from '../policy/policybill';
import { LoginPage } from '../user/login/login';

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})

export class DashboardPage {
    policyListData: any;
    showPolicies: boolean = false;
    customerinfo: any;
    loginres: any;
    spinner = true;
    policyFirstLoad: any;
    homePolicyData: any = [];
    autoPolicyData: any = [];
    vehiclelist: any = [];
    umbrellaPolicyData: any = [];
    waterPolicyData: any = [];
    firePolicyData: any = [];
    agentData: any;
    titlemsg: any;
    subtitlemsg: any;
    isClickEnable = true;
    isIdClickEnable = true;
    androidStatus: any;
    iosStatus: any;
    dashboardClass: any = "dashboard";


    constructor(public navCtrl: NavController,
        public _policyListService: GetPolicyListService,
        public _getCustomerById: GetCustomerById,
        public _navParams: NavParams,
        public _storageService: ConfigService,
        public alertCtrl: AlertController,
        public global: Globals,
        public paymentusService: GetPaymentusService,
        public plt: Platform
    ) {
        this.policyFirstLoad = localStorage.getItem('policyFirstLoad');
    }

    ngOnInit() {
        this.loginres = this._navParams.get('param');
        if (this.policyFirstLoad == 'true') {
            this.getCustomerInfo();
            localStorage.setItem('policyFirstLoad', "false");
        }
        else if (this.policyFirstLoad == 'false') {
            this.spinner = false;
            this.policyListData = JSON.parse(localStorage.getItem('policyDataLocal'));
            this.customerinfo = JSON.parse(localStorage.getItem('customerinfoLocal'));
            if (this.policyListData.policyJsonList == null) {
                this.isClickEnable = false;
                this.isIdClickEnable = false;
            }
            else {
                this.getVehicleList();
            }
        }
        if (this.plt.is('android')) {
            this.dashboardClass = "dashboardAndroid";
        }
        this.plt.registerBackButtonAction(() => {
            if (!this.navCtrl.canGoBack()) {
                window['plugins'].appMinimize.minimize();
            }
            else {
                return this.navCtrl.pop();
            }
        });
    }

    getCustomerInfo() {
        let usrId = this._storageService.getUserId();
        this._getCustomerById.getCustomerInfo(usrId)
            .map((customerinfo) => {
                //Store response in customerinfo Object
                if (customerinfo.header.error.errorCode === '0001') {
                    this._storageService.showError();
                    this.spinner = false;
                } else if (customerinfo.header.status === 'UNAUTHORIZED') {
                    this._storageService.showUnathorisedError();
                    this.spinner = false;
                } else if (customerinfo.header.error.errorCode === '1001') {
                    this._storageService.showUnexpectedError();
                    this.spinner = false;
                } else if (customerinfo.status === '403' ||
                    customerinfo.header.status === 'FORBIDDEN') {
                    this._storageService.showSessionTimeOutError();
                    this.spinner = false;
                } else {
                    this.customerinfo = customerinfo;
                    localStorage.setItem('customerinfoLocal', JSON.stringify(this.customerinfo));
                    this._storageService.setCustomerNbr(this.customerinfo.customerJson.customerNbr);
                    if (this.customerinfo.customerJson.status == true) {
                        this._policyListService.getPolicyList()
                            .map((policyListData) => {
                                this.spinner = false;
                                if (policyListData.header.error.errorCode === '0001') {
                                    this._storageService.showError();
                                    this.spinner = false;
                                } else if (policyListData.header.status === 'UNAUTHORIZED' ||
                                    policyListData.header.status === 'FORBIDDEN') {
                                    this._storageService.showUnathorisedError();
                                    this.spinner = false;
                                } else if (policyListData.header.status === '1001') {
                                    this._storageService.showUnexpectedError();
                                    this.spinner = false;
                                } else if (policyListData.header.status === '403') {
                                    this._storageService.showSessionTimeOutError();
                                    this.spinner = false;
                                } else {

                                    if (policyListData.responseCode == "0000") {
                                        this.isClickEnable = true;
                                        this.isIdClickEnable = true;
                                        this.policyListData = policyListData;
                                        localStorage.setItem('policyDataLocal', JSON.stringify(this.policyListData));
                                        this.getVehicleList();
                                    }
                                    else if (policyListData.responseCode == "0001") {
                                        this.policyListData = policyListData;
                                        localStorage.setItem('policyDataLocal', JSON.stringify(this.policyListData));
                                        this.isClickEnable = false;
                                        this.isIdClickEnable = false;
                                    }
                                }
                            }).subscribe( response => { },
                            error => {
                                this._storageService.showError();
                                this.spinner = false;
                            });
                    }
                    else if (this.customerinfo.customerJson.status == false) {
                        this.spinner = false;
                        this.titlemsg = "CUSTOMER INFORMATION";
                        this.subtitlemsg = "No Customer Information found for the entered login credentials.";
                        this.showAlert(this.titlemsg, this.subtitlemsg);
                    }
                }

            })
            .subscribe(response => { },
            error => {
                this._storageService.showError();
                this.spinner = false;
            })
    }

    getVehicleList() {
        let homeArr = 0;
        let autoArr = 0;
        let vehArr = 0;
        let umbArr = 0;
        let waterArr = 0;
        let fireArr = 0;
        if (this.policyListData.policyJsonList.length > 0) {
            for (let polArr = 0; polArr < this.policyListData.policyJsonList.length; polArr++) {
                if (this.policyListData.policyJsonList[polArr].lobCode === 'PLHO') {
                    this.homePolicyData[homeArr] = this.policyListData.policyJsonList[polArr];
                    homeArr++;
                } else if (this.policyListData.policyJsonList[polArr].lobCode === 'PLAU') {
                    this.autoPolicyData[autoArr] = this.policyListData.policyJsonList[polArr];
                    this.vehiclelist[vehArr] = this.policyListData.policyJsonList[polArr].vehicleList;
                    autoArr++;
                    vehArr++;
                } else if (this.policyListData.policyJsonList[polArr].lobCode === 'PLUM') {
                    this.umbrellaPolicyData[umbArr] = this.policyListData.policyJsonList[polArr];
                    umbArr++;
                } else if (this.policyListData.policyJsonList[polArr].lobCode === 'PLBW') {
                    this.waterPolicyData[waterArr] = this.policyListData.policyJsonList[polArr];
                    waterArr++;
                } else if (this.policyListData.policyJsonList[polArr].lobCode === 'PLDF') {
                    this.firePolicyData[fireArr] = this.policyListData.policyJsonList[polArr];
                    fireArr++;
                }
            }
        }
        if (autoArr == 0) {
            this.isIdClickEnable = false;
        }
    }


    toggleShowDiv() {
        this.showPolicies = !this.showPolicies;
    }


    myPolicyPage() {
        this.navCtrl.push(MyPolicyPage, {
            param1: this.homePolicyData,
            param2: this.autoPolicyData,
            param3: this.customerinfo.customerJson.firstName,
            param4: this.umbrellaPolicyData,
            param5: this.waterPolicyData,
            param6: this.firePolicyData
        });
    }

    myBillsPage() {
        this.navCtrl.push(MyPolicyBillsPage, {
            param1: this.homePolicyData,
            param2: this.autoPolicyData,
            param3: this.customerinfo.customerJson.firstName,
            param4: this.umbrellaPolicyData,
            param5: this.waterPolicyData,
            param6: this.firePolicyData
        });

    }

    agentPage() {
        this.navCtrl.push(MyAgentPage, {
            param: this.policyListData.agent
        });
    }

    contactUsPage() {
        this.navCtrl.push(ContactUsPage);
    }

    roadsideAssistancePage() {
        this.navCtrl.push(RoadsideAssistancePage);
    }

    accidentSupportPage() {
        this.navCtrl.push(AccidentSupportPage);
    }

    idCardPage() {
        this.navCtrl.push(IdCardPage, {
            param: this.vehiclelist
        });
    }

    showAlert(titlemsg, subtitlemsg) {
        var alert = this.alertCtrl.create({
            title: '<span class="alert-title"><span class="alert-icon"><img src="assets/error_icon.png"></span><span class="alert-danger">' + this.titlemsg + '</span> </span>',
            subTitle: '<span class="alert-subtitle">' + this.subtitlemsg + '</span>',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'GO TO LOGIN',
                    handler: () => {
                        this.navCtrl.setRoot(LoginPage);
                    }
                }
            ]
        });
        alert.present();
    }

}