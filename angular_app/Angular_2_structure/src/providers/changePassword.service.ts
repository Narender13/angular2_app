import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ConfigService } from './config.service';

@Injectable()
export class ChangePasswordService {

    private pswApi = this._config.apiConfig() + 'web/changePassword';
    private infoApi = this._config.apiConfig() + 'portal/getCustomerInfo';

    constructor(public storage: Storage,
        public http: Http,
        public _config: ConfigService, ) {
    }

    getCustomerNbrInfo(customerNbr) {
        let customerNumber = this._config.getCustomerNbr();
        let data = {
            "customerNbr": customerNbr
        };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNumber);
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

    changePsw(loginId, oldPassword, newPassword, verifyNewPassword, emailAddr, challenge1, challenge2) {
        let customerNumber = this._config.getCustomerNbr();
        let payload = {
            "loginId": loginId,
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "verifyNewPassword": verifyNewPassword,
            "emailAddr": emailAddr,
            "challenge1": "challenge1",
            "challenge2": "challenge2"
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNumber);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(payload);

        return this.http.post(this.pswApi, body, options)
            .map((response: Response) => {

                //Store Response in updateres Object
                let updateres = response.json();
                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {
                    return updateres;
                }
            });
    }
}
