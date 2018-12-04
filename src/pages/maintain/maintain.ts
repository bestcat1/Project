import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the MaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation
 */

@IonicPage()
@Component({
  selector: 'page-maintain',
  templateUrl: 'maintain.html',
})
export class MaintainPage {
  item:Observable<any[]>;
  name:any;
  name1:Observable<any[]>;
  potion;
  user:string;
  maintain:Array<any>;
  time;
  operator=[];
  date;
  id;
  program = [];
  data:any;
  cattle_key;
  AlertDate;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController
  ,public toastCtrl: ToastController,public viewCtrl:ViewController,
    private api:NodeapiProvider) {

    this.user=this.navParams.get('user');
    this.id=this.navParams.get('id');

    this.api.getNotiById(this.user,10).subscribe(data=>{
      var value = Object.keys(data).map(key=>data[key]);
      this.AlertDate = value[0];
    })

    this.api.getTypeByKey('cattle',this.user,this.id).subscribe(data=>{
        if(data!=null){
      console.log(data);
      this.cattle_key = Object.keys(data)[0];
      let values = Object.keys(data).map(key => data[key]);
      this.data = values[0].cattle_id;
        }
    });

    this.api.getFarm('program_maintain', this.user).subscribe(data => {
      if(data!=null){
      this.maintain = Object.keys(data).map(key => data[key]);
      }
    });

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintainPage');
  }
  mt(mtData : NgForm){
    console.log(this.cattle_key);
    if(mtData.value.type_of_maintain==""){
      const alert29 = this.alertCtrl.create({
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert29.present();
    }
    else{

    let alert30 = this.alertCtrl.create({
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
            this.api.addDataType('maintain', this.user, mtData.value).subscribe();
            this.api.updateType('cattle',this.user,this.cattle_key,{status:"บำรุงแล้ว"}).subscribe();
            var test = new Date(mtData.value.date);
            test.setDate(test.getDate() + Number(this.AlertDate.day_length));
            var setDate = test.getFullYear() + "-" + (test.getMonth() + 1) + "-" + test.getDate();
            this.api.addNoti(this.user,setDate,{id_cattle: mtData.value.dam_id, type: this.AlertDate.list, date: setDate }).subscribe()
            this.success();
            this.viewCtrl.dismiss();
          }

        }
      ]
    });
    alert30.present();
  }
  }

  success(){
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
  select(s){
    this.api.getDrugProMain(this.user,s).subscribe(data =>{
      if(data!=null){
        var values = Object.keys(data).map(key => data[key]);
        this.program = values;
      }
      else{
        this.program = [];
      }

    })
    // console.log(s);
    // this.program=this.db.list('/setting/farm/program_maintain/drug_pro_maintain/'+this.user,ref=>ref.orderByChild('pro_maintain').equalTo(s)).snapshotChanges().map(chang =>{
    //   return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    // });
  }
}
