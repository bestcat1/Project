import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import { Calendar } from '@ionic-native/calendar';
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
  date: any;
  daysInThisMonth=[];
  daysInLastMonth=[];
  daysInNextMonth=[];
  selectDate;
  detailDate;
a;
b;
c;
x;y;
  monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฏาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษศิกายน", "ธันวาคม"
];;
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public localNotifications: LocalNotifications, private api: NodeapiProvider, private calendar: Calendar) {
    this.user = this.navParams.get('user');
     this.onInit();
    this.date = new Date();
    this.a = new Date();
    this.getDaysOfMonth();
    this.b = this.date.getMonth();
    this.c = this.date.getFullYear();
    this.x = this.c;
  this.y = this.b;
   // if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    // } else {
    //   this.currentDate = 999;
    // }
    var thisDate = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
    this.selectDate = this.date.toLocaleDateString();
    this.api.getDateByDate(this.user,thisDate).subscribe(data=>{
      if(data!=null){
        var values = Object.keys(data).map(key=>data[key]);
        this.detailDate = values;
        for(let i=0;i<values.length;i++){
          this.detailDate[i].key = Object.keys(data)[i];
        }
      }
      else{
        this.detailDate = [];
      }

    })
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
              // this.calendar.createEvent(values[i].id_cattle,values[i].type, values[i].type, new Date(values[i].date), new Date(values[i].date))
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

    this.api.getDateByDate(this.user,date).subscribe(data=>{
      if(data!=null){
        var values = Object.keys(data).map(key=>data[key]);
        this.detailDate = values;
        for(let i=0;i<values.length;i++){
          this.detailDate[i].key = Object.keys(data)[i];
        }
      }
      else{
        this.detailDate = [];
      }

    })
  }
  getDaysOfMonth() {

    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    console.log(this.monthNames[this.date.getMonth()]);
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();

    for ( i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }
  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.b = this.date.getMonth();
    this.c = this.date.getFullYear();
    this.getDaysOfMonth();
  }
  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.b = this.date.getMonth();
    this.c = this.date.getFullYear();
    this.getDaysOfMonth();
  }

  test(a){
  console.log(a,this.date.getFullYear(), this.date.getMonth());
  this.currentDate = new Date(this.c,this.b,a).getDate();
  var thisDate = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+a;
  this.x = this.c;
  this.y = this.b;
  this.selectDate = new Date(this.c,this.b,a).toLocaleDateString();
  this.api.getDateByDate(this.user,thisDate).subscribe(data=>{
    if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.detailDate = values;
      for(let i=0;i<values.length;i++){
        this.detailDate[i].key = Object.keys(data)[i];
      }
    }
    else{
      this.detailDate = [];
    }

  })
}
checkEvent(day) {
  var hasEvent = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day;

  for(let i=0;i<this.notification.length;i++){
    if(this.notification[i].date == thisDate1){
      hasEvent = true;
      break;
    }
    else{
      hasEvent = false;
    }
  }
  return hasEvent;
}
}
