import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the AddcattlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcattle',
  templateUrl: 'addcattle.html',
})

export class AddcattlePage {
test;
user:string;
corral:any;
strian:any;
color:any;
owner;
  currentDate:boolean;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,public alertCtrl: AlertController,public viewCtrl: ViewController,
    private api: NodeapiProvider) {
    var d=new Date();

    this.user=this.navParams.get('user');
    console.log(this.user);
    this.api.getUser(this.user).subscribe(data=>{
      var value = Object.keys(data).map(key => data[key]);
      this.owner = value[0].fname+' '+value[0].lname;
    });
    this.test=d.getFullYear()+"-"+month_of_the_year(d)+"-"+day_of_the_month(d);
    function day_of_the_month(d)
    {
      return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }
    function month_of_the_year(d)
    {
      return ((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1);
    }
    this.api.getCorral(this.user).subscribe(data=>{
      this.corral = Object.keys(data).map(key => data[key]);
    });

    this.api.getBreed(this.user).subscribe(data=>{
      this.strian = Object.keys(data).map(key => data[key]);
    });

    this.api.getColor(this.user).subscribe(data=>{
      this.color = Object.keys(data).map(key => data[key]);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcattlePage');
  }
  addc(data:NgForm){
    console.log(data.value);
    if(data.value.bweight==""||data.value.corralcattle==""||data.value.farmname==""||data.value.fid==""||data.value.id==""||data.value.massescattle==""||data.value.mid==""||data.value.ncattle==""||data.value.onyearweight==""||data.value.sexct==""||data.value.spcattle==""||data.value.spi==""||data.value.waenweight=="")
    {
      const alert4 = this.alertCtrl.create({
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert4.present();
    }
    else{
      const confirm1 = this.alertCtrl.create({
        title: 'บันทึกข้อมูล',
        message: 'ยืนยันการบันทึกข้อมูล',
        buttons: [
          {
            text: 'ยกเลิก',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'บันทึก',
            handler: () => {
              this.api.addCattle(this.user,data.value).subscribe();
               this.success();
               this.viewCtrl.dismiss();
            }
          }
        ]
      });
      confirm1.present();
    }

  }
  success(){
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
}
