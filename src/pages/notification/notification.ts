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
check7day=[];
check3day=[];
check0day=[];
checkAfter = [];
  monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฏาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษศิกายน", "ธันวาคม"
];;
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  privilege
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public localNotifications: LocalNotifications, private api: NodeapiProvider) {
    this.user = this.navParams.get('user');
    this.privilege = this.navParams.get('privilege');
    console.log(this.privilege);
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

    var test = new Date();
    var thisDate =test.getFullYear()+"-"+this.month_of_the_year(test)+"-"+this.day_of_the_month(test);
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
              var date1 = new Date();
              var date2 = new Date(values[i].date);
              var timeDiff = (date2.getTime() - date1.getTime());
              var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
              if(diffDays<=7 && diffDays>3){
                this.check7day.push(values[i]);
              }
              else if(diffDays<=3 && diffDays>0){
                this.check3day.push(values[i]);
              } else if(diffDays ==  0){
                this.check0day.push(values[i]);
              } else if(diffDays < 0) {
                this.checkAfter.push(values[i]);
              }
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
          console.log(Object.keys(element).length,i);
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
       i++;
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
    this.currentYear = this.date.getFullYear()+543;

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
  var setDate = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+a;
  this.x = this.c;
  this.y = this.b;


  var test = new Date(setDate);
  var thisDate =test.getFullYear()+"-"+this.month_of_the_year(test)+"-"+this.day_of_the_month(test);


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
    var d = new Date(this.notification[i].date)
    var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    if(date == thisDate1){
      hasEvent = true;
      break;
    }
    else{
      hasEvent = false;
    }
  }
  return hasEvent;
}

checkEventlength(day) {
  var hasEvent = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day;
  for(let i=0;i<this.check7day.length;i++){
    var d = new Date(this.check7day[i].date)
    var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    if(date == thisDate1){
      hasEvent = true;
      break;
    }
    else{
      hasEvent = false;
    }
  }
  return hasEvent;
}

checkEventlength3(day) {
  var hasEvent = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day;
  for(let i=0;i<this.check3day.length;i++){
    var d = new Date(this.check3day[i].date)
    var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    if(date == thisDate1){
      hasEvent = true;
      break;
    }
    else{
      hasEvent = false;
    }
  }
  return hasEvent;
}
checkEventlength0(day) {
  var hasEvent = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day;
  for(let i=0;i<this.check0day.length;i++){
    var d = new Date(this.check0day[i].date)
    var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    if(date == thisDate1){
      hasEvent = true;
      break;
    }
    else{
      hasEvent = false;
    }
  }
  return hasEvent;
}

checkEventlengthAfter(day) {
  var hasEvent = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day;
  for(let i=0;i<this.checkAfter.length;i++){
    var d = new Date(this.checkAfter[i].date)
    var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    if(date == thisDate1){
      hasEvent = true;
      break;
    }
    else{
      hasEvent = false;
    }
  }
  return hasEvent;
}

day_of_the_month(d)
  {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }
 month_of_the_year(d)
  {
    return ((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1);
  }
}
