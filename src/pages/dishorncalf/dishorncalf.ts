import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the DishorncalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishorncalf',
  templateUrl: 'dishorncalf.html',
})
export class DishorncalfPage {
  user:string;
  date
  bid;
  dam_id=[];
  operator=[];
name;
key;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl:AlertController,public viewCtrl:ViewController,private api: NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.bid=this.navParams.get('id');

this.api.getUser(this.user).subscribe(data=>{
  var values = Object.keys(data).map(key=>data[key]);
  this.name = values[0].fname + ' ' + values[0].lname;
  this.operator.push(values[0].fname + ' ' + values[0].lname);
})

this.api.getPersonnel(this.user).subscribe(data=>{
  var values = Object.keys(data).map(key=>data[key]);
  values.forEach(snap=>{
    this.operator.push(snap.fname + ' ' + snap.lname);
  })

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
    console.log('ionViewDidLoad DishorncalfPage');
  }
  dishornc(data: NgForm){
    if(data.value.bid==""||data.value.howu=="")
    {
      const alert24 = this.alertCtrl.create({
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert24.present();
    }
    else
    {
      let alert25 = this.alertCtrl.create({
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
              this.api.addDishorn(this.user,data.value);
              this.api.editCalf(this.user,this.key,{horndetering:true});
              this.success();
              this.viewCtrl.dismiss();
            }

          }
        ]
      });
      alert25.present();
    }
    console.log(data.value);

  }
  success(){
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
}
