import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ConfigService } from './config.service';

@Injectable()
export class UpdateProfileService {

    private updateApi = this._config.apiConfig() + 'portal/updateUserProfile';
    private infoApi = this._config.apiConfig() + 'portal/getCustomerInfo';

    constructor(public storage: Storage,
        public http: Http,
        public _config: ConfigService, ) {
    }

    getCustomerNbrInfo(customerNbr) {
        let data = {
            "customerNbr": customerNbr
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNumber', customerNbr);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.infoApi, body, options)
            .map((response: Response) => {

                //Store Response in CustomerInfo Object
                let customerNbrInfo = response.json();

                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {
                    return customerNbrInfo;
                }
            });
    }

    updateProfile(emailAddr, homePhone, workPhone, cellPhone, masterCustomer) {
        let customerNbr = this._config.getCustomerNbr();
        let payload = {
            "emailAddr": emailAddr,
            "homePhone": homePhone,
            "workPhone": workPhone,
            "cellPhone": cellPhone,
            "masterCustomer": masterCustomer,
            "marketIndicator": true
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNbr);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(payload);

        return this.http.post(this.updateApi, body, options)
            .map((response: Response) => {

                //Store Response in CustomerInfo Object
                let updateres = response.json();              
                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {
                    return updateres;
                }
            });
    }
}
