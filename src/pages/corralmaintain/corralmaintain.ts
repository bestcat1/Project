import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the CorralmaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-corralmaintain',
  templateUrl: 'corralmaintain.html',
})
export class CorralmaintainPage {
  selectedQuestions: string[] = [];
  dams = [];
  name;
  time;
  date;
  corral;
  user;
  dam;
  count;
  idcheck = [];
  maintain;
  operator=[];
  program;
  AlertDate;
  constructor(public navCtrl: NavController, public navParams: NavParams
   , public alertCtrl: AlertController, public viewCtrl: ViewController,
    private api: NodeapiProvider) {
    this.user = this.navParams.get('user');
    this.api.getFarm('program_maintain', this.user).subscribe(data => {
      if(data!=null){
      this.maintain = Object.keys(data).map(key => data[key]);
      console.log(this.maintain);
      }
    });

    this.api.getNotiById(this.user,10).subscribe(data=>{
      var value = Object.keys(data).map(key=>data[key]);
      this.AlertDate = value[0];
    })

    this.api.getCorral(this.user).subscribe(data=>{
      if(data!=null){
      this.corral = Object.keys(data).map(key=> data[key]);
      }
    })

    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      console.log(values);
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

    var d = new Date();
    this.time = d.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false });


    this.date = d.getFullYear() + "-" + month_of_the_year(d) + "-" + day_of_the_month(d);
    function day_of_the_month(d) {
      return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }
    function month_of_the_year(d) {
      return ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorralmaintainPage');
  }
  corralmt(data: NgForm) {
    if (data.value.corralcattle == "" || data.value.maintain == "") {
      const alert15 = this.alertCtrl.create({
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert15.present();
    }
    else {
      let alert16 = this.alertCtrl.create({
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

              let j = 0;
              var detail=[];
              var key = [];
              var dataNoti=[];
              for (j = 0; j < this.idcheck.length; j++) {
                 detail.push({ dam_id: this.idcheck[j].cattle_id, date: data.value.date, time: data.value.time, type_of_maintain: data.value.type_of_maintain,operator:data.value.operator,recoder: data.value.recoder });

                //this.api.addDataType('maintain', this.user, detail).subscribe();
                key.push(this.idcheck[j].key);
                // this.api.updateType('cattle',this.user,this.idcheck[j].key,{status:"บำรุงแล้ว"}).subscribe();
                var test = new Date(data.value.date);
                test.setDate(test.getDate() + Number(this.AlertDate.day_length));
                var setDate = test.getFullYear() + "-" + (test.getMonth() + 1) + "-" + test.getDate();

                dataNoti.push({id_cattle: this.idcheck[j].cattle_id, type: this.AlertDate.list, date: setDate });
                // this.api.addNoti(this.user,setDate,{id_cattle: this.idcheck[j].cattle_id.value.dam_id, type: this.AlertDate.list, date: setDate }).subscribe()
              }
              this.api.addMaintainCorral(this.user,detail).subscribe();
              this.api.updateCattleCorral(this.user,key,"บำรุงแล้ว").subscribe();
              this.api.addNotiMultiple(this.user,dataNoti).subscribe();
              this.success();
              this.viewCtrl.dismiss();
            }

          }
        ]
      });
      alert16.present();


    }
  }


  selectcorral(n) {
    this.dams = [];
    console.log(n);
    this.api.getCattleByCorral(this.user, n).subscribe(data=>{
      if(data!=null){
        var values = Object.keys(data).map(key => data[key]);
        for(let i =0; i<values.length; i++){
          if (values[i].sex == 'MISS' && (values[i].status == ''|| values[i].status == 'คลอดแล้ว'|| values[i].status=='โคแท้ง')) {
                  this.dams.push({ cattle_id: values[i].cattle_id, key: Object.keys(data)[i]});
                  console.log(values[i]);
            }
        }
      }
      else{
        this.dams = [];
      }
    })
    this.idcheck = [];
    this.selectedQuestions = [];
  }

  clickSelectBox(itemKey, k) {
    const foundAt = this.selectedQuestions.indexOf(itemKey);
    console.log(foundAt);
    if (foundAt >= 0) {
      this.idcheck.splice(foundAt, 1);
      this.selectedQuestions.splice(foundAt, 1);

    } else {
      this.idcheck.push({ cattle_id: itemKey, key: k });
      this.selectedQuestions.push(itemKey);
    }
    console.log(this.idcheck);
  }
  success() {
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
  select(s) {
    this.api.getDrugProMain(this.user,s).subscribe(data =>{
      if(data!=null){
        var values = Object.keys(data).map(key => data[key]);
        this.program = values;
      }
      else{
        this.program = [];
      }
    });
  }
}
