import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the ShowdtabortionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtabortion',
  templateUrl: 'showdtabortion.html',
})
export class ShowdtabortionPage {
detail;
user;
operator=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider
    ,private viewCtrl: ViewController) {
this.detail = this.navParams.get('detail');
this.user = this.navParams.get('user');
console.log(this.user);
this.api.getUser(this.user).subscribe(data=>{
  console.log(data);
  if(data!=null){
  var values = Object.keys(data).map(key => data[key]);
  console.log(values);
  this.operator.push(values[0].fname+' '+values[0].lname);
  }
});
this.api.getPersonnel(this.user).subscribe(data=>{
  if(data!=null){
  var values = Object.keys(data).map(key => data[key]);
  for(let i = 0; i<values.length;i++){
    this.operator.push({operator: values[i].fname+' '+values[i].lname});
  }
}
});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtabortionPage');
  }
  abortion(data:NgForm){
    this.api.updateAbortionByKey(this.user,this.detail.key,data.value).subscribe();
    this.viewCtrl.dismiss();
  }
}
