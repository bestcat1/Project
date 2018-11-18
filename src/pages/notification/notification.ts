import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  user;
  notification = [];

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public localNotifications: LocalNotifications, private api: NodeapiProvider) {

    this.user = this.navParams.get('user');
      this.onInit();
  }

  onInit(){
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  delete(k, date) {
    console.log(this.user,date,k);
    this.api.deleteAlertDataDetail(this.user,date,k).subscribe();
    this.onInit();
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
}
