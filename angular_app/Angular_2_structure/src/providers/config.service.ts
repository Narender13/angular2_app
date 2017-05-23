//Angular Module Import
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../pages/user/login/login';

@Injectable()
export class ConfigService {
    private dismissObserver: any;
    public dismiss: any;

    titleerrormsg = 'SERVICE UNAVAILABLE';
    unauthorizedErrorTitle = 'UNAUTHORIZED ACCESS';
    forbiddenErrorTitle = 'SESSION TIMEOUT'

    subtitleerrormsg = 'This service is temporarily unavailable. Please try again later.';
    unexpectedErrormsg = 'The application has encountered an unexpected error. Please try again later.';
    unathorisedErrormsg = 'The requested policy information is not associated with this account. You will be redirected to Log In again.';
    sessionTimeOutMsg = 'Your session has been timed out and you will be redirected to Log In again.';

    constructor(public http: Http, public _platform: Platform, public alertCtrl: AlertController) {
        this.dismissObserver = null;
        this.dismiss = Observable.create(observer => {
            this.dismissObserver = observer;
        });
    }

    getHanvoverForgotPWDomain() {
        let Base_URL = 'https://registrationuat.hanover.com/';
        return Base_URL;
    }
    //Change API Base_URL for Device and Browser
    apiConfig() {
        //Check Application is running on Cordova
        if (this._platform.is('cordova')) {
            // Platform Cordova is Available
            let Base_URL = 'https://mhpmobileuat.hanover.com/CustomerPortalService/'
            return Base_URL;
        }
        else {
            // Platform Cordova is Undefined
            let Base_URL = 'api/'
            return Base_URL;
        }
    };

    //Setter and Getter for Cookie in LocalStorage
    setCookie(cookie) {
        localStorage.setItem('hanoverCookie', cookie);
    }

    getCookie() {
        let cookie = localStorage.getItem('hanoverCookie');
        return cookie;
    }

    setCookieName(cookiename) {
        localStorage.setItem('hanCookieName', cookiename);
    }

    getCookieName() {
        let cookiename = localStorage.getItem('hanCookieName');
        return cookiename;
    }

    //Setter and Getter for User ID in LocalStorage
    setUserId(usrId) {
        localStorage.setItem('userId', usrId);
    }

    getUserId() {
        let usrId = localStorage.getItem('userId');
        return usrId;
    }

    //Setter and Getter for Customer Number in LocalStorage
    setCustomerNbr(customerNbr) {
        let customerNumber = customerNbr;
        localStorage.setItem('customerNbr', customerNumber)
    }

    getCustomerNbr() {
        let customerNbr = localStorage.getItem('customerNbr');
        return customerNbr;
    }

    //Delete Items from Local Storrage
    delCookie() {
        localStorage.removeItem('hanoverCookie');
    }

    delUserId() {
        localStorage.removeItem('userId');
    }

    delCustomernbr() {
        localStorage.removeItem('customerNbr');
    }

    //Remember Status
    setRememberStatus(rememberStatus) {
        localStorage.setItem('rememberStatus', rememberStatus);
    }

    getRememberStatus() {
        let rememberStatus = localStorage.getItem('rememberStatus');
        return rememberStatus;
    }
    resetUser() {
        localStorage.removeItem('hanoverCookie');
        //localStorage.removeItem('userId');
        localStorage.removeItem('customerNbr');
        //localStorage.removeItem('rememberStatus');
        localStorage.removeItem('policyDataLocal');
        localStorage.removeItem('policyFirstLoad');
        localStorage.removeItem('customerinfoLocal');

    }

    showError() {
        var alert = this.alertCtrl.create({
            title: '<span class="alert-title"><span class="alert-icon"><img src="assets/error_icon.png"></span><span class="alert-danger">' + this.titleerrormsg + '</span> </span>',
            subTitle: '<span class="alert-subtitle">' + this.subtitleerrormsg + '</span>',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.dismissObserver.next(true);
                    }
                }
            ]
        });
        alert.present();
    }

    showUnexpectedError() {
        var alert = this.alertCtrl.create({
            title: '<span class="alert-title"><span class="alert-icon"><img src="assets/error_icon.png"></span><span class="alert-danger">' + this.titleerrormsg + '</span> </span>',
            subTitle: '<span class="alert-subtitle">' + this.unexpectedErrormsg + '</span>',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.dismissObserver.next(true);
                    }
                }
            ]
        });
        alert.present();
    }

    showUnathorisedError() {
        var alert = this.alertCtrl.create({
            title: '<span class="alert-title"><span class="alert-icon"><img src="assets/error_icon.png"></span><span class="alert-danger">' + this.unauthorizedErrorTitle + '</span> </span>',
            subTitle: '<span class="alert-subtitle">' + this.unathorisedErrormsg + '</span>',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.dismissObserver.next(true);
                    }
                }
            ]
        });
        alert.present();
    }

    showSessionTimeOutError() {
        var alert = this.alertCtrl.create({
            title: '<span class="alert-title"><span class="alert-icon"><img src="assets/error_icon.png"></span><span class="alert-danger">' + this.forbiddenErrorTitle + '</span> </span>',
            subTitle: '<span class="alert-subtitle">' + this.sessionTimeOutMsg + '</span>',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.dismissObserver.next(true);
                    }
                }
            ]
        });
        alert.present();
    }
}
