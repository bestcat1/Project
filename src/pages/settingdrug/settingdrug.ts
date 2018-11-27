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
    if(data.value.drug_name!=''&&data.value.common_drug!=''&&data.value.dosage!=''){
      this.api.addDrug(this.user,data.value).subscribe();
      this.drug_name='';
      this.common_drug='';
      this.dosage='';
      this.ionViewWillEnter();
    } else {
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
    }


  }
  delete(k){
    this.api.removeDrug(this.user,k).subscribe();
    this.ionViewWillEnter();
  }
}
