import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CommonService } from '../../providers/common.service';

@Component({
    selector: 'page-my-agent',
    templateUrl: 'agent.html'
})
export class MyAgentPage implements OnInit {

    agentData: any;
    spinner = false;

    constructor(public navCtrl: NavController, 
                public _navParams: NavParams,
                private _commonService: CommonService, 
                public viewCtrl: ViewController,
                public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('HOME');
    }

    ngOnInit() {
        this.agentData = this._navParams.get('param');
    }

     call(number){
         let confirm = this.alertCtrl.create({
            title: number,
            enableBackdropDismiss: false,
             cssClass: 'callAlert',
            buttons: [
                {
                    text: 'CALL',
                    handler: () => {
                       window.open(('tel:'+number), '_system');
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
