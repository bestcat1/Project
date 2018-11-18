import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the ShowdetailprogrammaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdetailprogrammaintain',
  templateUrl: 'showdetailprogrammaintain.html',
})
export class ShowdetailprogrammaintainPage {
detail;
edit=true;
user;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController
    ,public alertCtrl:AlertController,private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.detail=this.navParams.get('detail');
    console.log(this.detail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdetailprogrammaintainPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }
  cancel(e){
    this.edit=e;
  }
  edits(data:NgForm){
    console.log(data.value);
    this.api.updateDetailMaintain(this.user,this.detail.key,data.value).subscribe();
    let alert = this.alertCtrl.create({
      title: 'แก้ไขข้อมูล',
      subTitle: 'แก้ไขข้อมูเสร็จสิ้น',
      buttons: ['ตกลง']
    });
    alert.present();
    this.viewCtrl.dismiss()
  }

}
