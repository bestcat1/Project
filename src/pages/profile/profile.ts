import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Camera } from '../../../node_modules/@ionic-native/camera'
import { GlobalProvider } from '../../providers/global/global';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import * as firebase from 'firebase';





/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  user;
  base64Data;
  detail_user;
  loader;
test=[];
  check=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera,public alertCtrl:AlertController
    ,public global: GlobalProvider,public viewCtrl :ViewController,
    public loadingCtrl:LoadingController,private api:NodeapiProvider) {
      this.presentLoading()
      this.user=this.global.getMyGlobalVar();
this.api.getPicLogoFromStorage(this.user).subscribe(data=>{
  var value = Object.keys(data).map(key=>data[key]);
  this.myPhotoURL = value[0].logo_base64;
  this.detail_user = value;
  this.detail_user[0].key = Object.keys(data)[0];
  console.log(this.detail_user);
  this.myPhotosRef = firebase.storage().ref();
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  takePhoto() {

    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      allowEdit:true,
      saveToPhotoAlbum: true,
      targetHeight:200,
      targetWidth:200,
    }).then(imageData => {
      this.check=1;
      this.myPhotoURL= "data:image/jpeg;base64,"+imageData;
      this.base64Data = imageData;

    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
      allowEdit:true,
      targetHeight:200,
      targetWidth:200,
    }).then(imageData => {
      this.check=1;
      this.myPhotoURL= "data:image/jpeg;base64,"+imageData;
      this.base64Data = imageData;
    }, error => {

      console.log("ERROR -> " + JSON.stringify(error));
    });

  }
 uploadPhoto(data,k) {
    if(this.check==1){
      this.myPhotosRef.child('/Photos/'+this.user+'/Logo')
      .putString(this.base64Data, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.api.updateBrandByKey(this.user,k,{
          farm_name_TH:data.farm_name_TH,
          farm_name_EN:data.farm_name_EN,
          farm_initial:data.farm_initial,
          farm_address:data.farm_address,
          phone_num:data.phone_num,
          logo_base64:savedPicture.downloadURL
        }).subscribe(d=>{
          if(d.status=='OK'){
            this.navCtrl.pop();
          this.loader.dismiss();
            swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success")
          }
        });
      });
    } else {
      this.api.updateBrandByKey(this.user,k,{
        farm_name_TH:data.farm_name_TH,
        farm_name_EN:data.farm_name_EN,
        farm_initial:data.farm_initial,
        farm_address:data.farm_address,
        phone_num:data.phone_num
      }).subscribe(d=>{
        if(d.status=='OK'){
          this.navCtrl.pop();
          this.loader.dismiss();
          swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success")
        }
      });
    }
  }
  edit_bran_farm(data:NgForm,k){
    console.log(data.value);
    if(data.value.farm_name_TH==''||data.value.farm_name_EN==''||data.value.farm_initial==''||data.value.farm_address==''||data.value.phone_num==''){
      swal("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'ยืนยัน',
        message: 'ยืนยันการบันทึกข้อมูล?',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'ตกลง',
            handler: () => {
                  this.presentLoading();
                  this.uploadPhoto(data.value,k);

            }
          }
        ]
      });
      alert.present();
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่...",
    });
    this.loader.present();

  }
  close(){
    this.loader.dismiss();
  }
}
