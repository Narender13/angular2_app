//Angular Module Import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  NavController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
//App Services Imports
import { UpdateProfileService } from '../../../providers/updateProfile.service';
import { ValidationService } from '../../../providers/validation.service';
import { ConfigService } from '../../../providers/config.service';

//App Component Imports
import { DashboardPage } from '../../dashboard/dashboard';
import { UpdateSuccessPage } from './profile-success/update-success';


@Component({
    selector: 'app-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
    profileForm: any;
    noSpace = false;
    updateResponse: any;
    customerNbrinfo: any;
    spinner = true;
    public mask = [/[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

    constructor(public _navCtrl: NavController,
        public _formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        public _updateProfileService: UpdateProfileService,
        public _storageService: ConfigService
    ) {
       
    }

    ngOnInit() {

        this.getCustomerNbrInfo();
    }

    getCustomerNbrInfo() {
        let customerNbr = this._storageService.getCustomerNbr();
        this._updateProfileService.getCustomerNbrInfo(customerNbr)
            .map((customerNbrinfo) => {
                this.spinner = false;
                //Store response in customerNbrinfo Object
                if (customerNbrinfo.header.error.errorCode === '0001' ||
                    customerNbrinfo.header.status === 'UNAUTHORIZED') {
                    this._storageService.showError();
                    this.spinner = false;
                } else {
                    this.customerNbrinfo = customerNbrinfo;
                    this.profileForm = this._formBuilder.group({
                        'email': [this.customerNbrinfo.customerInfoJson.emailAddr || '', [Validators.required, ValidationService.emailValidator]],
                        'homePhone': [this.customerNbrinfo.customerInfoJson.homePhone || '', [Validators.minLength(12)]],
                        'workPhone': [this.customerNbrinfo.customerInfoJson.workPhone || '', [Validators.minLength(12)]],
                        'cellPhone': [this.customerNbrinfo.customerInfoJson.cellPhone || '', [Validators.minLength(12)]]
                    });

                    this.profileForm.valueChanges.subscribe(data => {

                        var formattedHome = this.profileForm.controls.homePhone.value;
                        var formattedWork = this.profileForm.controls.workPhone.value;
                        var formattedCell = this.profileForm.controls.cellPhone.value;

                        this.profileForm.controls['homePhone'].setValue(formattedHome, { onlySelf: true });
                        this.profileForm.controls['workPhone'].setValue(formattedWork, { onlySelf: true });
                        this.profileForm.controls['cellPhone'].setValue(formattedCell, { onlySelf: true });

                    })
                }
            })
            .subscribe(response => { },
            error => {
                this._storageService.showError();
                this.spinner = false;
            })
    }

    updateProfile() {
        this.spinner = true;
        let emailAddr = this.profileForm.value.email;
        let homePhone = this.profileForm.value.homePhone;
        let workPhone = this.profileForm.value.workPhone;
        let cellPhone = this.profileForm.value.cellPhone;
        let masterCustomer = this._storageService.getCustomerNbr();

        this._updateProfileService.updateProfile(emailAddr, homePhone, workPhone, cellPhone, masterCustomer)
            .map((updateResponse) => {

                if (updateResponse.header.error.errorCode === '0001') {
                    this._storageService.showError();
                    this.spinner = false;
                } else if (updateResponse.header.status === 'UNAUTHORIZED') {
                    this._storageService.showUnathorisedError();
                    this.spinner = false;
                } else if (updateResponse.header.error.errorCode === '1001') {
                    this._storageService.showUnexpectedError();
                    this.spinner = false;
                } else if (updateResponse.status === '403' ||
                    updateResponse.header.status === 'FORBIDDEN') {
                    this._storageService.showSessionTimeOutError();
                    this.spinner = false;
                } else {
                    this.spinner = false;
                    // On Successful request assign response to updateResponse
                    this.updateResponse = updateResponse;

                    if (updateResponse.statusJson.status == true) {
                        //After Successful Login redirect to Dashboard page
                        this._navCtrl.push(UpdateSuccessPage);

                    }
                    else if (updateResponse.statusJson.status == false) {
                        this.showAlert();
                    }
                }
            })
            .subscribe(response => { },
            error => {
                this._storageService.showError();
                this.spinner = false;
            })
    }
    showAlert() {
        var alert = this.alertCtrl.create({
            title: '<span class="alert-title"><span class="alert-icon"><img src="assets/error_icon.png"></span><span class="alert-danger">UNABLE TO UPDATE</span></span>',
            subTitle: '<span class="alert-subtitle">An error occurred while trying to update your account.If you need assistance, please contact customer service at 800-233-6998.</span>',
            enableBackdropDismiss: false,
            buttons: ['Ok']
        });
        alert.present();
    }

    noSpaces(user) {
        this.noSpace = ValidationService.noSpaces(user);
    }

    myGoBack = function () {
        this._navCtrl.setRoot(DashboardPage);
    }
}