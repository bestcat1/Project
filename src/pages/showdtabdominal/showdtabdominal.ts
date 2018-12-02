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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api:NodeapiProvider) {
    this.data=this.navParams.get('key');
    this.user=this.navParams.get('user');
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
        this.operator.push({operator: values[i].fname+' '+values[i].lname});
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
    this.api.updatePregnantByKey(this.user,this.data.key,{ dam_id: data.value.dam_id, alert_after_7D: this.alert_befor_7D, alert_sync: this.alert_sync, calve_date:  this.calve_date, dateabd: data.value.dateabd, not_pregnant_noti: data.value.not_pregnant_noti, note: data.value.note, pregnant_noti: data.value.pregnant_noti, result: data.value.result, timeabd: data.value.timeabd ,recoder:data.value.recoder,operator:data.value.operator, alert_befor_7D: this.alert_befor_7D }).subscribe();
  }

  test(a:string){
    console.log(a);
    var day = a;
    var y1k = new Date(day);
    var y2k = new Date(day);
    var y3k = new Date(day);
    var y4k = new Date(day);
    y1k.setDate(y1k.getDate() + 283);
    this.calve_date = y1k.getFullYear() + "-" + (y1k.getMonth() + 1) + "-" + y1k.getDate();
    y2k.setDate(y2k.getDate() + 276);
    this.alert_befor_7D = y2k.getFullYear() + "-" + (y2k.getMonth() + 1) + "-" + y2k.getDate();
    y3k.setDate(y3k.getDate() + 290);
    this.alert_after_7D = y3k.getFullYear() + "-" + (y3k.getMonth() + 1) + "-" + y3k.getDate();
    y4k.setDate(y4k.getDate() + 18);
    this.alert_sync = y4k.getFullYear() + "-" + (y4k.getMonth() + 1) + "-" + y4k.getDate();

  }
}
