import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the BreedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-breed',
  templateUrl: 'breed.html',
})
export class BreedPage {
date;time;
bmark:boolean=true;
EPmark:boolean=true;
user:string;
name;
number_of_breeding;
cattle_id;
key;
id;
sire_id=[];
operator=[];
not_oestrus;
noti_pregnant;
viewDate;
loader;
checkType=0;
semen='';
check_sire_id='';
viewDateSyc;

  constructor(public ptf:Platform,public navCtrl: NavController
    , public navParams: NavParams,public alertCtrl:AlertController
    ,private api : NodeapiProvider,
    private loadingCtrl : LoadingController) {

    let d=new Date();
    this.time=d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit',hour12:false});
    this.id=this.navParams.get('id');
    this.user=this.navParams.get('user');

    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      value.forEach(snap=>{
        if(snap.sex == 'BULL'){
          this.sire_id.push(snap);
          console.log(this.sire_id);
        }
      });
    }
    });

    this.api.getTypeByKey('cattle',this.user,this.id).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.cattle_id = values[0].cattle_id;
      this.key = Object.keys(data)[0];
      this.number_of_breeding = values[0].number_of_breeding;
      }
    })

    this.api.getNotiById(this.user,0).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.not_oestrus = value[0].day_length;
      var day = new Date(this.date);
      day.setDate(day.getDate()+Number(value[0].day_length));
      this.viewDateSyc =day.getFullYear()+"-"+this.month_of_the_year(day)+"-"+this.day_of_the_month(day)
      }
    });


    this.api.getNotiById(this.user,1).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.noti_pregnant = value[0].day_length;
      var day = new Date(this.date);
      day.setDate(day.getDate()+Number(value[0].day_length));
      this.viewDate=day.getFullYear()+"-"+this.month_of_the_year(day)+"-"+this.day_of_the_month(day);
      }
    });

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
    console.log('ionViewDidLoad BreedPage');
  }
  markb(a){
    console.log(a);
    if(a==true){
      this.bmark=false;
    }
    else{
      this.bmark=true;
    }
  }
  markep(b){
    if(b==true){
      this.EPmark=false;
    }
    else{
      this.EPmark=true;
    }
  }
  breed(data:NgForm){
    console.log(data.value);
    if(data.value.sire_id=="" && data.value.semen == "")
    {
      swal("ผิดพลาด!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }
    else{
      let alert10 = this.alertCtrl.create({
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
              var saveData
              if(this.checkType == 0) {
              saveData={dam_id:data.value.id,date_breeding:data.value.date_breeding,noti_oestrus:data.value.not_oestrus,note:data.value.note,noti_pregnant:data.value.noti_pregnant,number_of_breeding:Number(data.value.number_of_breeding)+1,sire_id:data.value.sire_id,time_breeding:data.value.time_breeding,recoder:data.value.recoder,operator:data.value.operator};
              } else {
               saveData={dam_id:data.value.id,date_breeding:data.value.date_breeding,noti_oestrus:data.value.not_oestrus,note:data.value.note,noti_pregnant:data.value.noti_pregnant,number_of_breeding:Number(data.value.number_of_breeding)+1,time_breeding:data.value.time_breeding,recoder:data.value.recoder,operator:data.value.operator,semen:data.value.semen};
              }
              this.api.addBreed(this.user,saveData).subscribe(d=>{
                if(d.status == 'OK'){
                      var test = new Date(data.value.date_breeding);
                      test.setDate(test.getDate() + Number(data.value.noti_pregnant));
                      var setDate = test.getFullYear() + "-" + this.month_of_the_year(test)+"-"+this.day_of_the_month(test);
                      this.api.addNoti(this.user,setDate,{id_cattle: data.value.id, type: 'ตรวจท้อง', date: setDate }).subscribe(d2=>{
                        if(d2.status == 'OK'){
                          this.api.updateType('cattle',this.user,this.key,{status:'ผสมพันธุ์แล้ว',number_of_breeding:(Number(data.value.number_of_breeding)+1),process_date:this.viewDate}).subscribe(d1=>{
                            console.log(d1);
                            if(d1.status=='OK'){
                              this.api.addHistory(this.user,{dam_id:data.value.id,date:data.value.date_breeding
                                ,type:'ผสมพันธุ์'}).subscribe(d3=>{
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
              });



            }

          }
        ]
      });
      alert10.present();
    }
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
    day.setDate(day.getDate()+Number(this.noti_pregnant));
    this.viewDate=day.getFullYear()+"-"+this.month_of_the_year(day)+"-"+this.day_of_the_month(day);
    console.log(this.viewDate);

    var day2 = new Date(this.date);
    day2.setDate(day2.getDate()+Number(this.not_oestrus));
    this.viewDateSyc=day2.getFullYear()+"-"+this.month_of_the_year(day2)+"-"+this.day_of_the_month(day2);
 }
 presentLoading() {
  this.loader = this.loadingCtrl.create({
    content: "กรุณารอสักครู่...",
  });
  this.loader.present();
}
updateList(a){
  console.log(a.target.value);
  this.noti_pregnant = a.target.value;
  this.test();
}
updateList1(b){
  console.log(b.target.value);
  this.not_oestrus = b.target.value;
  this.test();
}

selectType(){
  let alert = this.alertCtrl.create();
  alert.setTitle('ตัวเลือกการผสมพันธุ์');

  if(this.checkType == 0){


    alert.addInput({
    type: 'radio',
    label: 'พ่อพันธุ์',
    value: '0',
    checked: true
  });
  alert.addInput({
    type: 'radio',
    label: 'น้ำเชื้อ',
    value: '1',
  });
  } else {

    alert.addInput({
      type: 'radio',
      label: 'พ่อพันธุ์',
      value: '0',
    });
    alert.addInput({
      type: 'radio',
      label: 'น้ำเชื้อ',
      value: '1',
      checked: true
    });
  }
  alert.addButton('ยกเลิก');
  alert.addButton({
    text: 'ยืนยัน',
    handler: data => {
      this.semen='';
      this.check_sire_id='';
      this.checkType = data;
    }
  });
  alert.present();
}
}
