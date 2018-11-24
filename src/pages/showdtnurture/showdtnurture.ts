import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
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
      this.operator.push(values[i].fname + ' ' + values[i].lname);
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
    console.log(data.value);
    console.log(this.key_use_drug);
    for(let i=0;i<this.key_use_drug.length;i++){
      this.api.deleteDrugTreatmentByKey(this.user,this.data.id,this.key_use_drug[i]).subscribe();
    }
    for(let i=0;i<this.use_drug.length;i++){
      this.api.addTreatmentDrug(this.user,this.data.id,{number_of_treatment:Number(this.data.number_of_treatment),drug_name:this.use_drug[i]}).subscribe();
    }
    this.api.updateTreatmentByKey(this.user,this.data.key,data.value).subscribe();
  }
  adddrug(d)
  {
    this.use_drug=[];
    for(let i =0;i<d.length;i++){
      this.use_drug.push(d[i]);
    }
  }
}
