import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

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
 ,public alertCtrl:AlertController,
  private api:NodeapiProvider) {
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
    this.api.updateDetailProgramSync(this.user,this.key,data.value).subscribe(d=>{
      if(d.status=='OK'){
        let alert = this.alertCtrl.create({
          title: 'แก้ไขข้อมูล',
          subTitle: 'แก้ไขข้อมูเสร็จสิ้น',
          buttons: ['ตกลง']
        });
        alert.present();
        this.viewCtrl.dismiss()
      }
    });

  }

}
