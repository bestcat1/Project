import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingnotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingnotification',
  templateUrl: 'settingnotification.html',
})
export class SettingnotificationPage {
  user;
  notification: any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public alertCtrl: AlertController,
    private toastCtrl: ToastController, private api: NodeapiProvider) {
    this.user = this.navParams.get('user');
    console.log(this.user);
    this.api.showNotification(this.user).subscribe(data => {
      this.notification = Object.keys(data).map(key => data[key]);
      for (let i = 0; i < this.notification.length; i++) {
        this.notification[i].key = Object.keys(data)[i];
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingnotificationPage');
  }
  edit(k, d, l, n) {
    let alert = this.alertCtrl.create({
      title: l + '(' + n + ')',
      subTitle: 'แก้ไขจำนวนวันแจ้งเตือน(วัน)',
      inputs: [
        {
          name: 'day_length',
          value: d,
          type: 'number',
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
          text: 'แก้ไข',
          handler: data => {
            this.api.editNotificationByKey(this.user, k, { day_length: data.day_length })
            this.presentToast();
          }
        }
      ]
    });
    alert.present();
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'แก้ไขข้อมูลเสร็จสิ้น',
      duration: 2000,
      position: 'buttom'
    });
    toast.present();
  }
}
