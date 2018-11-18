import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingdetailprogreammaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingdetailprogreammaintain',
  templateUrl: 'settingdetailprogreammaintain.html',
})
export class SettingdetailprogreammaintainPage {
data_drug;
user;
program;
  constructor(public navCtrl: NavController, public navParams: NavParams,

  private api: NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.program=this.navParams.get('program');
    console.log(this.user, this.program);

    }
    ionViewWillEnter(){
      this.api.getDetailMaintainByType(this.user,this.program).subscribe(data=>{
        if(data!=null){
        var values = Object.keys(data).map(key=> data[key]);
        this.data_drug = values;
        for(let i=0;i<values.length;i++){
          this.data_drug[i].key = Object.keys(data)[i];
        }
      }else{
        this.data_drug = [];
      }
      })
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdetailprogreammaintainPage');
  }
  addpromain(data:NgForm){
    console.log(data.value);
    this.api.addDetailMaintain(this.user,data.value).subscribe();
    this.ionViewWillEnter();
  }
  detail(d){
    this.navCtrl.push("ShowdetailprogrammaintainPage", {detail:d,user:this.user});
  }
  delete(k){
    this.api.removeDetailMaintain(this.user,k).subscribe();
    this.ionViewWillEnter();
  }
}
