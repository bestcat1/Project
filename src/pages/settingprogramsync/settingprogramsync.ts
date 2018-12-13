import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingprogramsyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingprogramsync',
  templateUrl: 'settingprogramsync.html',
})
export class SettingprogramsyncPage {
  user;
  item$ =[];
  pro_sync;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private api : NodeapiProvider) {
    this.user=this.navParams.get('user');

  }

  ionViewWillEnter(){
    this.api.getProgramSync(this.user).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.item$ = value;
      for(let i=0;i<value.length;i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    } else {
      this.item$ = [];
    }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingprogramsyncPage');
  }
  addpro(data:NgForm){
    if(data.value.pro_sync!=''){
      var c=0;
      if(this.item$.length!=0){
        for(let i=0;i<this.item$.length;i++){
          if(this.item$[i].pro_sync == data.value.pro_sync){
            c=c;
          } else {
            c++;
          }
        }
      } else {
        c=0;
      }

      if(c==this.item$.length){
        this.api.addProgramSync(this.user,data.value).subscribe(d=>{
          if(d.status=='OK'){
            this.pro_sync = '';
            this.ionViewWillEnter();
          }
        });
      } else {
        swal("ขออภัย!", "มีการใช้ชื่อการเหนี่ยวนำนี้อยู่แล้ว", "warning");
      }


    }
    else{
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }

  }
  removepro(k){
    this.api.removeProgramSync(this.user,k).subscribe(d=>{

      if(d.status =='OK'){
        console.log('asasasas');
        this.ionViewWillEnter();
      }
    });

  }
  stdetailsync(p){
    console.log(p);
    this.navCtrl.push("SettingdetailprogramsyncPage",{user:this.user,program:p})
  }
}
