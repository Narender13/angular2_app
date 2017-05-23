import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from './config.service';

@Injectable()
export class GetCustomerById {

    private apiUrl = this._config.apiConfig() + 'portal/getCustomerById';

    constructor(public http: Http,
        public _config: ConfigService, ) {
    }


    getCustomerInfo(usrId) {
        let customerNbr = this._config.getCustomerNbr();        
        let data = {
            "userName": usrId,
            "customerNbr": customerNbr
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNbr);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.apiUrl, body, options)
            .map((response: Response) => {
                //Store Response in CustomerInfo Object
                let customerInfo = response.json();

                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {
                    return customerInfo;
                }
            });
    }
}
