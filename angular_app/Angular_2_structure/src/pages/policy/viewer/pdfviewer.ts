//Angular Module Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ConfigService } from '../../../providers/config.service';
//App Services Imports
import { GetPolicyListService } from '../../../providers/getPolicyList.service';
import { PolicyDocumentService } from '../../../providers/getPolicyDocument.service';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
    selector: 'page-viewer',
    templateUrl: 'pdfviewer.html',
    providers: [File, FileOpener]
})
export class PdfViewerPage implements OnInit {

    pdfSrc: string = '';
    pageLabel: string = '';
    page: number = 1;
    path: string = '';
    pageCount: number = 1;
    zoom: number = 100;
    zoompdf: number = 1.0;
    zoomMin: number = 1.0 - 200.0;
    zoomMax: number = 1.0 + 200.0;
    pageTitle: any = '';

    constructor(
        public navCtrl: NavController,
        public _navParams: NavParams,
        private file: File,
        private fileOpener: FileOpener,
        public alertCtrl: AlertController,
        public plt: Platform,
        public viewCtrl: ViewController) {
            if(this.pageCount > 1){
 this.pageLabel = 'Page: '+ this.page + ' of ' + this.pageCount + ' ';
            }
            else {
                 this.pageLabel = 'Page: '+ this.page ;
            }
           

    }

    ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('');
    }

    ngOnInit() {
        this.path = this._navParams.get('param1');
        this.page = this._navParams.get('param2');
        this.pageTitle = this._navParams.get('param3');
        this.pageCount = this._navParams.get('param4');
        this.pdfSrc = this.path;
	   if(this.pageCount > 1){
 this.pageLabel = 'Page: '+ this.page + ' of ' + this.pageCount + ' ';
            }
            else {
                 this.pageLabel = 'Page: '+ this.page ;
            }
        
    }
    previousPage(): void {		
        if (this.page != 1){
            this.page = this.page - 1;
               if(this.pageCount > 1){
 this.pageLabel = 'Page: '+ this.page + ' of ' + this.pageCount + ' ';
            }
            else {
                 this.pageLabel = 'Page: '+ this.page ;
            }
        }
	}

    nextPage(): void {
        if (this.page < this.pageCount) {		
		   this.page = this.page + 1;
               if(this.pageCount > 1){
 this.pageLabel = 'Page: '+ this.page + ' of ' + this.pageCount + ' ';
            }
            else {
                 this.pageLabel = 'Page: '+ this.page ;
            }
        }
	}

    updateResults(): void {		
		this.zoompdf = 2.5 - this.zoom / 100;
		console.log(this.zoompdf);
	}
}
