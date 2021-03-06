import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
data_sync;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private api : NodeapiProvider,private alertCtrl:AlertController) {
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
    this.api.getSyncByUser(this.user).subscribe(data=>{
      console.log(data);
      this.data_sync = Object.keys(data).map(key=>data[key]);
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
  removepro(k,t){
    var c = 0;
    var check = 0;
    if(this.data_sync.length!=0){
      for(let i=0;i<this.data_sync.length;i++){
        if(this.data_sync[i].program_sync == t){
          c=c;
          check++;
        }else {
          c++;
        }
      }
    }
    if(c==this.data_sync.length){
      this.api.removeProgramSync(this.user,k).subscribe(d=>{
        if(d.status =='OK'){
          console.log('asasasas');
          this.ionViewWillEnter();
        }
      });
    } else {
      let alert37 = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'มีการใช้ข้อมูลสีโค '+ check +' รายการ<br>กรุณาแก้่ไขข้อมูลโค',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');

            }
          },
          {
            text: 'แก้ไขข้มูล',
            handler: () => {
              this.navCtrl.push("ShowsynchronizePage",{user:this.user,privilege:'เจ้าของฟาร์ม'});
            }
          }
        ]
      });
      alert37.present();
    }

  }
  stdetailsync(p){
    console.log(p);
    this.navCtrl.push("SettingdetailprogramsyncPage",{user:this.user,program:p})
  }
}
