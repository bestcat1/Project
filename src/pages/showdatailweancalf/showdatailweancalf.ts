import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the ShowdatailweancalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdatailweancalf',
  templateUrl: 'showdatailweancalf.html',
})
export class ShowdatailweancalfPage {
  edit=true;
user;id;
item$:Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase,public viewCtrl:ViewController) {
    this.user=this.navParams.get('user');
    this.id=this.navParams.get('id');
    this.item$=this.db.list('/weancalf/'+this.user,ref=>ref.orderByChild('bid').equalTo(this.id)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdatailweancalfPage');
  }
  editweanc(data:NgForm){
    this.db.list('/weancalf/'+this.user).set(data.value.key,data.value);
    console.log(data.value);
    this.viewCtrl.dismiss();
  }
  check(n){
    this.edit=n;
  }
}
