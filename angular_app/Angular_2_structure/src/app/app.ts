//Angular Module Import
import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform,AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, InAppBrowser } from 'ionic-native';

//App Services Imports
import { ConfigService } from '../providers/config.service';

//App Component Imports
import { LoginPage } from '../pages/user/login/login';
import { LoginTermsPage } from '../pages/user/login/login-terms/login-terms';
import { ProfilePage } from '../pages/user/profile/profile';
import { ManagePasswordPage } from '../pages/user/password/manage-password';
import { FaqPage } from '../pages/support/faq/faq';


@Component({
    templateUrl: 'app.html'
})
export class HanoverApp implements OnInit {
    @ViewChild(Nav) nav: Nav;
    firstRun: any;
    rootPage: any = LoginPage;
    public timeCounter: any;
    idleState = 'Not started.';
    timedOut = false;

    profilePages: Array<{ title: string, component: any }>;
    userPages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public _configService: ConfigService, public alertCtrl: AlertController) {
        this.firstRun = localStorage.getItem('firstRun');
    }

    ngOnInit() {
        this.initializeApp();
        // List of Item to Put into the Navigation Menu
        this.profilePages = [
            { title: 'Update My Profile', component: ProfilePage },
            { title: 'Change Password', component: ManagePasswordPage }
        ]
        this.userPages = [
            { title: 'FAQs', component: FaqPage }
        ];
    }
    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
            if (this.firstRun == 'true') {
                this.rootPage = LoginPage;
            }
            else if (this.firstRun === null) {
                this.rootPage = LoginTermsPage;
            }

            this._configService.dismiss.subscribe((value) => {
                this.logout();
            });
        });
    }

    openPage(page) {
      //  this.nav.setRoot(page.component);
        this.nav.push(page.component);
    }

    logout() {
        this._configService.resetUser();
        this.nav.setRoot(LoginPage, { animate: true, direction: 'backward' });
    }
    exitApp() {
        this.platform.exitApp();
    }

    privacyPolicyPage() {
        let browser = new InAppBrowser('https://www.hanover.com/privacy-policy.html', '_system', 'location=yes');
    }

    termsPage() {
        let browser = new InAppBrowser('https://www.hanover.com/terms-and-conditions.html', '_system', 'location=yes');
    }
}
