import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {DashboardPage} from '../../../dashboard/dashboard';

@Component({
    selector: 'app-update-success',
    templateUrl: 'update-success.html'
})
export class UpdateSuccessPage {

    constructor(public _navCtrl: NavController) {
    }

    loginPage() {
        this._navCtrl.setRoot(DashboardPage);
    }

}
