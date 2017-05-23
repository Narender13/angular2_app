//Angular Module Import
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ConfigService } from '../../../providers/config.service';

//App Services Imports
import { GetCustomerByPolId } from '../../../providers/getCustomerByPolId.service';

//App Component Imports
import { RegistraionPage } from './registration/registration';

@Component({
    selector: 'page-verify-policy',
    templateUrl: 'verify-policy.html'
})
export class VerifyPolicyPage {
    verifyPolicyForm: any;
    policyinfo: { polId?: string, billZip?: string } = {};
    policyres: any;
    invalidPolNbr = false;
    invalidCred = false;
    spinner = false;
    titlemsg: any;
    subtitlemsg: any;
    public mask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public _getCustomerByPolId: GetCustomerByPolId,
        public formBuilder: FormBuilder,
        public _config: ConfigService,
        public alertCtrl: AlertController) {

        this.verifyPolicyForm = this.formBuilder.group({
            'polId': ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3}[\s|\-]?[A-Za-z0-9]{7}[\s|\-]?([\d]{2})?$|^\d{10}$/)]],
            'billZip': ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^\d{5}$/)]]
        });
    }

    verifyPolicy() {
        let polId = this.verifyPolicyForm.value.polId.replace(/[^A-Za-z0-9]/g, '');
        let billZip = this.verifyPolicyForm.value.billZip;
        this.spinner = true;
        this._getCustomerByPolId.policyStatus(polId, billZip)
            .map((policyres) => {
                if (policyres.header.error.errorCode === '0001') {
                    this._config.showError();
                    this.spinner = false;
                }  else if(policyres.header.status === 'UNAUTHORIZED'){
                             this._config.showUnathorisedError();
                             this.spinner = false;
                }else if(policyres.header.error.errorCode === '1001'){
                             this._config.showUnexpectedError();
                             this.spinner = false;
                }else if(policyres.status === '403' ||
                         policyres.header.status === 'FORBIDDEN'){
                             this._config.showSessionTimeOutError();
                             this.spinner = false;
                }else {
                    // login successful if there's a token in the response
                    this.spinner = false;
                    this.policyres = policyres;

                    if (policyres.customerJson.status == true) {
                        this.spinner = false;
                        //After Successful Login redirect to Dashboard page
                        this.navCtrl.push(RegistraionPage, {
                            param: this.policyres
                        });
                    }
                    else if (policyres.customerJson.status == false) {
                        this.invalidPolNbr = true;
                        this.titlemsg = "INVALID POLICY/ZIPCODE";
                        this.subtitlemsg = this.policyres.customerJson.message;
                        this.showAlert(this.titlemsg, this.subtitlemsg);
                    }
                }
            })
            .subscribe(response  =>  { },
                        error  =>  {
                               this._config.showError();
                this.spinner = false;
                        })
    }

    hideMsg() {
        this.invalidCred = true;
    }

    showAlert(titlemsg, subtitlemsg) {
        var alert = this.alertCtrl.create({
            title: '<span class="alert-title"><span class="alert-icon"><img src="assets/error_icon.png"></span><span class="alert-danger">' + this.titlemsg + '</span> </span>',
            subTitle: '<span class="alert-subtitle">' + this.subtitlemsg + '</span>',
            enableBackdropDismiss: false,
            buttons: ['OK']

        });
        alert.present();
    }
}
