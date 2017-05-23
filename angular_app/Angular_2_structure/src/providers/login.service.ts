import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

    private apiUrl = this._config.apiConfig() + 'web/getUserLogin';
    
    constructor(public _http: Http,
        public _config: ConfigService, ) {
    }

    login(usrId, passwd) {
        let data = {
            "usrId": usrId,
            "passwd": passwd
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);


        return this._http.post(this.apiUrl, body, options)
            .map((response: Response) => {                
                let userinfo = response.json();
                 if (response.status == 200) {
                    if (userinfo.customerLoginJson.status == true) {
                        let customerNbr = userinfo.customerLoginJson.customerNbr;
                        this._config.setUserId(usrId);
                        this._config.setCustomerNbr(customerNbr);
                    }
                    return userinfo;
                }
            }); 



    }

}



