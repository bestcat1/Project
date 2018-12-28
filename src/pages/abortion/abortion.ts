import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the AbortionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abortion',
  templateUrl: 'abortion.html',
})
export class AbortionPage {
  user;
  id;
  noti;

  item;
  key;
  operator = [];
 number_of_breeding;
  date;
  name;
  names = [];
  viewDate
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private api: NodeapiProvider,
    private alertCtrl: AlertController) {
    this.user = this.navParams.get('user');
    this.id = this.navParams.get('id');
      var d = new Date();
      this.date=d.getFullYear()+"-"+month_of_the_year(d)+"-"+day_of_the_month(d);
      function day_of_the_month(d)
      {
        return (d.getDate() < 10 ? '0' : '') + d.getDate();
      }
      function month_of_the_year(d)
      {
        return ((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1);
      }
    this.api.getTypeByKey('cattle', this.user, this.id).subscribe(data => {
      if (data != null) {
        var value = Object.keys(data).map(key => data[key]);
        this.item = value;
        console.log(value[0]);

        this.key = Object.keys(data)[0];
      }
    });

    this.api.getUser(this.user).subscribe(data => {
      if (data != null) {
        var values = Object.keys(data).map(key => data[key]);
        this.name = values[0].fname + ' ' + values[0].lname;
        this.operator.push(values[0].fname + ' ' + values[0].lname);
      }
    });

    this.api.getPersonnel(this.user).subscribe(data => {
      if (data != null) {
        var values = Object.keys(data).map(key => data[key]);
        values.forEach(snap => {
          if(snap.privilege != 'ยังไม่ได้อนุมัติ'){
           this.operator.push(snap.fname + ' ' + snap.lname);
            }

        });
      }
    });
    this.api.getNotiById(this.user, 9).subscribe(data => {
      if (data != null) {
        var values = Object.keys(data).map(key => data[key]);
        this.noti = values[0].day_length;
        var day = new Date(this.date);
      day.setDate(day.getDate()+Number(values[0].day_length));
      this.viewDate=day.getFullYear()+"-"+this.month_of_the_year(day)+"-"+this.day_of_the_month(day);

      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbortionPage');
  }
  abortion(data: NgForm) {




    let alert19 = this.alertCtrl.create({
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
            console.log(data.value);
            this.api.addAbortion(this.user, data.value).subscribe(d => {
              if (d.status == 'OK') {
                var test1 = new Date();
              test1.setDate(test1.getDate() + Number(data.value.alert_sync));
                var setDate1 = test1.getFullYear() + "-" + this.month_of_the_year(test1) + "-" + this.day_of_the_month(test1);
                this.api.updateType('cattle', this.user, this.key, { status: 'โคแท้ง',process_date: setDate1 }).subscribe(d1 => {
                  if (d1.status == 'OK') {
                    var test = new Date();
                    test.setDate(test.getDate() + Number(data.value.alert_sync));
                    var setDate = test.getFullYear() + "-" + this.month_of_the_year(test) + "-" + this.day_of_the_month(test);
                    this.api.addNoti(this.user, setDate, { id_cattle: data.value.dam_id, type: 'เหนี่ยวนำการกลับสัด', date: setDate }).subscribe(d2 => {
                      if (d2.status == 'OK') {
                        this.api.addHistory(this.user,{dam_id:data.value.dam_id,date:data.value.date
                          ,type:'โคแท้ง'}).subscribe(d3=>{
                            if(d3.status=='OK'){
                              this.sucess();
                              this.navCtrl.pop();
                            }
                          })
                      }
                    });

                  }
                });
              }
            });
          }

        }
      ]
    });
    alert19.present();

  }
  sucess() {
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
  day_of_the_month(d) {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }
  month_of_the_year(d) {
    return ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
  }
  test(){
    console.log(this.date);
    var d = new Date(this.date);
    d.setDate(d.getDate()+Number(this.noti));
    this.viewDate = d.getFullYear() + "-" + this.month_of_the_year(d) + "-" + this.day_of_the_month(d);
  }

  updateList(a){
    console.log(a.target.value);
    this.noti = a.target.value;
    this.test();
  }
}

