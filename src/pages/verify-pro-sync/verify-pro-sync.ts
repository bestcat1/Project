import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the VerifyProSyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-pro-sync',
  templateUrl: 'verify-pro-sync.html',
})
export class VerifyProSyncPage {
drug_pro_sync;
program;
user;
DetailPro:any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl:ViewController) {
      this.user=this.navParams.get('user');
      this.program=this.navParams.get('program');
      console.log(this.program)
    this.DetailPro = this.navParams.get('detail');
    console.log(this.DetailPro);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyProSyncPage');
  }

  back(){
    this.viewCtrl.dismiss();
  }
}
