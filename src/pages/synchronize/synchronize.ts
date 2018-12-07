import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public alertCtrl:AlertController
  ,public viewCtrl:ViewController,public modalCtrl: ModalController,private api: NodeapiProvider) {
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
    console.log('ionViewDidLoad SynchronizePage');
  }
sync(data: NgForm){
  if(data.value.program_sync=="")
  {
    const alert43 = this.alertCtrl.create({
      subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      buttons: ['ตกลง']
    });
    alert43.present();
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
            this.api.addDataType('synchronize', this.user, data.value).subscribe(d=>{
              if(d.status=='OK'){
                console.log(d);


                var test = new Date(data.value.datepro);
                test.setDate(test.getDate() + Number(this.AlertDate.day_length));
                var setDate = test.getFullYear() + "-" + (test.getMonth() + 1) + "-" + test.getDate();
                this.api.addNoti(this.user,setDate,{id_cattle: data.value.dam_id, type: this.AlertDate.list, date: setDate }).subscribe(d2=>{
                  if(d2.status=='OK'){
                    console.log(d2);
                    this.api.updateType('cattle',this.user,this.key,{status:"เหนี่ยวนำแล้ว"}).subscribe(d1=>{
                      console.log(d1);
                      if(d1.status=='OK'){

                        this.success();
                        this.viewCtrl.dismiss();
                      }
                    });

                  }
                })
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
  }

  verifypro(){
    const modal = this.modalCtrl.create("VerifyProSyncPage",{user:this.user,program:this.pro});
    modal.present();
  }

  success(){
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }

}
