import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingherdnumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingherdnum',
  templateUrl: 'settingherdnum.html',
})
export class SettingherdnumPage {
  dataherd='';
  item$:any;
  user;
  detail;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider,
    public alertCtrl: AlertController) {

  }

  ionViewWillEnter(){
    this.user=this.navParams.get('user');
    this.api.showHerdNumber(this.user).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.item$ = value;
      for (let i=0;i<value.length;i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    }
    })
this.api.getAllCattle(this.user).subscribe(data=>{
  this.detail = Object.keys(data).map(key=>data[key]);
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingherdnumPage');
  }

  addherd(data:NgForm){
    if(data.value.herd_num!=''){
      console.log(data.value);
      this.api.addHerdNumber(this.user,data.value).subscribe();
      this.ionViewWillEnter();
      this.dataherd='';
    }
    else
    {
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
    }

  }

  removeherd(key,herd){
   let c=0;
    for(let i=0;i<this.detail.length;i++){
      if(this.detail[i].herd_no == herd){
        c++;
      }
      else{
        c=c;
      }
    }
    if(c == 0){

      this.api.deleteHerdNumber(this.user,key).subscribe();
     this.ionViewWillEnter();
    }
    else{
      console.log(this.detail);
       this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'มีการใช้ข้อมูลคอกโค '+ c +' รายการ<br>กรุณาแก้่ไขข้อมูลโค',
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
              this.navCtrl.push("MncattlePage",{user:this.user,corral:'ทั้งหมด',type:'editcow'})
            }
          }
        ]
      }).present();
    }
  }

  editherd(key,herd){
    console.log(key,herd);
    let alert38 = this.alertCtrl.create({
      title: 'ชื่อฝูงโค',
      inputs: [
        {
          name: 'herd_num',
          value: herd ,
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

            console.log(data.herd_num);

            this.api.updateHerdNumber(this.user,key,{herd_num:data.herd_num}).subscribe();
            this.api.getCattleByHerdNumber(this.user,herd).subscribe(data1=>{
              if(data!=null){
              var value = Object.keys(data1);
              for(let i = 0; i<value.length;i++){
                this.api.updateType('cattle',this.user,value[i],{herd_no:data.herd_num}).subscribe();
              }
            }
            })
            this.ionViewWillEnter()
          }
        }
      ]
    });
    alert38.present();
  }
}
