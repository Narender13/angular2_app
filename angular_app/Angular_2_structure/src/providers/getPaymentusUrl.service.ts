import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from './config.service';

@Injectable()
export class GetPaymentusService {
    customerNumber: any;

    private apiUrl = this._config.apiConfig() + 'portal/getPaymentusURL';

    constructor(private http: Http,
        public _config: ConfigService, ) {
    }


    getPolicy(usrData) {
        let customerNbr = this._config.getCustomerNbr();
        let data = {
            "userId": this._config.getUserId(),
            "policyNbr": usrData.policyNbr,
            "policySymbol": usrData.policySymbol,
            "customerNbr": usrData.customerNbr,
            "accountId": usrData.accountId,
        };

        if (usrData.policySymbol == 'all') {
            let data = {
                "userId": this._config.getUserId(),
                "customerNbr": usrData.customerNbr
            }
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNbr);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.apiUrl, body, options)
            .map((response: Response) => {

                //Store Response in CustomerInfo Object.
                let policyRequest = response.json();

                if (response.status == 400) {                   
                    return "FAILURE";
                } else if (response.status == 200) {                   
                    let test = JSON.stringify(policyRequest);                 
                    return policyRequest;
                }
            });
    }


}
