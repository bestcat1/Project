import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the SettingdetailprogreammaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingdetailprogreammaintain',
  templateUrl: 'settingdetailprogreammaintain.html',
})
export class SettingdetailprogreammaintainPage {
data_drug;
user;
program;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public modalCtrl:ModalController,private db :AngularFireDatabase) {
    this.user=this.navParams.get('user');
    this.program=this.navParams.get('program');
    console.log(this.user, this.program);

    this.data_drug=this.db.list('/setting/farm/program_maintain/drug_pro_maintain/'+this.user,ref=>ref.orderByChild('pro_maintain').equalTo(this.program)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdetailprogreammaintainPage');
  }
  addpromain(data:NgForm){
    console.log(data.value);
    this.db.list('/setting/farm/program_maintain/drug_pro_maintain/'+this.user).push(data.value);
  }
  detail(d){
    let profileModal = this.modalCtrl.create("ShowdetailprogrammaintainPage", {detail:d,user:this.user});
    profileModal.present();
  }
  delete(k){
    this.db.list('/setting/farm/program_maintain/drug_pro_maintain/'+this.user).remove(k);
  }
}
