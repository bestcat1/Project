import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingcolorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingcolor',
  templateUrl: 'settingcolor.html',
})
export class SettingcolorPage {
item$;
user;
colors=[];
datacolor:String;
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public alertCtrl: AlertController,
    private api:NodeapiProvider) {

  }
  ionViewWillEnter(){
    this.datacolor='';
    this.colors = [];
    this.user=this.navParams.get('user');
    this.api.getColor(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.item$ = values;
      for(let i = 0 ; i < values.length ; i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    }
    })

    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        this.colors.push(snap.color);
      })
    }
    })


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingcolorPage');
  }
  addcolor(data:NgForm){
    if(data.value.color!=''){
    this.api.addColor(this.user,data.value).subscribe(d=>{
      if(d.status=='OK'){
        this.datacolor='';
        this.ionViewWillEnter()
      }
    });
    } else {
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
    }

  }
  removecolor(k,c){
    let check=0;

    for(let i = 0 ;i<this.colors.length;i++){
      if(this.colors[i]==c){
        check++;
      }
      else{
        check=check;
      }
    }

      if(check==0){
        this.api.removeColor(this.user,k).subscribe(d=>{
          if(d.status=='OK'){
            this.ionViewWillEnter()
          }
        });

      }
      else{
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
                this.navCtrl.push("EditcattlePage",{user:this.user,corral:'ทั้งหมด'});
              }
            }
          ]
        });
        alert37.present();
      }

  }
editcolor(k,c){
console.log(c);
    let alert38 = this.alertCtrl.create({
      title: 'ชื่อ',
      inputs: [
        {
          name: 'color',
          value: c ,
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: data => {
            this.api.updateColor(this.user,k,{color:data.color}).subscribe(d=>{
              this.api.getCattleByColor(this.user,c).subscribe(data=>{
                if(data!=null){
                var values = Object.keys(data);
                values.forEach(snap=>{
                  this.api.updateType('cattle',this.user,snap,{color:data.color}).subscribe();
                })
              }
              });
              this.ionViewWillEnter()
            });
          }
        }
      ]
    });
    alert38.present();
  }
}
