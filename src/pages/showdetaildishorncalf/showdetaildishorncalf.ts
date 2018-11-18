import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
/**
 * Generated class for the ShowdetaildishorncalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdetaildishorncalf',
  templateUrl: 'showdetaildishorncalf.html',
})
export class ShowdetaildishorncalfPage {
edit:boolean=true;
user;
id;
item$ : Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase,public viewCtrl:ViewController) {
    this.user=this.navParams.get('user');
    this.id=this.navParams.get('id');
    this.item$=this.db.list('/dishorncalf/'+this.user,ref=>ref.orderByChild('bid').equalTo(this.id)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdetaildishorncalfPage');
  }
  updatedishornc(data:NgForm){
    this.db.list('/dishorncalf/'+this.user).set(data.value.key,data.value)
    console.log(data.value);
    this.viewCtrl.dismiss();

  }
  check(n){
    this.edit=n;
  }
}
