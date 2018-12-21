import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingprogrammaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingprogrammaintain',
  templateUrl: 'settingprogrammaintain.html',
})
export class SettingprogrammaintainPage {
  user;
  item$
  data_maintain = [];
  pro_maintain:String;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl :ViewController,private api:NodeapiProvider,
    private alertCtrl:AlertController

    ) {
      this.ionViewWillEnter();
  }

  ionViewWillEnter(){
    this.pro_maintain='';
    this.api.getFarm('program_maintain',this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.item$ = values;
      for(let i=0;i<values.length;i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    } else {
      this.item$ = [];
    }
    })
    this.user=this.navParams.get('user');
    this.api.getMaintainByUser(this.user).subscribe(data=>{
      this.data_maintain = Object.keys(data).map(key=>data[key]);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingprogrammaintainPage');
  }
  addpro(data:NgForm){
    if(data.value.pro_maintain!=''){
      var c=0;
      for(let i=0;i<this.item$.length;i++){
        if(this.item$[i].pro_maintain == data.value.pro_maintain){
          c=c;
        }else {
          c++;
        }
      }
      if(c==this.item$.length){
        this.api.addProgram_maintain(this.user,data.value).subscribe(d=>{
          if(d.status=='OK'){
            this.pro_maintain='';
            this.ionViewWillEnter();
          }
        });
      } else {
        swal("ขออภัย!", "มีการใช้ชื่อการบำรุงนี้อยู่แล้ว", "warning");
      }


    }
    else {
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }

  }
  removepro(k,t){
    var c=0;
    var check=0;
    if(this.data_maintain.length!=0){
      for (let i = 0;i<this.data_maintain.length;i++){
        if(this.data_maintain[i].type_of_maintain == t){
          c=c;
          check++;
        }
        else {
          c++;
        }
      }
    }

    if(c==this.data_maintain.length){
      this.api.removeProgram_maintain(this.user,k).subscribe(d=>{
        if(d.status=='OK'){
          this.ionViewWillEnter();
        }
      });
    }
    else {
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
              this.navCtrl.push("ShowmaintainPage",{user:this.user,privilege:'เจ้าของฟาร์ม'});
            }
          }
        ]
      });
      alert37.present();
    }


  }
  setpromaintain(p){
    console.log(p);
    this.navCtrl.push("SettingdetailprogreammaintainPage",{user:this.user,program:p})
  }
}
