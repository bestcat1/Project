import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the EditdetailcalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdetailcalf',
  templateUrl: 'editdetailcalf.html',
})
export class EditdetailcalfPage {
id;
user;
detail:any;
key;
strian=[];
color = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider,
    private toastCtrl:ToastController,private alertCtrl:AlertController) {
    this.user=this.navParams.get('user');
    this.id=this.navParams.get('id');
    this.api.getCalfById(this.user,this.id).subscribe(data=>{
      console.log(data);
      var value = Object.keys(data).map(key=>data[key]);
      this.detail = value;
      this.key = Object.keys(data)[0];
    })
    this.api.getBreed(this.user).subscribe(data=>{
      if(data!=null){

        this.strian = Object.keys(data).map(key=>data[key]);
        console.log(this.strian);
      } else {
        this.strian = [];
      }

    })
    this.api.getColor(this.user).subscribe(data=>{
      if(data!=null){
      this.color = Object.keys(data).map(key=>data[key]);
      } else {
        this.color = [];
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdetailcalfPage');
  }
  editc(data:NgForm){
    console.log(data.value);
    console.log(this.key);
    console.log(data.value);
    if(data.value.birth_id==""||data.value.birth_weight==""||data.value.breed==""||data.value.color==""||data.value.name_cattle==""||data.value.sex=="")
    {
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    } else{
      this.api.editCalf(this.user,this.key,data.value).subscribe(d=>{
        if(d.status == 'OK'){
          this.presentToast();
          this.navCtrl.pop();
        }
      })
    }



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
          this.navCtrl.pop();
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
