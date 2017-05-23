import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from './config.service';

@Injectable()
export class GetPolicyListService {
    customerNumber: any;

    private apiUrl = this._config.apiConfig() + 'portal/getAccountSummary';

    constructor(private http: Http,
        public _config: ConfigService, ) {
    }

    getPolicyList() {
        let customerNbr = this._config.getCustomerNbr();
        let data = {
            "customerNbr": customerNbr
        };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNbr);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.apiUrl, body, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }
}
