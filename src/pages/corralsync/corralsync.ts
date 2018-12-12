import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the CorralsyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-corralsync',
  templateUrl: 'corralsync.html',
})
export class CorralsyncPage {
  selectedQuestions: string[] = [];
  dams = [];
  name:any;

  operator=[];
  time;
  date;
  corral;
  user;
  dam;
  count;
  pro;
  idcheck = [];
  syncs;
  checkpro=true;
  AlertDate;
  DetailPro;
  viewDate;
loader;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , public alertCtrl: AlertController
    , public viewCtrl: ViewController, public modalCtrl: ModalController,
    private api: NodeapiProvider,private loadingCtrl :LoadingController) {
    this.user = this.navParams.get('user');
    this.api.getProgramSync(this.user).subscribe(data=>{
      if(data!=null){
      this.syncs = Object.keys(data).map(key=>data[key]);
      }
    });

    this.api.getNotiById(this.user,11).subscribe(data=>{
      var value = Object.keys(data).map(key=>data[key]);
      this.AlertDate = value[0];
      var day = new Date(this.date);
      day.setDate(day.getDate()+Number(value[0].day_length));
      this.viewDate=day.getFullYear()+"-"+this.month_of_the_year(day)+"-"+this.day_of_the_month(day);
    })

    this.api.getCorral(this.user).subscribe(data=>{
      if(data!=null){
      this.corral = Object.keys(data).map(key=>data[key]);
      }
    })

    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.name = values[0].fname+' '+values[0].lname;
      this.operator.push({operator: values[0].fname+' '+values[0].lname});
      }
    })
    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        this.operator.push({operator: values[i].fname+' '+values[i].lname});
      }
    }
    })

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
    console.log('ionViewDidLoad CorralsyncPage');
  }
  corralsync(data: NgForm) {
    if (data.value.corralcattle == "" || data.value.program_sync == "" || this.idcheck.length == 0) {
      swal("ผิดพลาด!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }
    else {
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
              this.presentLoading();
              console.log(data.value);
              let j = 0;
              var dataSync=[];
              var key = [];
              var dataNoti=[];
                  for (j = 0; j < this.idcheck.length; j++) {
                      dataSync.push({ dam_id: this.idcheck[j].id, datepro: data.value.datepro, program_sync: data.value.program_sync, operator: data.value.operator, recoder:data.value.recoder });

                      key.push(this.idcheck[j].key);

                      var test = new Date(data.value.datepro);
                      test.setDate(test.getDate() + Number(this.AlertDate.day_length));
                      var setDate = test.getFullYear() + "-" + this.month_of_the_year(test)+"-"+this.day_of_the_month(test);
                      dataNoti.push({id_cattle: this.idcheck[j].id, type: this.AlertDate.list, date: setDate });
                      this.DetailPro.forEach(element => {
                        test = new Date(data.value.datepro);
                        test.setDate(test.getDate() + Number(element.day_length));
                        var setDate = test.getFullYear()+"-"+this.month_of_the_year(test)+"-"+this.day_of_the_month(test);
                        dataNoti.push({id_cattle: data.value.dam_id, type: element.drug_sync, date: setDate,time: element.time_length });
                      });
                  }
              this.api.addSyncCorral(this.user,dataSync).subscribe(d=>{
                if(d.status=='OK'){
                  this.api.updateCattleCorral(this.user,key,'เหนี่ยวนำแล้ว').subscribe(d2=>{
                    if(d2.status == 'OK'){
                      this.api.addNotiMultiple(this.user,dataNoti).subscribe(d3=>{
                        if(d3.status=='OK'){
                          this.success();
                          this.navCtrl.pop();
                          this.loader.dismiss();
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
  }


  selectcorral(n) {
    this.dams = [];
    console.log(n);
    this.api.getCattleByCorral(this.user, n).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=> data[key]);
      for(let i = 0; i < values.length; i++){
        if (values[i].sex == 'MISS'&&values[i].status=='บำรุงแล้ว') {
          this.dams.push({ id:values[i].cattle_id ,key:Object.keys(data)[i]});
        }
      }
    } else {
      this.dam = [];
    }

    })
    this.idcheck = [];
    this.selectedQuestions = [];
  }

  clickSelectBox(itemKey, k) {

    const foundAt = this.selectedQuestions.indexOf(itemKey);

    if (foundAt >= 0) {
      this.idcheck.splice(foundAt, 1);
      this.selectedQuestions.splice(foundAt, 1);

    } else {
      this.idcheck.push({ id: itemKey, key: k });
      this.selectedQuestions.push(itemKey);
    }
    console.log(this.idcheck);
  }
  promain(p){
    this.pro=p;
    this.checkpro=false;

    this.api.getDrugProgramSync(this.user,p).subscribe(data=>{
      console.log(data);
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.DetailPro = value;
      this.checkpro=false;
    }
    })
  }

  verifypro(){
    const modal = this.modalCtrl.create("VerifyProSyncPage",{user:this.user,program:this.pro,detail:this.DetailPro});
    modal.present();
  }
  success() {
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
  day_of_the_month(d)
  {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }
 month_of_the_year(d)
  {
    return ((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1);
  }
  test(){
    var day = new Date(this.date);
    day.setDate(day.getDate()+Number(this.AlertDate.day_length));
    this.viewDate=day.getFullYear()+"-"+this.month_of_the_year(day)+"-"+this.day_of_the_month(day);
 }
 presentLoading() {
  this.loader = this.loadingCtrl.create({
    content: "กรุณารอสักครู่...",
  });
  this.loader.present();
}
}
