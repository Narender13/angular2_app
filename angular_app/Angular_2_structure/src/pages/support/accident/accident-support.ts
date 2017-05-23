import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-accident-support',
    templateUrl: 'accident-support.html'
})
export class AccidentSupportPage {


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccidentSupportPage');
    }

    call() {
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

}
