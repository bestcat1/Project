import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingdrugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingdrug',
  templateUrl: 'settingdrug.html',
})
export class SettingdrugPage {
user;
drugs
drug_name;
common_drug;
dosage;
mfd='';
exp='';
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.drug_name='';
    this.common_drug='';
    this.dosage='';
  }
  ionViewWillEnter(){
this.api.getDrug(this.user).subscribe(data=>{
  if(data!=null){
  var values = Object.keys(data).map(key=>data[key]);
  this.drugs = values;
  for(let i=0;i<values.length;i++){
    this.drugs[i].key = Object.keys(data)[i];
  }
}
else{
  this.drugs = [];
}
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdrugPage');
  }
  adddrug(data:NgForm){
    console.log(data.value);
    if(data.value.drug_name!=''&&data.value.common_drug!=''&&data.value.dosage!=''&&data.value.exp_date!=''&&data.value.mfd_date!=''){
     var c = 0;
      for(let i=0;i<this.drugs.length;i++){
        if(this.drugs[i].drug_name == data.value.drug_name){
          c=c;
        }
        else {
          c++;
        }
      }
      if(c==this.drugs.length){
      this.api.addDrug(this.user,data.value).subscribe(d=>{
        if(d.status == 'OK'){
          this.drug_name='';
          this.common_drug='';
          this.dosage='';
          this.ionViewWillEnter();
        }
      });
    } else {
      swal("ขออภัย!", "มีการใช้ชื่อยานี้อยู่แล้ว", "warning");
    }
    } else {
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
    }



  }
  delete(k){
    this.api.removeDrug(this.user,k).subscribe(d=>{
      if(d.status=='OK'){
        this.ionViewWillEnter();
      }
    });

  }
  test(){
    if(this.exp == ''||this.mfd == ''){
      this.exp = this.exp;
    }
    else {
      var date1 = new Date(this.mfd);
      var date2 = new Date(this.exp);
      var timeDiff = (date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      alert(diffDays);
      if(diffDays<0){
        this.exp = this.mfd;
      }
    }
    console.log(this.mfd);
  }
  test1(){
    console.log(this.exp);
    if(this.exp == ''||this.mfd == ''){
      this.exp = this.exp;
    }
    else {
      var date1 = new Date(this.mfd);
      var date2 = new Date(this.exp);
      var timeDiff = (date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(diffDays<0){
       this.mfd= this.exp;
      }
    }
  }
}
