//Angular Module Import
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { TooltipModule } from 'angular2-tooltips';

//App Services Imports
import { ValidationService } from '../../../../providers/validation.service';
import { CreateUserService } from '../../../../providers/createUser.service';

//App Component Imports
import { RegSuccessPage } from '../reg-success/reg-success';
import { TermConditionsPage } from '../term-conditions/term-conditions';
import { ConfigService } from '../../../../providers/config.service';

@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html'
})
export class RegistraionPage {

    policyres: any;
    signUpForm: any;
    invalidreg = false;
    regres: any;
    noSpace = false;
    spinner = false;
    passwordToolTip = false;
    confirmPassToolTip = false;
    titlemsg: any;
    subtitlemsg: any;

    constructor(public navCtrl: NavController,
        public _navParams: NavParams,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public _createUserService: CreateUserService,
        public formBuilder: FormBuilder,
        public _config: ConfigService,
        public alertCtrl: AlertController) {

        this.signUpForm = this.formBuilder.group({
            'username': ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[0-9a-zA-Z]+$')]],
            'email': ['', [Validators.required, ValidationService.emailValidator]],
            'confirmemail': ['', [Validators.required, ValidationService.matchingEmail]],
            'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('^[0-9a-zA-Z]+$')]],
            'confirmpassword': ['', [Validators.required, ValidationService.matchingPassword]],
            'challenge1': ['', [Validators.required]],
            'challenge2': ['', [Validators.required]],
            'checked': [false, Validators.pattern('true')]
        });
    }

    ngOnInit() {
        this.policyres = this._navParams.get('param');
    }

    register() {
        this.spinner = true;
        let usrId = this.signUpForm.value.username;
        let passwd = this.signUpForm.value.password;
        let email = this.signUpForm.value.email;
        let question1 = this.signUpForm.value.challenge1;
        let question2 = this.signUpForm.value.challenge2;
        let firstName = this.policyres.customerJson.firstName;
        let lastName = this.policyres.customerJson.lastName;
        let fullName = this.policyres.customerJson.fullName;
        let escortAlias = this.policyres.customerJson.escortAlias;
        let customerNumber = this.policyres.customerJson.customerNumber;

        this._createUserService.create(usrId, passwd, email, firstName, lastName, fullName, escortAlias, customerNumber, question1, question2)
            .map((regres) => {
                // login successful if there's a token in the response
                if (regres.header.error.errorCode === '0001') {
                    this._config.showError();
                    this.spinner = false;
                } else if(regres.header.status === 'UNAUTHORIZED'){
                             this._config.showUnathorisedError();
                             this.spinner = false;
                }else if(regres.header.error.errorCode === '1001'){
                             this._config.showUnexpectedError();
                             this.spinner = false;
                }else if(regres.status === '403' ||
                         regres.header.status === 'FORBIDDEN'){
                             this._config.showSessionTimeOutError();
                             this.spinner = false;
                }else {
                    this.regres = regres;
                    if (regres.statusJson.status == true) {
                        this.spinner = false;
                        //After Successful Login redirect to Dashboard page
                        this.navCtrl.setRoot(RegSuccessPage);
                    }
                    else if (regres.statusJson.status == false) {
                        this.invalidreg = true;
                        this.spinner = false;
                        this.titlemsg = "INVALID USERNAME / EMAIL";
                        this.subtitlemsg = this.regres.statusJson.statusMsg;
                        this.showAlert(this.titlemsg, this.subtitlemsg);
                    }
                }
            })
            .subscribe(response => { },
            error => {
                this._config.showError();
                this.spinner = false;
            })
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

    regSuccessPage() {
        this.navCtrl.push(RegSuccessPage);
    }

    termConditionsModal() {
        let modal = this.modalCtrl.create(TermConditionsPage);
        modal.present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    noSpaces(user) {
        this.noSpace = ValidationService.noSpaces(user);
    }

    passToolTip() {
        this.passwordToolTip = !this.passwordToolTip;
    }

    confirmToolTip() {
        this.confirmPassToolTip = !this.confirmPassToolTip;
    }
}
