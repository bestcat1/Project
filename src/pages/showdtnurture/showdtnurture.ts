import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShowdtnurturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtnurture',
  templateUrl: 'showdtnurture.html',
})
export class ShowdtnurturePage {
  user;
  data;
  operator=[];
  drugs;
  use_drug=[];
  key_use_drug=[];
  edit=true;
  add_data_drug=[];
  edit_treatment;
  loader;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider
    ,private loadingCtrl: LoadingController) {
    this.data=this.navParams.get('key');
    this.user=this.navParams.get('user');
    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);

      this.operator.push(values[0].fname + ' ' + values[0].lname);
      }
    })

    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
    for(let i = 0; i < values.length;i++){
      if(values[i].privilege != 'ยังไม่ได้อนุมัติ'){
      this.operator.push(values[i].fname + ' ' + values[i].lname);
        }

    }
  }
    });
    this.api.getDrug(this.user).subscribe(data=>{
      if(data!=null){
      this.drugs = Object.keys(data).map(key=>data[key]);
      }
    })
    console.log(this.user,this.data.id,this.data.number_of_treatment);
    this.api.getDrugTreatmentByIdAndCount(this.user,this.data.id,this.data.number_of_treatment).subscribe(data=>{
      console.log(data);
      if(data!=null){
        var value = Object.keys(data).map(key=>data[key]);
        for(let i=0; i<value.length;i++){
          this.use_drug.push(value[i].drug_name);
          this.key_use_drug.push(Object.keys(data)[i]);
        }
      }else{
        this.use_drug = [];
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtnurturePage');
  }
  nt(data:NgForm){
    this.presentLoading();
    console.log(data.value);
    console.log(this.key_use_drug);
    this.edit_treatment = data.value;

    for(let i=0;i<this.use_drug.length;i++){
      this.add_data_drug.push({number_of_treatment:Number(this.data.number_of_treatment),drug_name:this.use_drug[i]});
    }
    this.uploader(0);
  }

  uploader(i) {

    if (i < this.key_use_drug.length) {
        this.api.deleteDrugTreatmentByKey(this.user,this.data.id,this.key_use_drug[i]).subscribe(d=>{
          if(d.status == 'OK'){
            this.uploader(i + 1);
          }
      });
    } else {
      this.api.addTreatmentDrug(this.user,this.data.id,this.add_data_drug).subscribe(d1=>{
        if(d1.status == 'OK'){
          this.api.updateTreatmentByKey(this.user,this.data.key,this.edit_treatment).subscribe(d=>{
            if(d.status=='OK'){
              swal("เสร็จสิ้น", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
              this.navCtrl.pop();
              this.loader.dismiss();
            }
          });
        }
      });
    }
  }
  adddrug(d)
  {
    this.use_drug=[];
    for(let i =0;i<d.length;i++){
      this.use_drug.push(d[i]);
    }
  }
  check(a){
    this.edit = a;
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่...",
    });
    this.loader.present();
  }
}
