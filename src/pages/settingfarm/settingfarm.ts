import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the SettingfarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingfarm',
  templateUrl: 'settingfarm.html',
})
export class SettingfarmPage {
user;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.user=this.navParams.get('user');
    console.log(this.user)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingfarmPage');
  }
  stcorral(){
    this.navCtrl.push("SettingcorralPage",{user:this.user});
  }
  ststrian(){
    this.navCtrl.push("SettingstrianPage",{user:this.user});
  }
  stcolor(){
    this.navCtrl.push("SettingcolorPage",{user:this.user});
  }
  stpromaintain(){
    this.navCtrl.push("SettingprogrammaintainPage",{user:this.user});
  }
  stprosync(){
    this.navCtrl.push("SettingprogramsyncPage",{user:this.user})
  }
  stdrug(){
    this.navCtrl.push("SettingdrugPage",{user:this.user})
  }
}
