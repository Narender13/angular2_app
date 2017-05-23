//Angular Module Import
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

//App Services Imports
import { CommonService } from '../../../providers/common.service';
import { ValidationService } from '../../../providers/validation.service';

//App Component Imports

import {EmailSentPage} from './usr-success/usr-success';
import { ConfigService } from '../../../providers/config.service';

@Component({
    selector: 'page-forgot-username',
    templateUrl: 'forgot-username.html'
})
export class ForgotUsernamePage {

    forgetUsernameForm: any;
    spinner: false;
    emailInvalid: false;
    changeres: any;

    constructor(public navCtrl: NavController, 
                public formBuilder: FormBuilder,
                private _commonService: CommonService, 
                public viewCtrl: ViewController,
                public _config: ConfigService) {

        this.forgetUsernameForm = this.formBuilder.group({
            'email': ['', [Validators.required, ValidationService.emailValidator]]
        });
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('Log In');
    }

    emailSentPage = function () {
        this.spinner = true;
        this.emailInvalid = false;
        this._commonService.forgetUsername(this.forgetUsernameForm.value.email)
            .map((changeres) => {
			if(changeres.header.error.errorCode === '0001'){
                    this._config.showError();      
                }else if(changeres.header.status === 'UNAUTHORIZED'){
                             this._config.showUnathorisedError();
                             this.spinner = false;
                }else if(changeres.header.error.errorCode === '1001'){
                             this._config.showUnexpectedError();
                             this.spinner = false;
                }else if(changeres.status === '403' ||
                         changeres.header.status === 'FORBIDDEN'){
                             this._config.showSessionTimeOutError();
                             this.spinner = false;
                } else{
               
                // login successful if there's a token in the response
                this.spinner = false;
                this.changeres = changeres;              
               
                if (changeres.statusJson.status == true) {
                    this.navCtrl.push(EmailSentPage);
                }
                else if (changeres.statusJson.status == false) {
                    this.emailInvalid = true;
                }
            }
            })
            .subscribe(response => {},
            error => {
               this._config.showError();
            })

    }
}

