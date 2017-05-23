import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType, Headers } from '@angular/http';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ConfigService } from '../../providers/config.service';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { GetIdCardService } from '../../providers/getIdCard.service';
import { PdfViewerPage } from '../policy/viewer/pdfviewer';

@Component({
    selector: 'page-id-card-document',
    templateUrl: 'id-card.html',
    providers: [File, FileOpener]
})
export class IdCardPage implements OnInit {

    idCardList: any = [];
    idCardres: any;
    spinner = false;
    titlemsg: any;
    subtitlemsg: any;
    idCard: any;
    pdfSrc: string = '';
    page: number = 1;
    zoom: number = 100;
    zoompdf: number = 1.0;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private _idCardService: GetIdCardService,
        public viewCtrl: ViewController,
        public _storageService: ConfigService,
        private file: File,
        private fileOpener: FileOpener,
        public plt: Platform) {
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('HOME');
    }

    ngOnInit() {
        let list = 0;
        this.idCard = this.navParams.get('param');
        for (let id = 0; id < this.idCard.length; id++) {
            for (let veh = 0; veh < this.idCard[id].vehInfo.length; veh++) {
                if (this.idCard[id].vehInfo[veh].displayIdCard === true) {
                    this.idCardList[list] = this.idCard[id].vehInfo[veh];
                    list++;
                }
            }
        }
    }

    downloadIdCard(vehicle) {
        this.spinner = true;
        this._idCardService.getIdCardByPolicyId(vehicle)
            .map((idCardres) => {
                if (idCardres.header.error.errorCode === '0001') {
                    this._storageService.showError();
                    this.spinner = false;
                } else if (idCardres.header.status === 'UNAUTHORIZED') {
                    this._storageService.showUnathorisedError();
                    this.spinner = false;
                } else if (idCardres.header.error.errorCode === '1001') {
                    this._storageService.showUnexpectedError();
                    this.spinner = false;
                } else if (idCardres.header.status === '403' ||
                    idCardres.header.status === 'FORBIDDEN') {
                    this._storageService.showSessionTimeOutError();
                    this.spinner = false;
                } else {
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
                }
            })
            .subscribe(response => { },
            error => {
                this._storageService.showError();
                this.spinner = false;
            })
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
