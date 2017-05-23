import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-contact-us',
    templateUrl: 'contact-us.html'
})
export class ContactUsPage {

   
    constructor(public navCtrl: NavController, 
    	        public navParams: NavParams,
    	        public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ContactUsPage');
    }

    call1(){
    	
    	 let confirm = this.alertCtrl.create({
            title: '800-922-8427',
            enableBackdropDismiss: false,
            cssClass: 'callAlert',
            buttons: [
                {
                    text: 'CALL',
                    handler: () => {
                       window.open('tel:800-922-8427', '_system');
                    },
                    cssClass: 'greenAction'
                },
                {
                    text: 'CANCEL',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }
            ]
        });
        confirm.present();
    }

    call2(){
    	 let confirm = this.alertCtrl.create({
            title: '800-628-0250',
            enableBackdropDismiss: false,
             cssClass: 'callAlert',
            buttons: [
                {
                    text: 'CALL',
                    handler: () => {       
                        window.open('tel:800-628-0250', '_system');
                    },
                    cssClass: 'greenAction'
                },
                {
                    text: 'CANCEL',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }
            ]
        });
        confirm.present();
    }

    call3(){
    	 let confirm = this.alertCtrl.create({
            title: '800-799-6977',
            enableBackdropDismiss: false,
             cssClass: 'callAlert',
            buttons: [
                {
                    text: 'CALL',
                    handler: () => { 
                        window.open('tel:800-799-6977', '_system');
                    },
                    cssClass: 'greenAction'
                },
                {
                    text: 'CANCEL',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }
            ]
        });
        confirm.present();
    }

    call4(){
    	 let confirm = this.alertCtrl.create({
            title: '800-399-2809',
            enableBackdropDismiss: false,
             cssClass: 'callAlert',
            buttons: [
                {
                    text: 'CALL',
                    handler: () => {
                        window.open('tel:800-399-2809', '_system');
                    },
                    cssClass: 'greenAction'
                },
                {
                    text: 'CANCEL',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }
            ]
        });
        confirm.present();
    }

}
