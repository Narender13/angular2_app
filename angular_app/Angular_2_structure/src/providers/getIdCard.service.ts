import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from "./config.service";

@Injectable()
export class GetIdCardService {
    idCardInfo: any;
    private apiUrl = this._config.apiConfig() + 'portal/getIDCardByPolicyId';

    constructor(private http: Http, private _config: ConfigService) {
    }


    getIdCardByPolicyId(vehicle) {
        let customerNbr = this._config.getCustomerNbr();
        let data = {
            "customerNbr": vehicle.idCardImage.customerNbr,
            "vechileNbr": vehicle.idCardImage.vechileNbr,
            "policyNbr": vehicle.idCardImage.policyNbr,
            "policySymbol": vehicle.idCardImage.policySymbol,
            "policyMod": vehicle.idCardImage.policyMod
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customerNbr', customerNbr);
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(data);

        return this.http.post(this.apiUrl, body, options)
            .map((response: Response) => {              
                //Store Response in ID Card Info Object
                this.idCardInfo = response.json();

                if (response.status == 400) {
                    return "FAILURE";
                } else if (response.status == 200) {                  
                    return this.idCardInfo;
                }
            });
    }
}
