import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShowdatailbrandingcalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdatailbrandingcalf',
  templateUrl: 'showdatailbrandingcalf.html',
})
export class ShowdatailbrandingcalfPage {
  edit=true;
  user;
  data;
  operator=[];
  privilege
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl:ViewController,private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.data=this.navParams.get('id');
    this.privilege = this.navParams.get('privilege');
    this.api.getUser(this.user).subscribe(data=>{
      var values = Object.keys(data).map(key=>data[key]);
      this.operator.push(values[0].fname + ' ' + values[0].lname)
    });
    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
     values.forEach(snap=>{
      if(snap.privilege != 'ยังไม่ได้อนุมัติ'){
 this.operator.push(snap.fname + ' ' + snap.lname);
        }

    })
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdatailbrandingcalfPage');
  }
  editbranc(data:NgForm){
    console.log(data.value);
    this.api.updateBrandingByKey(this.user,this.data.key,data.value).subscribe(d=>{
      if(d.status=='OK'){
        swal("เสร็จสิ้น", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
        this.navCtrl.pop();
      }
    });

  }
  check(n){
    this.edit=n;
  }
}
