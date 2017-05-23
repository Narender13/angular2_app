import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { TextMaskModule } from 'angular2-text-mask';
//import { Ng2IdleModule } from 'ng2-idle'
//Application Start Page
import { HanoverApp } from './app';

//Login Components and terms & condition page
import { LoginPage } from '../pages/user/login/login';
import { LoginTermsPage } from '../pages/user/login/login-terms/login-terms';

//Manage password, Change password and Create password page
import { ManagePasswordPage } from '../pages/user/password/manage-password';
import { CreatePasswordPage } from '../pages/user/password/create-password/create-password';
import { ForgotPasswordPage } from '../pages/user/password/forgot-password/forgot-password';
import { PasswordSuccessPage } from '../pages/user/password/password-success/password-success';

//Application Dashboard Page
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyAgentPage } from '../pages/agent/agent';

//Contacts Us and Support Pages
import { ContactUsPage } from '../pages/support/contact/contact-us';
import { RoadsideAssistancePage } from '../pages/support/roadside/roadside-assistance';
import { AccidentSupportPage } from '../pages/support/accident/accident-support';

import { MyPolicyPage } from '../pages/policy/policy';
import { MyPolicyBillsPage } from '../pages/policy/policybill';
import { HomePolicyPage } from '../pages/policy/home/homepolicy';
import { PolicyDocumentPage } from '../pages/policy/document/policydocument';
import { PdfViewerPage } from '../pages/policy/viewer/pdfviewer';
import { AutoPolicyPage } from '../pages/policy/auto/autopolicy';
import { UmbrellaPolicyPage } from '../pages/policy/umbrella/umbrellapolicy';
import { WaterCraftPolicyPage } from '../pages/policy/watercraft/watercraftpolicy';
import { DwellingPolicyPage } from '../pages/policy/dwelling/dwellingpolicy';

import { IdCardPage } from '../pages/idcard/id-card';

import { FaqPage } from '../pages/support/faq/faq';
import { AutoFaqPage } from '../pages/support/faq/auto-faq/auto-faq';
import { AutoAnsPage1 } from '../pages/support/faq/auto-ans/auto-ans1';
import { AutoAnsPage2 } from '../pages/support/faq/auto-ans/auto-ans2';
import { AutoAnsPage3 } from '../pages/support/faq/auto-ans/auto-ans3';
import { AutoAnsPage4 } from '../pages/support/faq/auto-ans/auto-ans4';
import { AutoAnsPage5 } from '../pages/support/faq/auto-ans/auto-ans5';
import { AutoAnsPage6 } from '../pages/support/faq/auto-ans/auto-ans6';
import { AutoAnsPage7 } from '../pages/support/faq/auto-ans/auto-ans7';
import { AutoAnsPage8 } from '../pages/support/faq/auto-ans/auto-ans8';
import { AutoAnsPage9 } from '../pages/support/faq/auto-ans/auto-ans9';
import { AutoAnsPage10 } from '../pages/support/faq/auto-ans/auto-ans10';
import { AutoAnsPage11 } from '../pages/support/faq/auto-ans/auto-ans11';
import { AutoAnsPage12 } from '../pages/support/faq/auto-ans/auto-ans12';
import { AutoAnsPage13 } from '../pages/support/faq/auto-ans/auto-ans13';
import { AutoAnsPage14 } from '../pages/support/faq/auto-ans/auto-ans14';
import { AutoAnsPage15 } from '../pages/support/faq/auto-ans/auto-ans15';

import { PropertyFaqPage } from '../pages/support/faq/property-faq/property-faq';
import { PropertyAnsPage1 } from '../pages/support/faq/property-ans/property-ans1';
import { PropertyAnsPage2 } from '../pages/support/faq/property-ans/property-ans2';
import { PropertyAnsPage3 } from '../pages/support/faq/property-ans/property-ans3';
import { PropertyAnsPage4 } from '../pages/support/faq/property-ans/property-ans4';
import { PropertyAnsPage5 } from '../pages/support/faq/property-ans/property-ans5';
import { PropertyAnsPage6 } from '../pages/support/faq/property-ans/property-ans6';
import { PropertyAnsPage7 } from '../pages/support/faq/property-ans/property-ans7';
import { PropertyAnsPage8 } from '../pages/support/faq/property-ans/property-ans8';
import { PropertyAnsPage9 } from '../pages/support/faq/property-ans/property-ans9';
import { PropertyAnsPage10 } from '../pages/support/faq/property-ans/property-ans10';
import { PropertyAnsPage11 } from '../pages/support/faq/property-ans/property-ans11';
import { PropertyAnsPage12 } from '../pages/support/faq/property-ans/property-ans12';

import { MyInsuranceFaqPage } from '../pages/support/faq/myInsurance-faq/myInsurance-faq';
import { MyInsuranceAnsPage1 } from '../pages/support/faq/myInsurance-ans/myInsurance-ans1';
import { MyInsuranceAnsPage2 } from '../pages/support/faq/myInsurance-ans/myInsurance-ans2';
import { MyInsuranceAnsPage3 } from '../pages/support/faq/myInsurance-ans/myInsurance-ans3';
import { MyInsuranceAnsPage4 } from '../pages/support/faq/myInsurance-ans/myInsurance-ans4';
import { MyInsuranceAnsPage5 } from '../pages/support/faq/myInsurance-ans/myInsurance-ans5';
import { MyInsuranceAnsPage6 } from '../pages/support/faq/myInsurance-ans/myInsurance-ans6';
import { MyInsuranceAnsPage7 } from '../pages/support/faq/myInsurance-ans/myInsurance-ans7';
import { MyInsuranceAnsPage8 } from '../pages/support/faq/myInsurance-ans/myInsurance-ans8';

import { BillingFaqPage } from '../pages/support/faq/billing-faq/billing-faq';
import { BillingAnsPage1 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans1';
import { BillingAnsPage2 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans2';
import { BillingAnsPage3 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans3';
import { BillingAnsPage4 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans4';
import { BillingAnsPage5 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans5';
import { BillingAnsPage6 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans6';
import { BillingAnsPage7 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans7';
import { BillingAnsPage8 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans8';
import { BillingAnsPage9 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans9';
import { BillingAnsPage10 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans10';
import { BillingAnsPage11 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans11';
import { BillingAnsPage12 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans12';
import { BillingAnsPage13 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans13';
import { BillingAnsPage14 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans14';
import { BillingAnsPage15 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans15';
import { BillingAnsPage16 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans16';
import { BillingAnsPage17 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans17';
import { BillingAnsPage18 } from '../pages/support/faq/billing-ans/billing-ans/billing-ans18';

import { BillingEftAnsPage1 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans1';
import { BillingEftAnsPage2 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans2';
import { BillingEftAnsPage3 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans3';
import { BillingEftAnsPage4 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans4';
import { BillingEftAnsPage5 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans5';
import { BillingEftAnsPage6 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans6';
import { BillingEftAnsPage7 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans7';
import { BillingEftAnsPage8 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans8';
import { BillingEftAnsPage9 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans9';
import { BillingEftAnsPage10 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans10';
import { BillingEftAnsPage11 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans11';
import { BillingEftAnsPage12 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans12';
import { BillingEftAnsPage13 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans13';
import { BillingEftAnsPage14 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans14';
import { BillingEftAnsPage15 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans15';
import { BillingEftAnsPage16 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans16';
import { BillingEftAnsPage17 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans17';
import { BillingEftAnsPage18 } from '../pages/support/faq/billing-ans/billingEft-ans/billingEft-ans18';

import { VerifyPolicyPage } from '../pages/user/signup/verify-policy';
import { RegistraionPage } from '../pages/user/signup/registration/registration';
import { RegSuccessPage } from '../pages/user/signup/reg-success/reg-success';
import { TermConditionsPage } from '../pages/user/signup/term-conditions/term-conditions';
import { EmailSentPage } from '../pages/user/username/usr-success/usr-success';
import { ForgotUsernamePage } from '../pages/user/username/forgot-username';
import { ProfilePage } from '../pages/user/profile/profile';
import { UpdateSuccessPage } from '../pages/user/profile/profile-success/update-success';

//Providers or Services of the Application
import { LoginService } from '../providers/login.service';
import { ConfigService } from '../providers/config.service';
import { GetCustomerById } from '../providers/getCustomerById.service';
import { GetCustomerByPolId } from '../providers/getCustomerByPolId.service';
import { CreateUserService } from '../providers/createUser.service';
import { UpdateProfileService } from '../providers/updateProfile.service';
import { GetPolicyListService } from '../providers/getPolicyList.service';
import { PolicyDocumentService } from '../providers/getPolicyDocument.service';
import { GetIdCardService } from '../providers/getIdCard.service';
import { CommonService } from '../providers/common.service';
import { ValidationService } from '../providers/validation.service';
import { Application } from '../providers/application.service';
import { GetPaymentusService } from '../providers/getPaymentusUrl.service';
import { ChangePasswordService } from '../providers/changePassword.service';

import { Globals } from '../providers/globals';
import { PdfPage } from '../pages/pdf/pdf';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
@NgModule({
    declarations: [
        HanoverApp,
        LoginPage,
        LoginTermsPage,
        ManagePasswordPage,
        CreatePasswordPage,
        ForgotPasswordPage,
        PasswordSuccessPage,
        VerifyPolicyPage,
        RegistraionPage,
        RegSuccessPage,
        DashboardPage,
        MyAgentPage,
        ContactUsPage,
        RoadsideAssistancePage,
        AccidentSupportPage,
        MyPolicyPage,
        MyPolicyBillsPage,
        HomePolicyPage,
        PolicyDocumentPage,
        PdfViewerPage,
        AutoPolicyPage,
        UmbrellaPolicyPage,
        WaterCraftPolicyPage,
        DwellingPolicyPage,
        IdCardPage,
        FaqPage,
        AutoFaqPage,
        AutoAnsPage1,
        AutoAnsPage2,
        AutoAnsPage3,
        AutoAnsPage4,
        AutoAnsPage5,
        AutoAnsPage6,
        AutoAnsPage7,
        AutoAnsPage8,
        AutoAnsPage9,
        AutoAnsPage10,
        AutoAnsPage11,
        AutoAnsPage12,
        AutoAnsPage13,
        AutoAnsPage14,
        AutoAnsPage15,

        PropertyFaqPage,
        PropertyAnsPage1,
        PropertyAnsPage2,
        PropertyAnsPage3,
        PropertyAnsPage4,
        PropertyAnsPage5,
        PropertyAnsPage6,
        PropertyAnsPage7,
        PropertyAnsPage8,
        PropertyAnsPage9,
        PropertyAnsPage10,
        PropertyAnsPage11,
        PropertyAnsPage12,

        MyInsuranceFaqPage,
        MyInsuranceAnsPage1,
        MyInsuranceAnsPage2,
        MyInsuranceAnsPage3,
        MyInsuranceAnsPage4,
        MyInsuranceAnsPage5,
        MyInsuranceAnsPage6,
        MyInsuranceAnsPage7,
        MyInsuranceAnsPage8,

        BillingFaqPage,
        BillingAnsPage1,
        BillingAnsPage2,
        BillingAnsPage3,
        BillingAnsPage4,
        BillingAnsPage5,
        BillingAnsPage6,
        BillingAnsPage7,
        BillingAnsPage8,
        BillingAnsPage9,
        BillingAnsPage10,
        BillingAnsPage11,
        BillingAnsPage12,
        BillingAnsPage13,
        BillingAnsPage14,
        BillingAnsPage15,
        BillingAnsPage16,
        BillingAnsPage17,
        BillingAnsPage18,

        BillingEftAnsPage1,
        BillingEftAnsPage2,
        BillingEftAnsPage3,
        BillingEftAnsPage4,
        BillingEftAnsPage5,
        BillingEftAnsPage6,
        BillingEftAnsPage7,
        BillingEftAnsPage8,
        BillingEftAnsPage9,
        BillingEftAnsPage10,
        BillingEftAnsPage11,
        BillingEftAnsPage12,
        BillingEftAnsPage13,
        BillingEftAnsPage14,
        BillingEftAnsPage15,
        BillingEftAnsPage16,
        BillingEftAnsPage17,
        BillingEftAnsPage18,

        TermConditionsPage,
        EmailSentPage,
        ForgotUsernamePage,
        ProfilePage,
        UpdateSuccessPage,
        PdfViewerComponent
    ],
    imports: [
        IonicStorageModule.forRoot(),
        TextMaskModule,
      //  Ng2IdleModule.forRoot(),
        IonicModule.forRoot(HanoverApp, {
            mode: 'ios'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        HanoverApp,
        LoginPage,
        LoginTermsPage,
        ManagePasswordPage,
        CreatePasswordPage,
        ForgotPasswordPage,
        PasswordSuccessPage,
        VerifyPolicyPage,
        RegistraionPage,
        RegSuccessPage,
        DashboardPage,
        MyAgentPage,
        ContactUsPage,
        RoadsideAssistancePage,
        AccidentSupportPage,
        MyPolicyPage,
        MyPolicyBillsPage,
        HomePolicyPage,
        PolicyDocumentPage,
        PdfViewerPage,
        AutoPolicyPage,
        UmbrellaPolicyPage,
        WaterCraftPolicyPage,
        DwellingPolicyPage,
        IdCardPage,
        FaqPage,
        AutoFaqPage,
        AutoAnsPage1,
        AutoAnsPage2,
        AutoAnsPage3,
        AutoAnsPage4,
        AutoAnsPage5,
        AutoAnsPage6,
        AutoAnsPage7,
        AutoAnsPage8,
        AutoAnsPage9,
        AutoAnsPage10,
        AutoAnsPage11,
        AutoAnsPage12,
        AutoAnsPage13,
        AutoAnsPage14,
        AutoAnsPage15,

        PropertyFaqPage,
        PropertyAnsPage1,
        PropertyAnsPage2,
        PropertyAnsPage3,
        PropertyAnsPage4,
        PropertyAnsPage5,
        PropertyAnsPage6,
        PropertyAnsPage7,
        PropertyAnsPage8,
        PropertyAnsPage9,
        PropertyAnsPage10,
        PropertyAnsPage11,
        PropertyAnsPage12,

        MyInsuranceFaqPage,
        MyInsuranceAnsPage1,
        MyInsuranceAnsPage2,
        MyInsuranceAnsPage3,
        MyInsuranceAnsPage4,
        MyInsuranceAnsPage5,
        MyInsuranceAnsPage6,
        MyInsuranceAnsPage7,
        MyInsuranceAnsPage8,

        BillingFaqPage,
        BillingAnsPage1,
        BillingAnsPage2,
        BillingAnsPage3,
        BillingAnsPage4,
        BillingAnsPage5,
        BillingAnsPage6,
        BillingAnsPage7,
        BillingAnsPage8,
        BillingAnsPage9,
        BillingAnsPage10,
        BillingAnsPage11,
        BillingAnsPage12,
        BillingAnsPage13,
        BillingAnsPage14,
        BillingAnsPage15,
        BillingAnsPage16,
        BillingAnsPage17,
        BillingAnsPage18,

        BillingEftAnsPage1,
        BillingEftAnsPage2,
        BillingEftAnsPage3,
        BillingEftAnsPage4,
        BillingEftAnsPage5,
        BillingEftAnsPage6,
        BillingEftAnsPage7,
        BillingEftAnsPage8,
        BillingEftAnsPage9,
        BillingEftAnsPage10,
        BillingEftAnsPage11,
        BillingEftAnsPage12,
        BillingEftAnsPage13,
        BillingEftAnsPage14,
        BillingEftAnsPage15,
        BillingEftAnsPage16,
        BillingEftAnsPage17,
        BillingEftAnsPage18,

        TermConditionsPage,
        EmailSentPage,
        ForgotUsernamePage,
        ProfilePage,
        UpdateSuccessPage,
        PdfViewerComponent
    ],
    providers: [
        GetPolicyListService,
        GetIdCardService,
        CommonService,
        ValidationService,
        Application,
        LoginService,
        ConfigService,
        GetCustomerById,
        GetCustomerByPolId,
        PolicyDocumentService,
        CreateUserService,
        UpdateProfileService,
        GetPaymentusService,
        ChangePasswordService,

        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        Globals
    ]
})
export class AppModule {
}
