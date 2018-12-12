import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingdetailprogreammaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingdetailprogreammaintain',
  templateUrl: 'settingdetailprogreammaintain.html',
})
export class SettingdetailprogreammaintainPage {
data_drug;
user;
program;
drug_maintain;
volumn;
day_length;
  constructor(public navCtrl: NavController, public navParams: NavParams,

  private api: NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.program=this.navParams.get('program');
    console.log(this.user, this.program);

    }
    ionViewWillEnter(){
      this.drug_maintain='';
      this.volumn='';
      this.day_length='';
      this.api.getDetailMaintainByType(this.user,this.program).subscribe(data=>{
        if(data!=null){
        var values = Object.keys(data).map(key=> data[key]);
        this.data_drug = values;
        for(let i=0;i<values.length;i++){
          this.data_drug[i].key = Object.keys(data)[i];
        }
      }else{
        this.data_drug = [];
      }
      })
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdetailprogreammaintainPage');
  }
  addpromain(data:NgForm){
    console.log(data.value);
    if(data.value.drug_maintain!=''&&data.value.volumn!=''&&data.value.day_length!=''){
      console.log(data.value);
      var c=0;
      for(let i=0;i<this.data_drug.length;i++){
        if(this.data_drug[i].drug_maintain == data.value.drug_maintain){
          c=c;
        }else{
          c++;
        }
      }
      if(c==this.data_drug.length){
        this.api.addDetailMaintain(this.user,data.value).subscribe(d=>{
          console.log(d);
          if(d.status=='OK'){
            this.drug_maintain='';
            this.volumn='';
            this.day_length='';
            this.ionViewWillEnter();
          }
        });
      } else {
        swal("ขออภัย!", "มีการใช้ชื่อยาบำรุงนี้อยู่แล้ว", "warning");
      }


    }else{
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");

      // let alert = this.alertCtrl.create({
      //   title: 'ขออภัย!',
      //   subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      //   buttons: ['ตกลง']
      // });
      // alert.present();
    }

  }
  detail(d){
    this.navCtrl.push("ShowdetailprogrammaintainPage", {detail:d,user:this.user});
  }
  delete(k){
    this.api.removeDetailMaintain(this.user,k).subscribe(d=>{
      if(d.status=='OK'){
          this.ionViewWillEnter();
      }
    });

  }
}
