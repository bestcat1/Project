import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
user;
checktype=0;
notification = [];
settingnotification = [];
setiUser
type;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private api:NodeapiProvider
    , public localNotifications: LocalNotifications
    ,private toastCtrl: ToastController
    ,public alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    this.user=this.navParams.get('user');
    console.log(this.user);
    this.type = this.navParams.get('type')
    if(this.type == 'ตั้งค่าระบบฟาร์ม'){
      this.checktype=4;
      console.log(this.type)
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  selectType(t){
    if(t == 'การแจ้งเตือน'){
      this.checktype = 1;
      this.notifi();
    }
    if(t == 'ตั้งค่าการแจ้งเตือน'){
      this.checktype = 2;
      this.settingNoti();
    }
    if(t == 'จัดการข้อมูลผู้ใช้'){
      this.checktype = 3;
      this.settingUser();
    }
    if(t == 'ตั้งค่าระบบฟาร์ม'){
      this.checktype = 4;
    }

    console.log(t,this.checktype);
  }


  // ------------- setting ------------

  notifi(){
    this.notification = [];
    this.api.showAlertDate(this.user).subscribe(data => {
      if(data!=null){
        Object.keys(data).forEach(snap => {
          this.api.showAlertDateDetail(this.user, snap).subscribe(element => {
            var values = Object.keys(element).map(key => element[key]);
            let num = this.notification.length;
            for (let i = 0; i < values.length; i++) {
              this.notification.push(values[i]);
              this.notification[i + num].key = Object.keys(element)[0];
            }
          });
        });
      }
    });
  }

  delete(k, date) {
    console.log(this.user,date,k);
    this.api.deleteAlertDataDetail(this.user,date,k).subscribe();
    this.notifi();
    this.api.showAlertDate(this.user).subscribe(data=>{
      var i = 0;
      Object.keys(data).forEach(snap=>{
        console.log(snap);
        this.api.showAlertDateDetail(this.user,snap).subscribe(element=>{
          console.log(Object.keys(element).length);
          let day = new Date(snap).getDate();
          let year = new Date(snap).getFullYear();
          let month = new Date(snap).getMonth();
          let time1 = new Date(year, month, day, 7, 0, 0, 0);
          this.localNotifications.schedule({
        id: i,
        title: 'แจ้งเตือน',
        text: 'วันนี้มีรายการจัดการ ' + Object.keys(element).length + ' รายการ',
        trigger: { at: new Date(time1) },
       });
        })
      })

    })
  }

// --------------------- setting notification ------
settingNoti(){
  this.api.showNotification(this.user).subscribe(data => {
    this.settingnotification = Object.keys(data).map(key => data[key]);
    for (let i = 0; i < this.notification.length; i++) {
      this.settingnotification[i].key = Object.keys(data)[i];
    }
  })
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
          this.api.editNotificationByKey(this.user, k, { day_length: data.day_length }).subscribe(d=>{
            if(d.status == 'OK'){
              this.presentToast();
            }
          })

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

// ----------------- setting farm ----------
stcorral(){
  this.navCtrl.push("SettingcorralPage",{user:this.user});
}
ststrian(){
  this.navCtrl.push("SettingstrianPage",{user:this.user});
}
stcolor(){
  this.navCtrl.push("SettingcolorPage",{user:this.user});
}
stpromaintain(){
  this.navCtrl.push("SettingprogrammaintainPage",{user:this.user});
}
stprosync(){
  this.navCtrl.push("SettingprogramsyncPage",{user:this.user})
}
stdrug(){
  this.navCtrl.push("SettingdrugPage",{user:this.user})
}
stherdnum(){
  this.navCtrl.push("SettingherdnumPage",{user:this.user});
}

 // ------------- setting User ------------
 settingUser(){
   this.api.getUserByAdminfarm(this.user).subscribe(data=>{
     if(data!=null){
     var value = Object.keys(data).map(key=>data[key]);
     console.log(data);
     this.setiUser = value;
     for(let i=0;i<value.length;i++){
       this.setiUser[i].key = Object.keys(data)[i];
     }
    } else {
      this.setiUser = [] ;
    }
   })
 }
 selectprivilege(c){
   console.log(c);
  let alert = this.alertCtrl.create();
  alert.setTitle('สิทธิ์ผู้ใช้งาน');
  if(c.privilege=='ยังไม่ได้อนุมัติ'){
    alert.addInput({
      type: 'radio',
      label: 'ยังไม่ได้อนุมัติ',
      value: 'ยังไม่ได้อนุมัติ',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวแพทย์',
      value: 'สัตวแพทย์',

    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวบาล',
      value: 'สัตวบาล',
    });
    alert.addInput({
      type: 'radio',
      label: 'พนักงานฟาร์ม',
      value: 'พนักงานฟาร์ม',
    });
  }
  if(c.privilege=='สัตวแพทย์'){
    alert.addInput({
      type: 'radio',
      label: 'ยังไม่ได้อนุมัติ',
      value: 'ยังไม่ได้อนุมัติ',
    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวแพทย์',
      value: 'สัตวแพทย์',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวบาล',
      value: 'สัตวบาล',
    });
    alert.addInput({
      type: 'radio',
      label: 'พนักงานฟาร์ม',
      value: 'พนักงานฟาร์ม',
    })
  }
  if(c.privilege=='สัตวบาล'){
    alert.addInput({
      type: 'radio',
      label: 'ยังไม่ได้อนุมัติ',
      value: 'ยังไม่ได้อนุมัติ',
    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวแพทย์',
      value: 'สัตวแพทย์',

    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวบาล',
      value: 'สัตวบาล',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'พนักงานฟาร์ม',
      value: 'พนักงานฟาร์ม',
    })
  }

  if(c.privilege=='พนักงานฟาร์ม'){
    alert.addInput({
      type: 'radio',
      label: 'ยังไม่ได้อนุมัติ',
      value: 'ยังไม่ได้อนุมัติ',
    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวแพทย์',
      value: 'สัตวแพทย์',

    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวบาล',
      value: 'สัตวบาล',

    });
    alert.addInput({
      type: 'radio',
      label: 'พนักงานฟาร์ม',
      value: 'พนักงานฟาร์ม',
      checked: true
    })
  }


  alert.addButton('ยกเลิก');
  alert.addButton({
    text: 'บันทึก',
    handler: data => {
      this.api.updateUser(c.key,{privilege:data}).subscribe(d=>{
        if(d.status == 'OK'){
          this.settingUser();
        }
      });
    }
  });
  alert.present();
}
showdetail(d){
  console.log(d);
  this.navCtrl.push("DetailPage",{user:this.user,detail:d});
  // let profileModal = this.modalCtrl.create("StaffinfoPage", { detail: d });
  // profileModal.present();

}
}
