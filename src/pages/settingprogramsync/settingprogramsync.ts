import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingprogramsyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingprogramsync',
  templateUrl: 'settingprogramsync.html',
})
export class SettingprogramsyncPage {
  user;
  item$;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private api : NodeapiProvider) {
    this.user=this.navParams.get('user');

  }

  ionViewWillEnter(){
    this.api.getProgramSync(this.user).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.item$ = value;
      for(let i=0;i<value.length;i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingprogramsyncPage');
  }
  addpro(data:NgForm){
    this.api.addProgramSync(this.user,data.value).subscribe();
    this.ionViewWillEnter()
  }
  removepro(k){
    this.api.removeProgramSync(this.user,k).subscribe();
    this.ionViewWillEnter();
  }
  stdetailsync(p){
    console.log(p);
    this.navCtrl.push("SettingdetailprogramsyncPage",{user:this.user,program:p})
  }
}
