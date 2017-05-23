import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType, Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConfigService } from './config.service';
//import {fileSaver} from "file-saver";


@Injectable()
export class PolicyDocumentService {

    public policyDocument: any;
    public platinumDocument: any;
    public document: any;

    private platinumApi = this._config.apiConfig() + 'portal/getPlatinumPolicyDocument';
    private platinumPdfApi = this._config.apiConfig() + 'portal/getPlatinumPolicyDocumentPDF';
    private otherApi = this._config.apiConfig() + 'portal/getOtherPolicyDocument';
    private otherPdfApi = this._config.apiConfig() + 'portal/getOtherPolicyDocumentPDF';

    constructor(public events: Events,
        public storage: Storage,
        public http: Http,
        public _config: ConfigService, ) {
    }

    //Service for the platinum Policy Documents
    getPlantinumDocumentList(customerNbr) {
        let customerNumber = this._config.getCustomerNbr();
        let data = {
            "customerNbr": this._config.getCustomerNbr()
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNumber);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.platinumApi, body, options)
            .map((response: Response) => {

                //Store Response in CustomerInfo Object
                this.platinumDocument = response.json();

                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {
                    return this.platinumDocument;
                }
            });
    }

    //Service for the Other Poicy Documents
    getPolicyDocumentList(customerNbr, policyNbr) {
        let customerNumber = this._config.getCustomerNbr();
        let data = {
            "customerNbr": customerNbr,
            "policyNbr": policyNbr
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNumber);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.otherApi, body, options)
            .map((response: Response) => {
                this.policyDocument = response.json();
                return this.policyDocument;
            });
    }

    getPlatinumDocument(txnEffectiveDate, customerNbr, agreementPackageId, documentLocationDesc) {
        let customerNumber = this._config.getCustomerNbr();
        let data = {
            "txnEffectiveDate": txnEffectiveDate,
            "customerNbr": customerNbr,
            "agreementPackageId": agreementPackageId,
            "documentLocationDesc": documentLocationDesc,
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNumber);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.platinumPdfApi, body, options)
            .map((response: Response) => {            
                //Store Response in CustomerInfo Object
                this.document = response.json();

                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {                 
                    return this.document;
                }
            });
    }

    getPolicyDocument(id, txnEffectiveDate, agreementPackageId, documentLocationDesc, policyEffectiveDate, fromIssueDate, policyExpDate, actionCD, policyNbr) {
        let customerNbr = this._config.getCustomerNbr();       
        let data = {
            "id": id,
	    "customerNbr": customerNbr,
            "txnEffectiveDate": txnEffectiveDate,
            "agreementPackageId": agreementPackageId,
            "documentLocationDesc": documentLocationDesc,
            "policyEffectiveDate": policyEffectiveDate,
            "fromIssueDate": fromIssueDate,
            "policyExpDate": policyExpDate,
            "actionCD": actionCD,
            "policyNbr": policyNbr
        }        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNbr);
        let options = new RequestOptions({
            headers: headers,
            withCredentials: true
        });
        let body = JSON.stringify(data);

        return this.http.post(this.otherPdfApi, body, options)
            .map((response: Response) => {
                this.document = response.json();               
                return this.document;
            })
    }
}
