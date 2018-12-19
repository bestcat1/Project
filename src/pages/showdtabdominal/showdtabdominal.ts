import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShowdtabdominalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtabdominal',
  templateUrl: 'showdtabdominal.html',
})
export class ShowdtabdominalPage {
  user;
  data;
  operator=[];
  calve_date;
  alert_befor_7D;
  alert_after_7D;
  alert_sync;
edit=true;
privilege
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api:NodeapiProvider) {
    this.data=this.navParams.get('key');
    this.user=this.navParams.get('user');
    this.privilege = this.navParams.get('privilege');
    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);

      this.operator.push({operator: values[0].fname+' '+values[0].lname});
      }
    });

    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      for(let i = 0; i<values.length;i++){
        if(values[i].privilege != 'ยังไม่ได้อนุมัติ'){
          this.operator.push({operator: values[i].fname+' '+values[i].lname});
          }
      }
    }
    });
    this.calve_date=this.data.calve_date;
  this.alert_befor_7D=this.data.alert_befor_7D;
  this.alert_after_7D=this.data.alert_after_7D;
  this.alert_sync=this.data.alert_sync;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtabdominalPage');
  }

  abd(data:NgForm){
    console.log(data.value);
    this.api.updatePregnantByKey(this.user,this.data.key,{ dam_id: data.value.dam_id, alert_after_7D: this.alert_befor_7D, alert_sync: this.alert_sync, calve_date:  this.calve_date, dateabd: data.value.dateabd, not_pregnant_noti: data.value.not_pregnant_noti, note: data.value.note, pregnant_noti: data.value.pregnant_noti, result: data.value.result, timeabd: data.value.timeabd ,recoder:data.value.recoder,operator:data.value.operator, alert_befor_7D: this.alert_befor_7D }).subscribe(d=>{
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
