import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';

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
  item$:Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.user=this.navParams.get('user');
    this.item$=this.db.list('/setting/farm/program_sync/'+this.user).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingprogramsyncPage');
  }
  addpro(data:NgForm){
    this.db.list('/setting/farm/program_sync/'+this.user).push(data.value);
  }
  removepro(k){
    this.db.list('/setting/farm/program_sync/'+this.user).remove(k);
  }
  stdetailsync(p){
    console.log(p);
    this.navCtrl.push("SettingdetailprogramsyncPage",{user:this.user,program:p})
  }
}
