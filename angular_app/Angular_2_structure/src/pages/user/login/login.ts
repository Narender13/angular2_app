//Angular Module Import
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { NavController, MenuController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//App Services Imports
import { LoginService } from "../../../providers/login.service";
import { ConfigService } from '../../../providers/config.service';
import CryptoJS from 'crypto-js';
import { Globals } from '../../../providers/globals';
//App Component Imports
import { DashboardPage } from "../../dashboard/dashboard";
import { ForgotUsernamePage } from '../username/forgot-username';
import { AccidentSupportPage } from '../../support/accident/accident-support';
import { ContactUsPage } from "../../support/contact/contact-us";
import { FaqPage } from '../../support/faq/faq';
import { VerifyPolicyPage } from '../signup/verify-policy';
import { TouchID } from 'ionic-native';
import { AndroidFingerprintAuth, AFAAuthOptions } from '@ionic-native/android-fingerprint-auth';

let androidFingerprintAuth = new AndroidFingerprintAuth();

let storage = new Storage();

@Component({
    selector: 'app-page-login',
    templateUrl: 'login.html',
    providers: [AndroidFingerprintAuth]
})
export class LoginPage {
    @ViewChild('loginForm') loginForm: FormGroup;
    user: { usrId?: string, passwd?: string } = {};
    loginres: any;
    invalidCred: boolean = false;
    submitted = false;
    spinner = false;
    remember: any;
    //loginForm: any;
    titlemsg: any;
    subtitlemsg: any;
    toggleTouchIDStatus: boolean = false;
    key: any;
    iv: any;
    data: any;
    touchIdLabel: any = "TOUCH ID";
    touchIdEnrollMessage: any = "Do you want to enable Touch ID?"
    

    constructor(
        public navCtrl: NavController,
        public loginService: LoginService,
        public alertCtrl: AlertController,
        public _config: ConfigService,
        public _menu: MenuController,
        public _platform: Platform,
        private androidFingerprintAuth: AndroidFingerprintAuth
    ) {
        this._menu.get().enable(false);
        this.remember = this._config.getRememberStatus();
        if (this.remember == 'true') {
            this.user.usrId = this._config.getUserId();
        };
        // Platform Cordova is Available
        if (this._platform.is('cordova')) {
            //Updates touch toggle from the local storage
            storage.get('toggleTouchIDStatus').then((val) => {
                if (val == true) {
                    this.toggleTouchIDStatus = true;
                }
                else {
                    this.toggleTouchIDStatus = false;
                }
            });

            //If user is enrolled in touch id and toggle is set to true; Prompt for fingerprint
            storage.get('touch_id_flag').then((val) => {
                if (val == 1) {
                    storage.get('toggleTouchIDStatus').then((val) => {
                        if (val == true) {
                            this.checkFingerprint();
                        }
                    });
                }
            });

        }

        this.key = CryptoJS.enc.Hex.parse("882E91D56547F1CF7ED6BAAD9C3EAAF5");
        this.iv = CryptoJS.enc.Hex.parse("2811da22377d62fcfdb02f29aad77d9e");
        if(this._platform.is('android') && this._platform.is('cordova')) {
            this.touchIdLabel = "FINGERPRINT";
            this.touchIdEnrollMessage = "Do you want to enable Fingerprint?"
            this.androidFingerprintAuth.isAvailable()
                .then((results) => {
                    if (results.isAvailable) {
                     
                    }
                })
        }
         if (this._platform.is('ios')) {
            TouchID.isAvailable()
            .then(
               
                );
        }
    }

    onLogin(loginForm: NgForm) {
        this.spinner = true;
        this.submitted = true;
        this.login();
        this.loginForm.dirty;
    }

    /*

    Logic to validate login credentials then  navigate to dashboard page
    **/
    login(): void {

        this.loginService.login(this.user.usrId, this.user.passwd)
            .map((loginres) => {
                this.loginres = loginres;
                if (loginres.header.error.errorCode === '0001') {
                    this._config.showError();
                    this.spinner = false;
                } else if (loginres.header.status === 'UNAUTHORIZED') {
                    this._config.showUnathorisedError();
                } else if (loginres.header.error.errorCode === '1001') {
                    this._config.showUnexpectedError();
                } else if (loginres.status === '403' ||
                    loginres.header.status === 'FORBIDDEN') {
                    this._config.showSessionTimeOutError();
                } else {

                    if (loginres.customerLoginJson.status == true) {
                        //After Successful Login redirect to Dashboard page
                        this.spinner = false;
                        this._menu.enable(true);
                        this._config.setRememberStatus(this.remember);

                        localStorage.setItem('policyFirstLoad', "true");
                        // Platform Cordova is Available
                        if (this._platform.is('cordova')) {
                            //set toggle status to last selection
                            storage.set('toggleTouchIDStatus', this.toggleTouchIDStatus);
                            //If user is not enrolled and has not declined at least once for touch ID then prompt
                            storage.get('touch_id_flag').then((val) => {
                                if (val != 0 && val != 1) {
                                    TouchID.isAvailable()
                                        .then(
                                        res => this.enrollTouchID(),

                                    );

                                    this.androidFingerprintAuth.isAvailable()
                                        .then((result) => {
                                            if (result.isAvailable) {
                                                this.enrollTouchID();
                                            }
                                        })
                                }

                            });
                        }
                        this.navCtrl.setRoot(DashboardPage,
                            { param: this.loginres },
                            { animate: true, direction: 'forward' });
                    }
                    else if (loginres.customerLoginJson.status == false) {
                        this.spinner = false;
                        this.titlemsg = "INVALID USERNAME/PASSWORD";
                        this.subtitlemsg = this.loginres.customerLoginJson.statusMsg;
                        this.showAlert(this.titlemsg, this.subtitlemsg);

                        //If Login is NOT Successful, show invalid Credentials
                        this.invalidCred = true;
                    }
                }
            })
            .subscribe(
            response => { },
            error => {
                this._config.showError();
                this.spinner = false;
            }
            )
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

    /*
        Get user finger print ; If it is valid decrypt and log them in 
        **/
    checkFingerprint(): void {
        TouchID.verifyFingerprint('Scan your fingerprint please')
            .then(
            res => this.decrypt(),

        );
    }

    encrypt(username: string, password: string) {
        var data = { username: username, password: password };
        var plaint_text = JSON.stringify(data);

        var encrypted = CryptoJS.AES.encrypt(plaint_text, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();


        storage.set('encrypted', encrypted);

    }

    decrypt() {
        storage.get('encrypted').then((val) => {
            var decrypted = CryptoJS.AES.decrypt(val, this.key, {
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);

            var res = JSON.parse(decrypted);
            this.user.usrId = res.username;
            this.user.passwd = res.password;
            this.spinner = true;
            this.login();
        });
    }
    /*
      After first successful log in see if user wants to enroll with touch ID 
       **/
    enrollTouchID() {

        let alert = this.alertCtrl.create({
            title: this.touchIdLabel,
            message: this.touchIdEnrollMessage,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        storage.set('touch_id_flag', 0);
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        if (this._platform.is('android')) {
                            this.encryptAndroid(this.user.usrId, this.user.passwd);
                        }
                        else {
                            this.encrypt(this.user.usrId, this.user.passwd);
                        }


                        storage.set('touch_id_flag', 1);
                        storage.set('toggleTouchIDStatus', true);

                    }
                }
            ]
        });
        alert.present();

    }

    /*
       Check if user device has touch id if so call touch id flow
       **/
    toggleTouchIDUpdate() {
        if (this.toggleTouchIDStatus == true) {
            storage.set('toggleTouchIDStatus', true);
        }
        else {
            storage.set('toggleTouchIDStatus', false);
        }
        storage.get('touch_id_flag').then((val) => {
            //If user has touch id toggled and has enrolled already; Check fingerprint
            if (val == 1 && this.toggleTouchIDStatus == true) {

                TouchID.isAvailable()
                    .then(
                    res => this.checkFingerprint(),

                );


                this.androidFingerprintAuth.isAvailable()
                    .then((result) => {
                        if (result.isAvailable) {
                            this.getAndroidFingerprint();
                        }
                    })



            }
        });



    }

    getAndroidFingerprint(): any {
        var self = this;

        return new Promise(function (resolve, reject) {
            storage.get('credentials').then((val) => {
                var credentials = JSON.parse(val);

                androidFingerprintAuth.decrypt(credentials)
                    .then(result => {
                        if (result.withFingerprint) {
                            if (result.password) {
                                self.user.passwd = result.password;
                                self.user.usrId = credentials.username;
                                self.spinner = true;
                                self.login();

                            }
                        } else if (result.withBackup) {

                            reject({});
                        }
                    })
                    .catch(error => {
                        if (error === "Cancelled") {
                            console.log("Fingerprint authentication cancelled");
                        } else console.error(error)
                        reject(error);
                    });
            });
        });
    }



    encryptAndroid(username: string, password: string): any {
        var data = { clientId: "Hanover", username: username, password: password, disableBackup: true };

        var self = this;

        return new Promise(function (resolve, reject) {

            if (self._platform.is('android')) {
                androidFingerprintAuth.isAvailable()
                    .then((result) => {
                        if (result.isAvailable) {
                            // it is available

                            androidFingerprintAuth.encrypt(data)
                                .then(result => {
                                    if (result.withFingerprint) {
                                        var credentials = { clientId: "Hanover", username: username, token: result.token, disableBackup: true };
                                        storage.set('credentials', JSON.stringify(credentials));
                                        storage.set('touch_id_flag', 1);

                                        resolve(result);

                                    } else if (result.withBackup) {
                                        storage.set('touch_id_flag', 1);
                                        resolve(result);
                                    }
                                    else {
                                        reject('Didn\'t authenticate!');
                                    }
                                })
                                .catch(error => {
                                    if (error === "Cancelled") {
                                        reject("Fingerprint authentication cancelled");
                                    } else
                                        reject(error);
                                });

                        } else {
                            // fingerprint auth isn't available
                            reject("Fingerprint auth isn't available");
                        }
                    })
                    .catch(error => reject("Fingerprint auth isn't available"));
            }


        });
    }

    hideMsg() {
        this.invalidCred = false;
    }

    dashboardPage() {
        this.navCtrl.setRoot(DashboardPage);
    }

    contactUsPage() {
        this.navCtrl.push(ContactUsPage);
    }

    accidentSupportPage() {
        this.navCtrl.push(AccidentSupportPage);
    }

    faqPage() {
        this.navCtrl.push(FaqPage);
    }

    VerifyPolicyPage() {
        this.navCtrl.push(VerifyPolicyPage);
    }

    forgotUsernamePage() {
        this.navCtrl.push(ForgotUsernamePage);
    }

    managePasswordPage() {
        let browser = new InAppBrowser(this._config.getHanvoverForgotPWDomain() + 'CustomerWeb/forgetPass.htm', '_blank', 'location=yes');
    }
}