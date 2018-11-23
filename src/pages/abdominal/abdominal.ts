import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the AbdominalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abdominal',
  templateUrl: 'abdominal.html',
})
export class AbdominalPage {
  bmark: boolean = true;
  EPmark: boolean = true;
  user: string;
  calve_date;
  alert_befor_7D;
  alert_after_7D;
  alert_sync;
  date;
  time;
  name;

  operator=[];
  item:any;
  id;
  noti_setting:Observable<any[]>;
noti_oestrus;
noti_pregnant;
  number_breed = [];
  items: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public alertCtrl: AlertController, public viewCtrl: ViewController,private api:NodeapiProvider) {
    var d = new Date();
    this.id = this.navParams.get('id');
    this.user = this.navParams.get('user');

  this.api.getTypeByKey('cattle',this.user,this.id).subscribe(data=>{
    if(data!=null){
    var number;
    var day;
    this.item = Object.keys(data).map(key => data[key]);
    this.item[0].key = Object.keys(data)[0];
    number =Object.keys(data).map(key => data[key])[0].number_of_breeding;
    console.log('asdasd'+number);
    this.api.getDataBreedById(this.user,this.id).subscribe(snap=>{
      console.log(snap);
      if(snap!=null){
      var value = Object.keys(snap).map(key=>snap[key]);
      for(let i=0; i<value.length;i++){
        if(number == value[i].number_of_breeding){

         day = value[i].date_breeding;
         console.log(day);
      var y1k = new Date(day);
      var y2k = new Date(day);
      var y3k = new Date(day);
      var y4k = new Date(day);
      y1k.setDate(y1k.getDate() + 283);
      this.calve_date = y1k.getFullYear() + "-" + (y1k.getMonth() + 1) + "-" + y1k.getDate();
      y2k.setDate(y2k.getDate() + 276);
      this.alert_befor_7D = y2k.getFullYear() + "-" + (y2k.getMonth() + 1) + "-" + y2k.getDate();
      y3k.setDate(y3k.getDate() + 290);
      this.alert_after_7D = y3k.getFullYear() + "-" + (y3k.getMonth() + 1) + "-" + y3k.getDate();
      y4k.setDate(y4k.getDate() + 18);
      this.alert_sync = y4k.getFullYear() + "-" + (y4k.getMonth() + 1) + "-" + y4k.getDate();
        break;
        }
    }
  }
    })

  }
  })


    this.time = d.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false });


    this.date = d.getFullYear() + "-" + month_of_the_year(d) + "-" + day_of_the_month(d);
    function day_of_the_month(d) {
      return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }
    function month_of_the_year(d) {
      return ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    }


    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      this.name = values[0].fname+' '+values[0].lname;
      this.operator.push({operator: values[0].fname+' '+values[0].lname});
      }
    });

    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      for(let i = 0; i<values.length;i++){
        this.operator.push({operator: values[i].fname+' '+values[i].lname});
      }
    }
    });

    this.api.getNotiById(this.user,0).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.noti_oestrus = value[0].day_length;
      }
    })

    this.api.getNotiById(this.user,2).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.noti_pregnant = value[0].day_length;
      }
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbdominalPage');
  }
  markb(a) {
    console.log(a);
    if (a == true) {
      this.bmark = false;
    }
    else {
      this.bmark = true;
    }
  }
  markep(b) {
    if (b == true) {
      this.EPmark = false;
    }
    else {
      this.EPmark = true;
    }
  }
  abd(data: NgForm, k) {
    if (data.value.result == "") {
      const alert1 = this.alertCtrl.create({
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert1.present();
    }
    else {
      let alert2 = this.alertCtrl.create({
        title: 'การบันทึก',
        message: 'ยืนยันการบันทึกข้อมูล?',
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
              this.api.addPregnant(this.user,{ dam_id: data.value.dam_id, alert_after_7D: this.alert_befor_7D, alert_sync: this.alert_sync, calve_date:  this.calve_date, dateabd: data.value.dateabd, not_pregnant_noti: data.value.not_pregnant_noti, note: data.value.note, pregnant_noti: data.value.pregnant_noti, result: data.value.result, timeabd: data.value.timeabd ,recoder:data.value.recoder,operator:data.value.operator, alert_befor_7D: this.alert_befor_7D }).subscribe();
              if(data.value.result=='ท้อง'){
                this.api.updateType('cattle',this.user,k,{status: "ตรวจท้องแล้ว" }).subscribe();
              }
              else{
                this.api.updateType('cattle',this.user,k,{status: "โคแท้ง" }).subscribe();
              }

              this.success();
              this.viewCtrl.dismiss();
            }

          }
        ]
      });
      alert2.present();
    }

  }
  success() {
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
  test(a:string){
    console.log(a);
    var day = a;
    var y1k = new Date(day);
    var y2k = new Date(day);
    var y3k = new Date(day);
    var y4k = new Date(day);
    y1k.setDate(y1k.getDate() + 283);
    this.calve_date = y1k.getFullYear() + "-" + (y1k.getMonth() + 1) + "-" + y1k.getDate();
    y2k.setDate(y2k.getDate() + 276);
    this.alert_befor_7D = y2k.getFullYear() + "-" + (y2k.getMonth() + 1) + "-" + y2k.getDate();
    y3k.setDate(y3k.getDate() + 290);
    this.alert_after_7D = y3k.getFullYear() + "-" + (y3k.getMonth() + 1) + "-" + y3k.getDate();
    y4k.setDate(y4k.getDate() + 18);
    this.alert_sync = y4k.getFullYear() + "-" + (y4k.getMonth() + 1) + "-" + y4k.getDate();

  }
}
