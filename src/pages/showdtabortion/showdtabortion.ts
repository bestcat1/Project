import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
edit = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
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
    if(values[i].privilege != 'ยังไม่ได้อนุมัติ'){
     this.operator.push( values[i].fname+' '+values[i].lname);
      }

  }
}
});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtabortionPage');
  }
  abortion(data:NgForm){
    this.api.updateAbortionByKey(this.user,this.detail.key,data.value).subscribe(d=>{
      if(d.status == 'OK'){
        swal("เสร็จสิ้น", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
        this.navCtrl.pop();
      }
    });
  }
  check(a){
    this.edit = a;
  }
}
