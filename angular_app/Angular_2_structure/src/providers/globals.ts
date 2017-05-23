import {Injectable} from '@angular/core'
import CryptoJS from 'crypto-js';
import {InAppBrowser} from 'ionic-native';

@Injectable()
export class Globals {
    key: any;
    iv: any;
    plain_text: string;
    encrypted_text: string;
    paymentusURL: string;
    decrypted_text: string;

    constructor() {
        
        this.plain_text = '';
        this.paymentusURL = '';
        this.encrypted_text = '';
        this.decrypted_text = '';

    }

    padOrTruncate(str: string): string {
        var result: string = '';
        if (str.length % 32 == 0)
            return str;

        result = str + '';
        while (!(result.length % 32 == 0)) {
            result = result + " ";
        }

        return result;
    }


    /*
     Method to encrypt the user object variables and build the paymentus  paymentusURL
     then calls paymentus InAppBrowser
     **/
    payBill(text): void {       
        let browser = new InAppBrowser(text, '_blank', 'location=yes');
    }

    
}