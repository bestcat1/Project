import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ShowdetailprogramsyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdetailprogramsync',
  templateUrl: 'showdetailprogramsync.html',
})
export class ShowdetailprogramsyncPage {
  user;
key;
day_length;
time_length;
drug_sync;
edit=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController
  ,private db:AngularFireDatabase,public alertCtrl:AlertController) {
    this.key=this.navParams.get('key');
    this.day_length=this.navParams.get('day_length');
    this.time_length=this.navParams.get('time_length');
    this.drug_sync=this.navParams.get('drug_sync');
    this.user=this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdetailprogramsyncPage');
  }
  back(){
    this.viewCtrl.dismiss()
  }
  cancel(e){
    this.edit=e;
  }
  edits(data:NgForm){
    console.log(data.value);
    this.db.list('/setting/farm/program_sync/drug_pro_sync/'+this.user).update(this.key,{day_length:data.value.day_length,time_length:data.value.time_length});
    let alert = this.alertCtrl.create({
      title: 'แก้ไขข้อมูล',
      subTitle: 'แก้ไขข้อมูเสร็จสิ้น',
      buttons: ['ตกลง']
    });
    alert.present();
    this.viewCtrl.dismiss()
  }

}
