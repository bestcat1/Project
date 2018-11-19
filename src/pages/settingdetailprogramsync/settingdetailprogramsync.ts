import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

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
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public modalCtrl: ModalController
    ,private api:NodeapiProvider) {

    this.program=this.navParams.get('program');
    this.user=this.navParams.get('user');
    console.log(this.user,this.program);
  }
  ionViewWillEnter(){
    this.api.getDrugProgramSync(this.user,this.program).subscribe(data=>{
      console.log(data);
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.data_drug = value;
      for(let i=0;i<value.length;i++){
        this.data_drug[i].key = Object.keys(data)[i];
      }
    }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdetailprogramsyncPage');
  }
  addprosync(data:NgForm){
    console.log(data.value);
    this.api.addDetailProgramSync(this.user,data.value).subscribe();
    this.ionViewWillEnter();
  }
  delete(k){
    this.api.removeDetailProgramSync(this.user,k).subscribe();
    this.ionViewWillEnter();
  }
  detail(k,d,t,ds){
    this.navCtrl.push("ShowdetailprogramsyncPage", {user:this.user,key:k,day_length:d,time_length:t,drug_sync:ds });
  }



}
