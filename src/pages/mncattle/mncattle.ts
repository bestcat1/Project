import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database';
// import { DatePicker } from '@ionic-native/date-picker';

import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the MncattlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mncattle',
  templateUrl: 'mncattle.html',
})

export class MncattlePage {
  user:string;
  date;
mncattle;
test;
checkcorral:any;
strian:any;
color:any;
owner;
currentDate:boolean;
corral:any;
public damList:Array<any>;
  public loadedDamList:Array<any>;

item$ : Observable<any[]>;
corrals;
  item:AngularFireList<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController
  ,private api: NodeapiProvider,public viewCtrl: ViewController ) {
    this.user=this.navParams.get('user');
    this.checkcorral=this.navParams.get('corral');
    this.mncattle = this.navParams.get('type');
  }

  ionViewWillEnter(){
    this.addCattle();
    this.editpage();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MncattlePage');
  }


//-------------------------Edit page-------------------------------
  editpage(){
    this.user=this.navParams.get('user');
    this.api.getCorral(this.user).subscribe(data=>{
      if(data!=null){
      this.corrals = Object.keys(data).map(key => data[key]);
      }
    })
    if(this.checkcorral=='ทั้งหมด'){
      this.api.getAllCattle(this.user).subscribe(data=>{
        if(data!=null){
      var dam = Object.keys(data).map(key => data[key]);
      this.damList = dam;
      this.loadedDamList = dam;
    }
      });
    }
    else{
    this.api.getCattleByCorral(this.user, this.checkcorral).subscribe(data=>{
      if(data!=null){
        var dam = Object.keys(data).map(key => data[key]);
      this.damList = dam;
      this.loadedDamList = dam;
      }

    });
    }
  }
  showdetail(n){
    console.log(n);
    this.navCtrl.push("EditdetailcattlePage",{user:this.user,id:n});
  }
  initializeItems(): void {
    this.damList = this.loadedDamList;
  }
  getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;

  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.damList = this.damList.filter((v) => {
    if(v.id && q) {
      if (v.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.damList.length);

}

selectcorral(n){
  if(n=='ทั้งหมด'){
    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
        var dam = Object.keys(data).map(key => data[key]);
    this.damList = dam;
    this.loadedDamList = dam;
      }

    })
  }
  else{
  this.api.getCattleByCorral(this.user, n).subscribe(data=>{
    if(data!=null){
       var dam = Object.keys(data).map(key => data[key]);
    this.damList = dam;
    this.loadedDamList = dam;
    }

  });
  }
}

//-------------------------------add page------------------

addCattle(){
  var d=new Date();

  this.user=this.navParams.get('user');
  console.log(this.user);
  this.api.getUser(this.user).subscribe(data=>{
    if(data!=null){
      var value = Object.keys(data).map(key => data[key]);
    this.owner = value[0].fname+' '+value[0].lname;
    }

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
    if(data!=null){
      this.corral = Object.keys(data).map(key => data[key]);
    }
  });

  this.api.getBreed(this.user).subscribe(data=>{
    if(data!=null){
      this.strian = Object.keys(data).map(key => data[key]);
    }
  });

  this.api.getColor(this.user).subscribe(data=>{
    if(data!=null){
      this.color = Object.keys(data).map(key => data[key]);
    }
  });

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
