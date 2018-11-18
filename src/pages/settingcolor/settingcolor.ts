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

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public alertCtrl: AlertController,
    private api:NodeapiProvider) {

  }
  ionViewWillEnter(){
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
    this.api.addColor(this.user,data.value).subscribe();
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
        this.api.removeColor(this.user,k).subscribe();
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
    let t=[];
    this.api.getCattleByColor(this.user,c).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data);
      values.forEach(snap=>{
        console.log(snap);
        t.push(snap);
      })
    }
    });
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

            this.api.updateColor(this.user,k,{color:data.color}).subscribe();

            for(let j=0;j<t.length;j++){
              this.api.updateType('cattle',this.user,t[j],{color:data.color}).subscribe();
            }
            t=[];

          }
        }
      ]
    });
    alert38.present();
  }
}
