import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the SettingprogrammaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingprogrammaintain',
  templateUrl: 'settingprogrammaintain.html',
})
export class SettingprogrammaintainPage {
  user;
  item$:Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase
    ,public viewCtrl :ViewController) {
    this.user=this.navParams.get('user');
    this.item$=this.db.list('/setting/farm/program_maintain/'+this.user).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingprogrammaintainPage');
  }
  addpro(data:NgForm){
    this.db.list('/setting/farm/program_maintain/'+this.user).push(data.value);
    this.viewCtrl.dismiss();
    this.navCtrl.push(this.navCtrl.getActive().component,{user:this.user});
  }
  removepro(k){
    this.db.list('/setting/farm/program_maintain/'+this.user).remove(k);
  }
  setpromaintain(p){
    console.log(p);
    this.navCtrl.push("SettingdetailprogreammaintainPage",{user:this.user,program:p})
  }
}
