import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the RoadsideAssistance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-roadside-assistance',
  templateUrl: 'roadside-assistance.html'
})
export class RoadsideAssistancePage {
  
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
  	          public viewCtrl: ViewController,
              public alertCtrl: AlertController) {}

  ionViewDidLoad() {
  	this.viewCtrl.setBackButtonText('HOME');
  }

  call(){
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
}
