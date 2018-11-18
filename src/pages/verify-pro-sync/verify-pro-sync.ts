import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

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
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl:ViewController,private db: AngularFireDatabase) {
      this.user=this.navParams.get('user');
      this.program=this.navParams.get('program');
      console.log(this.program)
    this.drug_pro_sync=this.db.list('/setting/farm/program_sync/drug_pro_sync/'+this.user,ref=>ref.orderByChild('pro_sync').equalTo(this.program)).snapshotChanges().map(chang =>{
        return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
     });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyProSyncPage');
  }

  back(){
    this.viewCtrl.dismiss();
  }
}
