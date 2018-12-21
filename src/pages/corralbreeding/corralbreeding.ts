import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the CorralbreedingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-corralbreeding',
  templateUrl: 'corralbreeding.html',
})
export class CorralbreedingPage {
  selectedQuestions:string[] = [];
  idcheck=[];
dams=[];
dam;
count_breeding
  date;time;
  bmark:boolean=true;
  EPmark:boolean=true;
  user:string;
  operator=[];
not_oestrus;
noti_pregnant;
  name;
  sire_id=[];;
  corral;
  viewDate;
  loader;
  checkType = 0;
  check_sire_id = '';
  semen = '';
  viewDateSyc;
  constructor(public navCtrl: NavController, public navParams: NavParams
   ,public alertCtrl:AlertController,public viewCtrl:ViewController
    ,private api:NodeapiProvider,private loadingCtrl : LoadingController) {
    let d=new Date();
    this.user=this.navParams.get('user');
    this.time=d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit',hour12:false});
    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      value.forEach(snap=>{
        if(snap.sex == 'BULL'){
          this.sire_id.push(snap);
        }
      });
console.log(this.sire_id);
    }
    });
    this.api.getCorral(this.user).subscribe(data=>{
      if(data!=null){
      this.corral = Object.keys(data).map(key=>data[key]);
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
    })

    this.api.getNotiById(this.user,1).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.noti_pregnant = value[0].day_length;
      var day = new Date(this.date);
      day.setDate(day.getDate()+Number(value[0].day_length));
      this.viewDate=day.getFullYear()+"-"+this.month_of_the_year(day)+"-"+this.day_of_the_month(day);
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
    console.log('ionViewDidLoad CorralbreedingPage');
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
  corralbreed(data:NgForm)
  {
    console.log(data.value);
  if(data.value.corralcattle=="" || this.idcheck.length == 0 || (data.value.sire_id=="" &&data.value.semen ==""))
  {
    swal("ผิดพลาด!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
  }
  else{
    let alert13 = this.alertCtrl.create({
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
            let j=0;
            var dataBreed = [];
            var key = [];
            var dataNoti = [];
            var keyAndNumber =[]
            var history=[];
            for(j=0;j<this.idcheck.length;j++){
              if(this.checkType == 0){
              dataBreed.push({dam_id:this.idcheck[j].id,date_breeding:data.value.date_breeding,time_breeding:data.value.time_breeding,noti_oestrus:data.value.noti_oestrus,recoder:data.value.recoder,operator:data.value.operator,noti_pregnant:data.value.noti_pregnant,sire_id:data.value.sire_id,note:data.value.note,number_of_breeding:Number(this.idcheck[j].number_of_breeding)+1});
              } else {
                dataBreed.push({dam_id:this.idcheck[j].id,date_breeding:data.value.date_breeding,time_breeding:data.value.time_breeding,noti_oestrus:data.value.noti_oestrus,recoder:data.value.recoder,operator:data.value.operator,noti_pregnant:data.value.noti_pregnant,semen:data.value.semen,note:data.value.note,number_of_breeding:Number(this.idcheck[j].number_of_breeding)+1});

              }
              key.push(this.idcheck[j].key);
            keyAndNumber.push({key:this.idcheck[j].key,number:Number(this.idcheck[j].number_of_breeding)+1});
            var test = new Date(data.value.date_breeding);
            test.setDate(test.getDate() + Number(data.value.noti_pregnant));
            var setDate = test.getFullYear() + "-" + this.month_of_the_year(test)+"-"+this.day_of_the_month(test);
            dataNoti.push({id_cattle: this.idcheck[j].id, type: 'ตรวจท้อง', date: setDate });
            history.push({dam_id:this.idcheck[j].id,date:data.value.date_breeding,type:'ผสมพันธุ์'});
          }
            this.api.addBreedCorral(this.user,dataBreed).subscribe(d=>{
              if(d.status=='OK'){
                this.api.updateCattleCorral(this.user,key,'ผสมพันธุ์แล้ว').subscribe(d1=>{
                  if(d1.status=='OK'){
                    this.api.updateNumberOfBreeding(this.user,keyAndNumber).subscribe(d2=>{
                      if(d2.status == 'OK'){
                        this.api.addNotiMultiple(this.user,dataNoti).subscribe(d3=>{
                          if(d3.status == 'OK'){
                            this.api.addMultiHistory(this.user,history).subscribe(d4=>{
                              if(d4.status=='OK'){
                                this.success();
                                this.navCtrl.pop();
                                this.loader.dismiss();
                              }
                            })
                          }
                        });
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
    alert13.present();
  }



  }


  selectcorral(n){
    this.dams=[];

    this.api.getCattleByCorral(this.user,n).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      for(let i=0;i<value.length;i++){
        if(value[i].sex=='MISS'&& (value[i].status == 'เหนี่ยวนำแล้ว' || value[i].status == 'บำรุงแล้ว')){
         this.dams.push({id:value[i].cattle_id,key:Object.keys(data)[i],number_of_breeding:value[i].number_of_breeding});
        }
      }
    }
    })
   console.log(this.dams);
    this.idcheck=[];
    this.selectedQuestions=[];
  }

  clickSelectBox(itemKey,k,b){

     const foundAt = this.selectedQuestions.indexOf(itemKey);

     if (foundAt >= 0) {
        this.idcheck.splice(foundAt,1);
        this.selectedQuestions.splice(foundAt, 1);

     } else {
      this.idcheck.push({id:itemKey,key:k,number_of_breeding:b});
        this.selectedQuestions.push(itemKey);
    }
    console.log(this.idcheck);
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
updateList(a){
  console.log(a.target.value);
  this.noti_pregnant = a.target.value;
  this.test();
}
updateList1(b){
  this.not_oestrus = b.target.value;
  this.test();
}
}
