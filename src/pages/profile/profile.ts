import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Camera } from '../../../node_modules/@ionic-native/camera'
import firebase from 'firebase';
import { GlobalProvider } from '../../providers/global/global';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import swal from 'sweetalert';
import { Observable } from 'rxjs/Observable';





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
  brand_data:Observable<any[]>;
  detail_user;
  loader;
test=[];
logo_base64=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera,public alertCtrl:AlertController
    ,public global: GlobalProvider,public viewCtrl :ViewController,private db:AngularFireDatabase,
    public loadingCtrl:LoadingController) {
      this.presentLoading()
      this.user=this.global.getMyGlobalVar();
    this.myPhotosRef = firebase.storage().ref().child('/Photos/'+this.user);
    firebase.storage().ref().child('Photos/'+this.user+'/Logo').getDownloadURL().then((url)=>{
      this.myPhotoURL=url;
    })
    this.detail_user=this.db.list('/setting/farm/brand/'+this.user).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
    this.detail_user.forEach(element => {
      element.forEach(data=>{
        this.logo_base64.push(data.logo_base64);
      })
    });

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
      this.base64Data=imageData;
      this.myPhotoURL= "data:image/jpeg;base64,"+this.base64Data;
      this.logo_base64[0]=imageData;

      this.myPhoto = imageData;
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
      this.myPhoto = imageData;
      this.base64Data=imageData;
      this.myPhotoURL= "data:image/jpeg;base64,"+this.base64Data;
      this.logo_base64[0]=imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  private uploadPhoto(): void {
    this.myPhotosRef.child('Logo')
      .putString(this.logo_base64[0], 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
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
              this.db.list('/setting/farm/brand/'+this.user).update(k,{farm_name_TH:data.value.farm_name_TH,
              farm_name_EN:data.value.farm_name_EN,
              farm_initial:data.value.farm_initial,
              farm_address:data.value.farm_address,
              phone_num:data.value.phone_num,
              logo_base64:this.logo_base64[0]});
              this.uploadPhoto();
              swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success")
              this.viewCtrl.dismiss();
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
