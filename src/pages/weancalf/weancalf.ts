import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the WeancalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weancalf',
  templateUrl: 'weancalf.html',
})
export class WeancalfPage {
  user:string;
  date;
  name;
  key;
  operator=[];
  bid;
  dam_id=[];
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public alertCtrl:AlertController,public viewCtrl:ViewController,private api: NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.bid=this.navParams.get('id');

    this.api.getUser(this.user).subscribe(data=>{
      var values = Object.keys(data).map(key=>data[key]);
      this.name = values[0].fname+' '+values[0].lname;
      this.operator.push(values[0].fname+' '+values[0].lname);
    })
    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        if(snap.privilege != 'ยังไม่ได้อนุมัติ'){
     this.operator.push(snap.fname+' '+snap.lname);
          }

      })
    }
    })

    this.api.getCalfById(this.user,this.bid).subscribe(data=>{
      var values = Object.keys(data).map(key=>data[key]);
      this.key = Object.keys(data)[0];
      values.forEach(snap=>{
        this.dam_id.push(snap.dam_id);
      })
    })

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeancalfPage');
  }
  weanc(data:NgForm){
    if(data.value.bid==""||data.value.weanweight=="")
    {
      swal("ผิดพลาด!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }
    else{
      let alert47 = this.alertCtrl.create({
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
              this.api.addWean(this.user,data.value).subscribe(d=>{
                if(d.status=='OK'){
                this.api.editCalf(this.user,this.key,{wean:true}).subscribe(d1=>{
                  if(d1.status=='OK'){
                    this.success();
                    this.navCtrl.pop();
                  }
                });
              }
              });


            }

          }
        ]
      });
      alert47.present();
    }
    console.log(data.value);

  }

  success(){
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
}
