import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DashboardPage } from '../../dashboard/dashboard';
import { PasswordSuccessPage } from './password-success/password-success';
import { ForgotPasswordPage } from './forgot-password/forgot-password';
import { ValidationService } from '../../../providers/validation.service';
import { ChangePasswordService } from '../../../providers/changePassword.service';
import { ConfigService } from '../../../providers/config.service';


@Component({
  selector: 'page-manage-password',
  templateUrl: 'manage-password.html'
})
export class ManagePasswordPage {

  changePswForm: any;
  updateres: any;
  changeStatus = false;
  customerNbrinfo: any;
  spinner = false;

  constructor(
    public navCtrl: NavController,
    public _changePasswordService: ChangePasswordService,
    public formBuilder: FormBuilder,
    public _config: ConfigService
  ) { }

  ngOnInit() {

    this.changePswForm = this.formBuilder.group({
      'oldpassword': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('^[0-9a-zA-Z]+$')]],
      'confirmpassword': ['', [Validators.required, ValidationService.matchingPassword]]
    });
    this.getCustomerNbrInfo();
  }

  getCustomerNbrInfo() {
    let customerNbr = this._config.getCustomerNbr();
    this._changePasswordService.getCustomerNbrInfo(customerNbr)
      .map((customerNbrinfo) => {
        //Store response in customerNbrinfo Object
        if (customerNbrinfo.header.error.errorCode === '0001') {
          this._config.showError();
          this.spinner = false;
        }else if(customerNbrinfo.header.status === 'UNAUTHORIZED' ){
                             this._config.showUnathorisedError();
                             this.spinner = false;
                }else if(customerNbrinfo.header.error.errorCode === '1001'){
                             this._config.showUnexpectedError();
                             this.spinner = false;
                }else if(customerNbrinfo.status === '403' ||
                         customerNbrinfo.header.status === 'FORBIDDEN'){
                             this._config.showSessionTimeOutError();
                             this.spinner = false;
                } else {
          this.customerNbrinfo = customerNbrinfo;
        }
      })
      .subscribe(response  =>  { },
                  error  =>  {
                       this._config.showError();
        this.spinner = false;
                  })
  }

  changePassword() {
    this.changeStatus = false;
    this.spinner = true;
    let loginId = this._config.getUserId();
    let oldPassword = this.changePswForm.value.oldpassword;
    let newPassword = this.changePswForm.value.password;
    let verifyNewPassword = this.changePswForm.value.confirmpassword;
    let emailAddr = this.customerNbrinfo.customerInfoJson.emailAddr;
    let challenge1 = "challenge1";
    let challenge2 = "challenge2"
    this._changePasswordService.changePsw(loginId, oldPassword, newPassword, verifyNewPassword, emailAddr, challenge1, challenge2)
      .map((updateres) => {
        // Store the response from the server to updateres
        if (updateres.header.error.errorCode === '0001') {
          this._config.showError();
          this.spinner = false;
        }else if(updateres.header.status === 'UNAUTHORIZED' ){
                             this._config.showUnathorisedError();
                             this.spinner = false;
                }else if(updateres.header.error.errorCode === '1001'){
                             this._config.showUnexpectedError();
                             this.spinner = false;
                }else if(updateres.status === '403' ||
                         updateres.header.status === 'FORBIDDEN'){
                             this._config.showSessionTimeOutError();
                             this.spinner = false;
                }
        this.updateres = updateres;

        this.spinner = false;
        //If Change Password is Successful
        if (updateres.statusJson.status == true) {
          //After Successful Password change show the success Message
          this.navCtrl.setRoot(PasswordSuccessPage);
        }
        else if (updateres.statusJson.status == false) {
          this.changeStatus = true;
        }
      })
      .subscribe(response  =>  { },
                  error  =>  {
                       this._config.showError();
        this.spinner = false;
                  })
  }

  myGoBack = function () {
    this.navCtrl.setRoot(DashboardPage);
  }
  passwordSuccessPage = function () {
    this.navCtrl.setRoot(PasswordSuccessPage);
  }

  forgotPasswordPage = function () {
    this.navCtrl.push(ForgotPasswordPage);
  }

}
