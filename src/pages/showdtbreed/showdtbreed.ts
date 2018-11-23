import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShowdtbreedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtbreed',
  templateUrl: 'showdtbreed.html',
})
export class ShowdtbreedPage {
  bmark:boolean=true;
EPmark:boolean=true;
  user;
  data;
  sire_id=[];
  operator=[];

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private api:NodeapiProvider) {
    this.data=this.navParams.get('key');
    this.user=this.navParams.get('user');
    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      value.forEach(snap=>{
        if(snap.sex == 'BULL'){
          this.sire_id.push(snap);
          console.log(this.sire_id);
        }
      });
    }
    });

    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.operator.push({operator: values[0].fname+' '+values[0].lname});
      }
    })
    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        this.operator.push({operator: values[i].fname+' '+values[i].lname});
      }
    }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtbreedPage');
  }
  markb(a){
    console.log(a);
    if(a==true){
      this.bmark=false;
    }
    else{
      this.bmark=true;
    }
  }
  markep(b){
    if(b==true){
      this.EPmark=false;
    }
    else{
      this.EPmark=true;
    }
}
breed(data:NgForm){
  delete data.value.mEP;
  delete data.value.markbel;
  console.log(data.value);
  this.api.updateBreedByKey(this.user,this.data.key,data.value).subscribe();
}
}
