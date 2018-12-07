import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the EditdetailcattlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdetailcattle',
  templateUrl: 'editdetailcattle.html',
})
export class EditdetailcattlePage {

corral
strian;
color
user:string;
id;
item$ ;
herd_num
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl:ViewController,public alertCtrl:AlertController,public toastCtrl: ToastController,
    private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.id=this.navParams.get('id');
    this.api.getTypeByKey('cattle',this.user,this.id).subscribe(data=>{
      this.item$ = Object.keys(data).map(key=>data[key]);
      for(let i=0 ; i<Object.keys(data).length;i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    })

    this.api.getCorral(this.user).subscribe(data=>{
      this.corral = Object.keys(data).map(key=>data[key]);
    })

    this.api.getFarm('breed',this.user).subscribe(data=>{
      this.strian = Object.keys(data).map(key => data[key]);
      console.log(this.strian);
    })

    this.api.getFarm('color',this.user).subscribe(data=>{
      this.color = Object.keys(data).map(key=>data[key]);
    })
    this.api.showHerdNumber(this.user).subscribe(data=>{
      this.herd_num = Object.keys(data).map(key=>data[key]);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdetailcattlePage');
  }
editc(data:NgForm,k){
  console.log(data.value);

  this.api.updateType('cattle',this.user,k,data.value).subscribe(d=>{
    if(d.status=='OK'){
      this.presentToast();
      this.viewCtrl.dismiss();
    }
  });

}
exit(){
  let alert27 = this.alertCtrl.create({
      title: 'ยกเลิก',
      message: 'ยกเลิกการแก้ไขข้อมูลทั้งหมด?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
          this.viewCtrl.dismiss();
          }

        }
      ]
    });
    alert27.present();

}
presentToast() {
  const toast = this.toastCtrl.create({
    message: 'แก้ไขข้อมูลเสร็จสิ้น',
    duration: 2000,
    position:'bottom'
  });
  toast.present();

}

}
