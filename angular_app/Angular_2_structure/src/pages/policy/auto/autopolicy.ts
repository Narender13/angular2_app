//Angular Module Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigService } from '../../../providers/config.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ViewController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { PdfViewerPage } from '../viewer/pdfviewer';

//App Services Imports
import { Globals } from '../../../providers/globals';
import { GetPaymentusService } from '../../../providers/getPaymentusUrl.service';
import { GetIdCardService } from '../../../providers/getIdCard.service';

//App Component Imports
import { PolicyDocumentPage } from '../document/policydocument';

@Component({
    selector: 'page-auto-policy',
    templateUrl: 'autopolicy.html',
    providers: [File, FileOpener]
})
export class AutoPolicyPage implements OnInit {

    autoPolicyData: any;
    index: number;
    customerName: any;
    spinner = false;
    idCardres: any;
    titlemsg: any;
    subtitlemsg: any;
    pdfSrc: string = '';
    page: number = 1;
    zoom: number = 100;
    zoompdf: number = 1.0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public global: Globals,
        public http: Http,
        public _config: ConfigService,
        public paymentusService: GetPaymentusService,
        private _idCardService: GetIdCardService,
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        private file: File,
        private fileOpener: FileOpener,
        public plt: Platform) {
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('My Policy');
    }

    ngOnInit() {
        this.autoPolicyData = this.navParams.get('param1');
        this.index = this.navParams.get('param2');
        this.customerName = this.navParams.get('param3');
        this.autoPolicyData.csppolicyNickName = "AUTO";
    }

    policyDocumentPage() {
        this.navCtrl.push(PolicyDocumentPage, {
            param1: this.autoPolicyData,
            param2: this.index,
            param3: this.customerName
        });
    }

    myBillsPage() {
        let text: string;
        this.paymentusService.getPolicy(this.autoPolicyData)
            .map((policyRequest) => {
                if (policyRequest.header.error.errorCode === '0001') {
                    this._config.showError();
                } else if (policyRequest.header.status === 'UNAUTHORIZED') {
                    this._config.showUnathorisedError();
                } else if (policyRequest.header.error.errorCode === '1001') {
                    this._config.showUnexpectedError();
                } else if (policyRequest.status === '403' ||
                    policyRequest.header.status === 'FORBIDDEN') {
                    this._config.showSessionTimeOutError();
                } else {
                    this.global.payBill(policyRequest.customerPayment.paymentusURL);
                }
            }).subscribe(response => { },
            error => {
                this._config.showError();
            });
    }

    downloadIdCard(vehicle) {
        this.spinner = true;
        this._idCardService.getIdCardByPolicyId(vehicle)
            .map((idCardres) => {
                this.spinner = false;
                this.idCardres = idCardres;

                if (this.idCardres.responseCode == "0000") {
                    //Open the Base64 PDF string in new Windows
                    this.download(this.idCardres.base64Image);
                }
                else if (this.idCardres.responseCode == "0001") {
                    this.titlemsg = "ID CARD NOT AVAILABLE";
                    this.subtitlemsg = this.idCardres.responseMessage;
                    this.showAlert(this.titlemsg, this.subtitlemsg);
                }
                else if (this.idCardres.base64Image == "null") {
                    this.titlemsg = "ID CARD NOT AVAILABLE";
                    this.subtitlemsg = "Auto ID Card is not available. If you require additional assistance, please contact us at 800-853-7536.";
                    this.showAlert(this.titlemsg, this.subtitlemsg);
                }
            })
            .subscribe()
    }

    download(myBase64): void {
        // To define the type of the Blob
        var contentType = "application/pdf";
        var folderpath = this.file.dataDirectory;

        if (this.plt.is('ios')) {
            folderpath = this.file.dataDirectory;
        }
        if (this.plt.is('android')) {
            folderpath = this.file.externalRootDirectory;
        }
        var currentDate = new Date();
        var timestamp = currentDate.getTime();
        var filename = "IdCard-" + timestamp + ".pdf";
        this.savebase64AsPDF(folderpath, filename, myBase64, contentType);
    }

    b64toBlob(b64Data, contentType, sliceSize): any {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);

            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    savebase64AsPDF(folderpath, filename, content, contentType): void {
        // Convert the base64 string in a Blob
        var dataBlob = this.b64toBlob(content, contentType, 512);
        this.file.writeFile(folderpath, filename, dataBlob, { replace: true })
            .then(() => {
                this.page = 1;
                this.navCtrl.push(PdfViewerPage, {
                    param1: folderpath + '/' + filename,
                    param2: this.page,
                    param3: 'View ID Card'
                });
            }).catch(
            err => {
                console.log("file create failed:", err);
            });

    }

    showConfirm(vehicle) {
        let confirm = this.alertCtrl.create({
            title: 'ID Card',
            message: '<span class="alert-subtitle">By clicking the "View" button, you will be able to immediately view your ID Card and will also receive a copy in the mail within a few days. <strong>You can only view your ID Card one time per day</strong>. However, please be aware that your state may not accept this digital copy as official proof of insurance.</span>',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'VIEW',
                    cssClass: 'greenAction',
                    handler: () => {
                        this.downloadIdCard(vehicle);
                    }
                },
                {
                    text: 'CANCEL',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }

            ]
        });
        confirm.present();
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
