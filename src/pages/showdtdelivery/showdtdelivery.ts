import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShowdtdeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtdelivery',
  templateUrl: 'showdtdelivery.html',
})
export class ShowdtdeliveryPage {
  user;
  data;
  operator=[];
edit = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
    this.data=this.navParams.get('key');
    this.user=this.navParams.get('user');

    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);

      this.operator.push(values[0].fname+' '+values[0].lname);
      }
    });

    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        this.operator.push(snap.fname+' '+snap.lname);
      })
    }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtdeliveryPage');
  }
dv(data:NgForm){
  console.log(data.value);
  this.api.updateDeliveryByKey(this.user,this.data.key,data.value).subscribe(d=>{
    if(d.status=='OK'){
      swal("เสร็จสิ้น", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
        this.navCtrl.pop();
    }
  });
}
check(a){
  this.edit = a;
}
}
