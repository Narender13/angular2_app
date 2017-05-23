import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ConfigService } from './config.service';


@Injectable()
export class CreateUserService {

    constructor(public storage: Storage,
        public http: Http,
        public _config: ConfigService, ) {
    }

    private apiUrl = this._config.apiConfig() + 'web/createUser';

    create(usrId, passwd, email, firstName, lastName, fullName, escortAlias, customerNumber, question1, question2) {
        let payload = {
            "usrId": usrId,
            "passwd": passwd,
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "fullName": fullName,
            "escortAlias": escortAlias,
            "cswd": customerNumber,
            "challenge1": question1,
            "challenge2": question2
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(payload);
        return this.http.post(this.apiUrl, body, options)
            .map((response: Response) => {
                //Store Response in CustomerInfo Object
                let createres = response.json();
                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {
                    return createres;
                }
            });
    }
}
