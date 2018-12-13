import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SynchronizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-synchronize',
  templateUrl: 'synchronize.html',
})
export class SynchronizePage {
date;
dp;pro;
user:string;
name:any;
operator=[];
id;
syncs;
cattle_id;
checkpro=true;
key;
AlertDate;
DetailPro:any;
viewDate;
loader;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public alertCtrl:AlertController
  ,public viewCtrl:ViewController,public modalCtrl: ModalController,private api: NodeapiProvider,
  private loadingCtrl: LoadingController) {
    var d=new Date();
    this.id=this.navParams.get('id');
    this.user=this.navParams.get('user');
   this.api.getProgramSync(this.user).subscribe(data=>{
     if(data!=null){
     this.syncs = Object.keys(data).map(key=>data[key]);
     }
   })
   this.api.getNotiById(this.user,11).subscribe(data=>{
    var value = Object.keys(data).map(key=>data[key]);
    this.AlertDate = value[0];
    var day = new Date(this.date);
    day.setDate(day.getDate()+Number(value[0].day_length));
    this.viewDate=day.getFullYear()+"-"+this.month_of_the_year(day)+"-"+this.day_of_the_month(day);
  })

    this.api.getTypeByKey('cattle',this.user,this.id).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.cattle_id = values[0].cattle_id;
      this.key = Object.keys(data)[0];
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
        if(values[i].privilege != 'ยังไม่ได้อนุมัติ'){
          this.operator.push({operator: values[i].fname+' '+values[i].lname});
          }
      }
    }
    })

    this.date=d.getFullYear()+"-"+month_of_the_year(d)+"-"+day_of_the_month(d);
    function day_of_the_month(d)
    {
      return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }
    function month_of_the_year(d)
    {
      return ((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynchronizePage');
  }
sync(data: NgForm){
  if(data.value.program_sync=="")
  {
    swal("ผิดพลาด!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
  }
  else{
    let alert44 = this.alertCtrl.create({
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
            this.api.addDataType('synchronize', this.user, data.value).subscribe(d=>{
              if(d.status=='OK'){
                var datanoti = [];
                var test = new Date(data.value.datepro);
                test.setDate(test.getDate() + Number(this.AlertDate.day_length));
                var setDate = test.getFullYear()+"-"+this.month_of_the_year(test)+"-"+this.day_of_the_month(test);
                datanoti.push({id_cattle: data.value.dam_id, type: this.AlertDate.list, date: setDate });
                this.DetailPro.forEach(element => {
                  test = new Date(data.value.datepro);
                  test.setDate(test.getDate() + Number(element.day_length));
                  var setDate = test.getFullYear()+"-"+this.month_of_the_year(test)+"-"+this.day_of_the_month(test);
                  datanoti.push({id_cattle: data.value.dam_id, type: element.drug_sync, date: setDate,time: element.time_length });
                });
                this.api.addNotiMultiple(this.user,datanoti).subscribe(d0=>{
                  if(d0.status == 'OK'){
                    this.api.updateType('cattle',this.user,this.key,{status:"เหนี่ยวนำแล้ว"}).subscribe(d1=>{
                      if(d1.status=='OK'){
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
    alert44.present();
  }


}
markdp(mp){
  if(mp==true){
    this.dp=false;
  }
  else{
    this.dp=true;
  }
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

  success(){
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
