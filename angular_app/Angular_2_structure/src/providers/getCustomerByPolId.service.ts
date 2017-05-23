import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ConfigService } from './config.service';


@Injectable()
export class GetCustomerByPolId {

    private apiUrl = this._config.apiConfig() + 'web/getCustomer';

    constructor(public storage: Storage,
        public http: Http,
        public _config: ConfigService, ) {
    }

    policyStatus(polId, billZip) {
        let payload = {
            "polId": polId,
            "billZip": billZip
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(payload);
       
        return this.http.post(this.apiUrl, body, options)
            .map((response: Response) => {

                //Store Response in CustomerInfo Object
                let policystatus = response.json();

                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {
                    return policystatus;
                }
            });
    }
}
