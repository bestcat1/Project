import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the SettingdrugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingdrug',
  templateUrl: 'settingdrug.html',
})
export class SettingdrugPage {
user;
drugs:Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase) {
    this.user=this.navParams.get('user');
    this.drugs=this.db.list('/setting/farm/drug/'+this.user).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingdrugPage');
  }
  adddrug(data:NgForm){
    console.log(data.value);
    this.db.list('/setting/farm/drug/'+this.user).push(data.value);
  }
  delete(k){
    this.db.list('/setting/farm/drug/'+this.user).remove(k);
  }
}
