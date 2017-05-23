import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConfigService } from './config.service';

@Injectable()
export class CommonService {

    customerNumber: any;
    email: any;

    constructor(private http: Http,
        public _config: ConfigService) {
    }

    private agentAPI = this._config.apiConfig() + 'portal/getAgent';
    private apiUrl = this._config.apiConfig() + 'web/getUserIdByEmail';

    getAgentByCustomerId() {
        this.customerNumber = this._config.getCustomerNbr();
        let data = { "customerNbr": this.customerNumber };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', this.customerNumber);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.agentAPI, body, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }

    forgetUsername(email) {

        this.email = email;
        let data = { "email": email };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.apiUrl, body, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }
}

