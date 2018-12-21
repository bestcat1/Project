import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the DetailNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-notification',
  templateUrl: 'detail-notification.html',
})
export class DetailNotificationPage {
detail:any;
user:any;
date:any
showDetail:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api:NodeapiProvider,private alertCtrl:AlertController,
    private localNotifications:LocalNotifications) {
    this.detail = this.navParams.get('detail');
    this.user = this.navParams.get('user');
    this.date = this.navParams.get('date');

   
  }
  ionViewWillEnter(){
  
    this.api.getDateByDate(this.user,this.date).subscribe(data=>{
      if(data!=null){
        this.showDetail = [];
        var values = Object.keys(data).map(key=>data[key]);
        for(let i =0;i<values.length;i++){
          if(values[i].type == this.detail.type){
            values[i].key = Object.keys(data)[i];
            this.showDetail.push(values[i]);
          }
        }
      }
      else{
        this.showDetail = [];
      }
     
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailNotificationPage');
  }

  delete(d){
    console.log(d);
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      message: 'ท่านต้องการลบการแจ้งเตือนจริงหรือไม่?',
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
    this.api.deleteAlertDataDetail(this.user,this.date,d.key).subscribe();

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
        text: this.textnoti(Object.keys(element).map(key=>element[key])),
        trigger: { at: new Date(time1) },
       });
       i++;
        })

      })
    })
            this.ionViewWillEnter();
          }
        }
      ]
    });
    alert.present();
  }

  textnoti(value){
    var text='';
    var c = [];
 
   for(let i = 0 ; i< value.length;i++){
     if(i == 0){
       c.push({type:value[i].type,count:0})
     }
     else {
       for(let j = 0; j<c.length;j++){
         if(c[j].type != value[i].type){
           c.push({type:value[i].type,count:0});
           break;
         }
       }
     }
   }
   for(let i =0;i<c.length;i++){
     for(let j=0;j<value.length;j++){
       if(c[i].type == value[j].type){
         c[i].count++;
       }
     }
   }
   text += 'วันนี้มีรายการจัดการ '+value.length+' รายการ\n';
   c.forEach(element=>{
     text += element.type+' '+element.count+' รายการ\n';
   })
     return text;
   }
}
