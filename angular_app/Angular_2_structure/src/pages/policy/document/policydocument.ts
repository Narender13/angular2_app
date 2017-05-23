//Angular Module Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ConfigService } from '../../../providers/config.service';
//App Services Imports
import { GetPolicyListService } from '../../../providers/getPolicyList.service';
import { PolicyDocumentService } from '../../../providers/getPolicyDocument.service';
import { PdfViewerPage } from '../viewer/pdfviewer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
    selector: 'page-policy-document',
    templateUrl: 'policydocument.html',
    providers: [File, FileOpener]
})
export class PolicyDocumentPage implements OnInit {

    policyDocumentJSON: any;
    platinumDocument: any;
    policyDocument: any;
    platinumDocumentPDF: any;
    policyDocumentPDF: any;
    policyData: any;
    spinner = true;
    index: any;
    customerName: any;
    pdfSrc: string = '';
    page: number = 1;
    zoom: number = 100;
    zoompdf: number = 1.0;
    titlemsg: any;
    subtitlemsg: any;
    policyPdfRes: any;
    platinumPdfRes: any;
    platinumPolicyFlag: any;

    constructor(
        public navCtrl: NavController,
        public _navParams: NavParams,
        public _policyDocumentService: PolicyDocumentService,
        private _policyListService: GetPolicyListService,
        private file: File,
        private fileOpener: FileOpener,
        public _storageService: ConfigService,
        public alertCtrl: AlertController,
        public plt: Platform,
        public viewCtrl: ViewController) {

    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('');
    }

    ngOnInit() {
        this.policyData = this._navParams.get('param1');
        this.index = this._navParams.get('param2');
        this.customerName = this._navParams.get('param3');
        this.getPolicyDocuments();
    }

    getPolicyDocuments() {
        let customerNbr = this.policyData.customerNbr;
        let policyNbr = this.policyData.policyNbr;
        this.platinumPolicyFlag = false;

        if (this.policyData.agreementPackageId == 'Y') {
            this._policyDocumentService.getPlantinumDocumentList(customerNbr)
                .map((platinumDocument) => {
                    if (platinumDocument.header.error.errorCode === '0001') {
                        this._storageService.showError();
                    } else if (platinumDocument.header.status === 'UNAUTHORIZED') {
                        this._storageService.showUnathorisedError();
                    } else if (platinumDocument.header.error.errorCode === '1001') {
                        this._storageService.showUnexpectedError();
                    } else if (platinumDocument.status === '403' ||
                        platinumDocument.header.status === 'FORBIDDEN') {
                        this._storageService.showSessionTimeOutError();
                    }
                    this.platinumDocument = platinumDocument;
                    this.platinumPolicyFlag = true
                    this._policyDocumentService.getPolicyDocumentList(customerNbr, policyNbr)
                        .map((policyDocument) => {
                            if (policyDocument.header.error.errorCode === '0001') {
                                this._storageService.showError();
                                this.spinner = false;
                            } else if (platinumDocument.header.status === 'UNAUTHORIZED') {
                                this._storageService.showUnathorisedError();
                            } else if (platinumDocument.header.error.errorCode === '1001') {
                                this._storageService.showUnexpectedError();
                            } else if (platinumDocument.status === '403' ||
                                platinumDocument.header.status === 'FORBIDDEN') {
                                this._storageService.showSessionTimeOutError();
                            }
                            this.policyDocument = policyDocument;
                            this.spinner = false;
                        })
                        .subscribe(response => { },
                        error => {
                            this._storageService.showError();
                            this.spinner = false;
                        });

                })
                .subscribe(response => { },
                error => {
                    this._storageService.showError();
                    this.spinner = false;
                });
        } else {
            this._policyDocumentService.getPolicyDocumentList(customerNbr, policyNbr)
                .map((policyDocument) => {
                    this.spinner = false;
                    this.policyDocument = policyDocument;
                    if (policyDocument.header.error.errorCode === '0001') {
                        this._storageService.showError();
                        this.spinner = false;
                    } else if (policyDocument.header.status === 'UNAUTHORIZED') {
                        this._storageService.showUnathorisedError();
                    } else if (policyDocument.header.error.errorCode === '1001') {
                        this._storageService.showUnexpectedError();
                    } else if (policyDocument.status === '403' ||
                        policyDocument.header.status === 'FORBIDDEN') {
                        this._storageService.showSessionTimeOutError();
                    }
                })
                .subscribe(response => { },
                error => {
                    this._storageService.showError();
                    this.spinner = false;
                });
        }
    };

    getPlatinumDocumentPDF(documentList) {
        this.spinner = true;
        let txnEffectiveDate = documentList.txnEffectiveDate;
        let customerNbr = documentList.customerNbr;
        let agreementPackageId = documentList.agreementPackageId;
        let documentLocationDesc = documentList.documentLocationDesc;
        this._policyDocumentService.getPlatinumDocument(txnEffectiveDate, customerNbr, agreementPackageId, documentLocationDesc)
            .map((platinumPdfRes) => {
                this.spinner = false;
                this.platinumPdfRes = platinumPdfRes;
                if (platinumPdfRes.header.error.errorCode === '0001') {
                    this._storageService.showError();
                    this.spinner = false;
                } else if (platinumPdfRes.header.status === 'UNAUTHORIZED') {
                    this._storageService.showUnathorisedError();
                } else if (platinumPdfRes.header.error.errorCode === '1001') {
                    this._storageService.showUnexpectedError();
                } else if (platinumPdfRes.status === '403' ||
                    platinumPdfRes.header.status === 'FORBIDDEN') {
                    this._storageService.showSessionTimeOutError();
                }
                else if (this.platinumPdfRes.responseCode == "0000") {
                    this.download(this.platinumPdfRes.base64Image);
                }
                else if (this.platinumPdfRes.base64Image == null) {
                    this.titlemsg = "DOCUMENT NOT AVAILABLE";
                    this.subtitlemsg = "There is a temporary issue with document download. Please try again after some time.";
                    this.showAlert(this.titlemsg, this.subtitlemsg);
                }
            })
            .subscribe(response => { },
            error => {
                this._storageService.showError();
                this.spinner = false;
            });
    }

    getPolicyDocumentPDF(documentList) {
        this.spinner = true;
        let id = documentList.id;
        let txnEffectiveDate = documentList.txnEffectiveDate;
        let agreementPackageId = documentList.agreementPackageId;
        let documentLocationDesc = documentList.documentLocationDesc;
        let policyEffectiveDate = documentList.policyEffectiveDate;
        let fromIssueDate = documentList.fromIssueDate;
        let policyExpDate = documentList.policyExpDate;
        let actionCD = documentList.actionCD;
        let policyNbr = documentList.policyNbr;

        this._policyDocumentService.getPolicyDocument(id, txnEffectiveDate, agreementPackageId, documentLocationDesc, policyEffectiveDate, fromIssueDate, policyExpDate, actionCD, policyNbr)
            .map((policyPdfRes) => {
                this.spinner = false;
                this.policyPdfRes = policyPdfRes;
                if (policyPdfRes.header.error.errorCode === '0001') {
                    this._storageService.showError();
                    this.spinner = false;
                } else if (policyPdfRes.header.status === 'UNAUTHORIZED') {
                    this._storageService.showUnathorisedError();
                } else if (policyPdfRes.header.error.errorCode === '1001') {
                    this._storageService.showUnexpectedError();
                } else if (policyPdfRes.status === '403' ||
                    policyPdfRes.header.status === 'FORBIDDEN') {
                    this._storageService.showSessionTimeOutError();
                }
                else if (this.policyPdfRes.responseCode == "0000") {
                    this.download(this.policyPdfRes.base64Image);
                }
                else if (this.policyPdfRes.base64Image == null) {
                    this.titlemsg = "DOCUMENT NOT AVAILABLE";
                    this.subtitlemsg = "There is a temporary issue with document download. Please try again after some time.";
                    this.showAlert(this.titlemsg, this.subtitlemsg);
                }
            })
            .subscribe(response => { },
            error => {
                this._storageService.showError();
                this.spinner = false;
            });
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
        var filename = "Policy-" + timestamp + ".pdf";
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
        var pageCount = 1;
        var dataBlob = this.b64toBlob(content, contentType, 512);
        var bin = atob(content);
        pageCount = bin.match(/\/Type\s*\/Page\b/g).length;
        this.file.writeFile(folderpath, filename, dataBlob, { replace: true })
            .then(() => {
                this.openPDF(folderpath + '/' + filename, pageCount);
            }).catch(
            err => {
                console.log("file create failed:", err);
            });

    }

    openPDF(path: string, pageCount: number): void {
        let prompt = this.alertCtrl.create({
            title: 'Open Policy Document',
            message: "Policy downloaded. Do you want to open the policy now? ",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'VIEW',
                    cssClass: 'greenAction',
                    handler: data => {
                        this.page = 1;
                        this.navCtrl.push(PdfViewerPage, {
                            param1: path,
                            param2: this.page,
                            param3: 'View Policy Document',
                            param4: pageCount
                        });
                    }
                },
                {
                    text: 'CANCEL',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                }

            ]
        });
        prompt.present();

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

    updateResults(): void {
        this.zoompdf = 2.5 - this.zoom / 100;
        console.log(this.zoompdf);
    }
}
