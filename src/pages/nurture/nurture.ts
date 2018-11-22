import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the NurturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nurture',
  templateUrl: 'nurture.html',
})
export class NurturePage {
  user:string;
  date;
  use_drug=[];
  time;
  name;

  operator=[];
  item:Observable<any[]>;
  noti_treatment:Observable<any[]>;
  noti=[];
  id;
  drugs;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public alertCtrl:AlertController,public viewCtrl:ViewController,private api: NodeapiProvider) {

    this.id=this.navParams.get('id');
    this.user=this.navParams.get('user');
      console.log(this.id,this.user);

    this.api.getDrug(this.user).subscribe(data=>{
      if(data!=null){
      this.drugs = Object.keys(data).map(key=>data[key]);
      }
    })
    var d = new Date();
    this.time=d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit',hour12:false});

    this.date=d.getFullYear()+"-"+month_of_the_year(d)+"-"+day_of_the_month(d);
    function day_of_the_month(d)
    {
      return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }
    function month_of_the_year(d)
    {
      return ((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1);
    }
    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.name = values[0].fname + ' ' + values[0].lname;
      this.operator.push(values[0].fname + ' ' + values[0].lname);
      }
    })

    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
    for(let i = 0; i < values.length;i++){
      this.operator.push(values[i].fname + ' ' + values[i].lname);
    }
  }
    });

    this.api.getNotiById(this.user,8).subscribe(data=>{
      var values = Object.keys(data).map(key=>data[key]);
      this.noti.push(values[0].day_length);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NurturePage');
  }
  nt(data:NgForm){
    console.log(data.value);
    if(data.value.noti_treatment==""||data.value.sickness==""||data.value.type_of_treatment==""){
      const alert32 = this.alertCtrl.create({
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert32.present();
    }
    else{
      let alert33 = this.alertCtrl.create({
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
              for(let i=0;i<this.use_drug.length;i++){
                console.log(this.use_drug[i]);
                this.api.addTreatmentDrug(this.user,this.id,{drug_name:this.use_drug[i]}).subscribe();
              }

              this.api.addTreatment(this.user,data.value).subscribe();
              this.success();
              this.viewCtrl.dismiss();
            }

          }
        ]
      });
      alert33.present();
    }

  }
  success(){
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
  adddrug(d){
    this.use_drug=[];
    for(let i =0;i<d.length;i++){
      this.use_drug.push(d[i]);
    }
  }
}
