import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the SettingdetailprogramsyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingdetailprogramsync',
  templateUrl: 'settingdetailprogramsync.html',
})
export class SettingdetailprogramsyncPage {
program;
user;
data_drug;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase,public modalCtrl: ModalController) {

    this.program=this.navParams.get('program');
    this.user=this.navParams.get('user');
    this.data_drug=this.db.list('/setting/farm/program_sync/drug_pro_sync/'+this.user,ref=>ref.orderByChild('pro_sync').equalTo(this.program)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdetailprogramsyncPage');
  }
  addprosync(data:NgForm){
    console.log(data.value);
    this.db.list('/setting/farm/program_sync/drug_pro_sync/'+this.user).push(data.value);
  }
  delete(k){
    this.db.list('/setting/farm/program_sync/drug_pro_sync/'+this.user).remove(k);
  }
  detail(k,d,t,ds){
    let profileModal = this.modalCtrl.create("ShowdetailprogramsyncPage", {user:this.user,key:k,day_length:d,time_length:t,drug_sync:ds });
    profileModal.present();
  }

}
