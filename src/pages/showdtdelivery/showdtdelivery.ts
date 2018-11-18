import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the ShowdtdeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtdelivery',
  templateUrl: 'showdtdelivery.html',
})
export class ShowdtdeliveryPage {
  user;
  key;

  item$:Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase) {
    this.key=this.navParams.get('key');
    this.user=this.navParams.get('user');
    
    this.item$=this.db.list('/delivery/'+this.user,ref=>ref.orderByKey().equalTo(this.key)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtdeliveryPage');
  }
dv(data:NgForm){

}
}
