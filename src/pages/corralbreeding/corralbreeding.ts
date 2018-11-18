import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams
   ,public alertCtrl:AlertController,public viewCtrl:ViewController
    ,private api:NodeapiProvider) {
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
      }
    })

    this.api.getNotiById(this.user,1).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.noti_pregnant = value[0].day_length;
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
  if(data.value.corralcattle==""||data.value.sire_id=="")
  {
    const alert12 = this.alertCtrl.create({
      subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      buttons: ['ตกลง']
    });
    alert12.present();
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
            let j=0;
            for(j=0;j<this.idcheck.length;j++){
              this.api.addBreed(this.user,{dam_id:this.idcheck[j].id,date_breeding:data.value.date_breeding,time_breeding:data.value.time_breeding,noti_oestrus:data.value.noti_oestrus,recoder:data.value.recoder,operator:data.value.operator,noti_pregnant:data.value.noti_pregnant,sire_id:data.value.sire_id,note:data.value.note,number_of_breeding:Number(this.idcheck[j].number_of_breeding)+1}).subscribe();

            this.api.updateType('cattle',this.user,this.idcheck[j].key,{status:'ผสมพันธุ์แล้ว',number_of_breeding:Number(this.idcheck[j].number_of_breeding)+1}).subscribe();

          }


            this.success();
            this.viewCtrl.dismiss();
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
}
