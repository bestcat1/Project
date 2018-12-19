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
drug_sync;
day_length;
time_length;
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public modalCtrl: ModalController
    ,private api:NodeapiProvider) {
      this.drug_sync='';
      this.day_length='';
      this.time_length='';
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
    } else {
      this.data_drug = [];
    }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdetailprogramsyncPage');
  }
  addprosync(data:NgForm){
    if(data.value.pro_sync!=''&&data.value.day_length!=''&&data.value.time_length!=''){
      var c=0;
      for(let i=0;i<this.data_drug.length;i++){
        if(this.data_drug[i].drug_sync == data.value.drug_sync){
          c=c;
        } else {
          c++;
        }
      }
      if(c==this.data_drug.length){
        this.api.addDetailProgramSync(this.user,data.value).subscribe(d=>{
          if(d.status=='OK'){
            this.drug_sync='';
            this.day_length='';
            this.time_length='';
            this.ionViewWillEnter();
          }
        });
      } else {
        swal("ขออภัย!", "มีการใช้ชื่อรายการเหนี่ยวนำนี้อยู่แล้ว", "warning");
      }

    }else{
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }


  }
  delete(k){
    this.api.removeDetailProgramSync(this.user,k).subscribe(d=>{
      if(d.status == 'OK'){
        this.ionViewWillEnter();
      }
    });

  }
  detail(k,d,t,ds){
    this.navCtrl.push("ShowdetailprogramsyncPage", {user:this.user,key:k,day_length:d,time_length:t,drug_sync:ds });
  }



}
