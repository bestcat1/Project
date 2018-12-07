import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingprogrammaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingprogrammaintain',
  templateUrl: 'settingprogrammaintain.html',
})
export class SettingprogrammaintainPage {
  user;
  item$
  pro_maintain:String;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl :ViewController,private api:NodeapiProvider,
    ) {
    this.user=this.navParams.get('user');

  }

  ionViewWillEnter(){
    this.pro_maintain='';
    this.api.getFarm('program_maintain',this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.item$ = values;
      for(let i=0;i<values.length;i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingprogrammaintainPage');
  }
  addpro(data:NgForm){
    if(data.value.pro_maintain!=''){
    this.api.addProgram_maintain(this.user,data.value).subscribe(d=>{
      if(d.status=='OK'){
        this.pro_maintain='';
        this.ionViewWillEnter();
      }
    });

    }
    else {
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
    }

  }
  removepro(k){
    this.api.removeProgram_maintain(this.user,k).subscribe(d=>{
      if(d.status=='OK'){
        this.ionViewWillEnter();
      }
    });

  }
  setpromaintain(p){
    console.log(p);
    this.navCtrl.push("SettingdetailprogreammaintainPage",{user:this.user,program:p})
  }
}
