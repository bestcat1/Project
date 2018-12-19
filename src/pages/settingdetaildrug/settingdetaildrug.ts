import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingdetaildrugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingdetaildrug',
  templateUrl: 'settingdetaildrug.html',
})
export class SettingdetaildrugPage {
user;
detail;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
    this.user = this.navParams.get('user');
    this.detail = this.navParams.get('detail');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdetaildrugPage');
  }
  adddrug(data: NgForm){
    console.log(this.detail.key);
    console.log(data.value);
    this.api.updateDrug(this.user,this.detail.key,data.value).subscribe(d=>{
      if(d.status == 'OK'){
        swal("เสร็จสิ้น!", "บันทึกข้อมูลเสร็จสิ้น", "success");
        this.navCtrl.pop();
      }
    })
  }
  cancel(){
    this.navCtrl.pop();
  }

  test(){
    if(this.detail.exp_date == ''||this.detail.mfd_date== ''){
      this.detail.exp_date = this.detail.exp_date
    }
    else {
      var date1 = new Date(this.detail.mfd_date);
      var date2 = new Date(this.detail.exp_date);
      var timeDiff = (date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(diffDays<0){
        this.detail.exp_date = this.detail.mfd_date;
      }
    }
    console.log(this.detail.mfd_date);
  }
  test1(){
    console.log(this.detail.exp_date);
    if(this.detail.exp_date == ''||this.detail.mfd_date == ''){
      this.detail.exp_date = this.detail.exp_date
    }
    else {
      var date1 = new Date(this.detail.mfd_date);
      var date2 = new Date(this.detail.exp_date);
      var timeDiff = (date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(diffDays<0){
        this.detail.mfd_date= this.detail.exp_date
      }
    }
  }
}
