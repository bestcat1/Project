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
  AlertDate;
  date_breed;
  items: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public alertCtrl: AlertController, public viewCtrl: ViewController,private api:NodeapiProvider) {
    var d = new Date();
    this.id = this.navParams.get('id');
    this.user = this.navParams.get('user');
    this.api.getNotiById(this.user,0).subscribe(data=>{
      var value = Object.keys(data).map(key=>data[key]);
      this.AlertDate = value[0];
    })



  this.api.getTypeByKey('cattle',this.user,this.id).subscribe(data=>{
    if(data!=null){
    var number;
    var day;
    this.item = Object.keys(data).map(key => data[key]);
    this.item[0].key = Object.keys(data)[0];
    number =Object.keys(data).map(key => data[key])[0].number_of_breeding;
    this.api.getDataBreedById(this.user,this.id).subscribe(snap=>{
      if(snap!=null){
      var value = Object.keys(snap).map(key=>snap[key]);
      for(let i=0; i<value.length;i++){
        if(number == value[i].number_of_breeding){
         day = value[i].date_breeding;
         this.date_breed = value[i].date_breeding;
         console.log(day);
      var y1k = new Date(day);
      var y2k = new Date(day);
      var y3k = new Date(day);


      this.api.getNotiById(this.user,2).subscribe(data=>{
        var value = Object.keys(data).map(key=>data[key]);
        console.log(value);
        y1k.setDate(y1k.getDate() + Number(value[0].day_length));
      this.calve_date = y1k.getFullYear() + "-" + this.month_of_the_year(y1k) + "-" + this.day_of_the_month(y1k);

      y2k.setDate(y2k.getDate() + (Number(value[0].day_length)-7));2
      this.alert_befor_7D = y2k.getFullYear() + "-" + + this.month_of_the_year(y2k) + "-" + this.day_of_the_month(y2k);
      y3k.setDate(y3k.getDate() + (Number(value[0].day_length)+7));
      this.alert_after_7D = y3k.getFullYear() + "-" + this.month_of_the_year(y3k) + "-" + this.day_of_the_month(y3k);

      })

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
        if(values[i].privilege != 'ยังไม่ได้อนุมัติ'){
          this.operator.push({operator: values[i].fname+' '+values[i].lname});
          }
      }
    }
    });

    this.api.getNotiById(this.user,0).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.noti_oestrus = value[0].day_length;
      var y4k = new Date();
      y4k.setDate(y4k.getDate() + Number(value[0].day_length));
      this.alert_sync = y4k.getFullYear() + "-" + this.month_of_the_year(y4k) + "-" + this.day_of_the_month(y4k);

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
    console.log(this.AlertDate);
    if (a == true) {
      this.bmark = false;
    }
    else {
      this.bmark = true;
    }
    console.log(this.bmark);
  }
  markep(b) {
    console.log(b);
    if (b == true) {
      this.EPmark = false;
    }
    else {
      this.EPmark = true;
    }
  }
  abd(data: NgForm, k) {
    if (data.value.result == "") {
      swal("ผิดพลาด!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
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
              this.api.addPregnant(this.user,{ dam_id: data.value.dam_id, alert_after_7D: this.alert_befor_7D, alert_sync: this.alert_sync, calve_date:  this.calve_date, dateabd: data.value.dateabd, not_pregnant_noti: data.value.not_pregnant_noti, note: data.value.note, pregnant_noti: data.value.pregnant_noti, result: data.value.result, timeabd: data.value.timeabd ,recoder:data.value.recoder,operator:data.value.operator, alert_befor_7D: this.alert_befor_7D }).subscribe(d2=>{
                if(d2.status=='OK'){
                  if(data.value.result=='ท้อง'){
                    this.api.updateType('cattle',this.user,k,{status: "ตรวจท้องแล้ว" }).subscribe(d=>{
                      if(d.status=='OK'){
                        this.api.addNoti(this.user,this.calve_date,{id_cattle: data.value.dam_id, type: 'วันคลอด', date: this.calve_date }).subscribe(d3=>{
                          if(d3.status == 'OK'){
                            this.api.addHistory(this.user,{dam_id:data.value.dam_id,date:data.value.dateabd
                              ,type:'ตรวจท้อง'}).subscribe(d3=>{
                                if(d3.status=='OK'){
                                  this.success();
                                  this.navCtrl.pop();
                                }
                              })
                          }
                        });

                      }
                    });
                  }
                  else{
                    this.api.updateType('cattle',this.user,k,{status: "ไม่ท้อง" }).subscribe(d=>{
                      if(d.status=='OK'){
                        this.api.addNoti(this.user,this.calve_date,{id_cattle: data.value.dam_id, type: 'บำรุงแม่พันธุ์', date: this.calve_date }).subscribe(d1=>{
                          if(d1.status=='OK'){
                            this.success();
                            this.navCtrl.pop();
                          }
                        });
                      }
                    })

                  }
                }
              });
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
  test(){
    console.log(this.date);
    var y1k = new Date(this.date_breed);
    var y2k = new Date(this.date_breed);
    var y3k = new Date(this.date_breed);

    y1k.setDate(y1k.getDate() + Number(this.noti_pregnant));
    this.calve_date = y1k.getFullYear() + "-" + this.month_of_the_year(y1k) + "-" + this.day_of_the_month(y1k);

    y2k.setDate(y2k.getDate() +  (Number(this.noti_pregnant)-7));
    this.alert_befor_7D = y2k.getFullYear() + "-"  + this.month_of_the_year(y2k) + "-" + this.day_of_the_month(y2k);
    y3k.setDate(y3k.getDate() +  (Number(this.noti_pregnant)+7));
    this.alert_after_7D = y3k.getFullYear() + "-"  + this.month_of_the_year(y3k) + "-" + this.day_of_the_month(y3k);

  }
  updateList(a){
    console.log(a.target.value);
    this.noti_pregnant = a.target.value;
    this.test();
  }
  changDate(){
    console.log(this.date);
    var y4k = new Date(this.date);
    y4k.setDate(y4k.getDate() + Number(this.noti_oestrus));
    this.alert_sync = y4k.getFullYear() + "-"  + this.month_of_the_year(y4k) + "-" + this.day_of_the_month(y4k);
  }
  updateList1(a){
    console.log(a.target.value);
    this.noti_oestrus = a.target.value;
    this.changDate();
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
