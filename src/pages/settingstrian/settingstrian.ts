import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingstrianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingstrian',
  templateUrl: 'settingstrian.html',
})
export class SettingstrianPage {
user;
item$
strian=[];
datastrian:String;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public alertCtrl:AlertController,
    private api: NodeapiProvider) {
      this.user=this.navParams.get('user');
  }

  ionViewWillEnter(){
    this.datastrian='';
    this.strian = [];
    this.api.getBreed(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.item$ = values
      for(let i=0;i<values.length;i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    }
    })

    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        this.strian.push(snap.breed);
      })
    }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingstrianPage');
  }
  addstrian(data:NgForm){
    if(data.value.strian!=''){
      var c=0;
      for(let i=0;i<this.item$.length;i++){
        if(this.item$[i].strian == data.value.strian){
          c=c;
        }
        else {
          c++;
        }
      }
      if(c==this.item$.length){
        this.api.addSettingBreed(this.user,data.value).subscribe(d=>{
          if(d.status=='OK'){
             this.datastrian='';
             this.ionViewWillEnter()
          }
        });
      } else {
        swal("ขออภัย!", "มีการใช้ชื่อสายพันธุ์นี้อยู่แล้ว", "warning");
      }

    }
    else{
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }

  }
  removestrian(k,c){
    let check=0;
    console.log(c,this.strian,this.strian.length);
    for(let i = 0 ; i<this.strian.length;i++){
      if(this.strian[i]==c){
        check++;
      }else{
        check=check;
      }
    }
      if(check==0){
        this.api.removeBreed(this.user,k).subscribe(d=>{
          if(d.status=='OK'){
            this.ionViewWillEnter()
          }
        });
      }
      else{
        let alert41 = this.alertCtrl.create({
          title: 'คำเตือน',
          subTitle: 'มีการใช้ข้อมูลสายพันธุ์โค '+ check +' รายการ<br>กรุณาแก้่ไขข้อมูลโค',
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
                this.navCtrl.push("EditcattlePage",{user:this.user,corral:'ทั้งหมด'})
              }
            }
          ]
        });
        alert41.present();
      }
  }
  editstrian(k,c){

    console.log(c);

    let alert42 = this.alertCtrl.create({
      title: 'ชื่อ',
      inputs: [
        {
          name: 'spi',
          value: c ,
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: data => {
            this.api.updateBreed(this.user,k,{strian:data.spi}).subscribe(d1=>{
              if(d1.status=='OK'){
                this.api.getCattleByBreed(this.user,c).subscribe(data=>{
                  if(data!=null){
                  var value = Object.keys(data);
                  value.forEach(snap=>{
                    this.api.updateType('cattle',this.user,snap,{breed:data.spi}).subscribe();
                  })
                }
                })
                this.ionViewWillEnter();
              }
            });
          }
        }
      ]
    });
    alert42.present();

  }
}
