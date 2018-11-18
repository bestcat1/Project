import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
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
  key;

  item$:Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase) {
    this.key=this.navParams.get('key');
    this.user=this.navParams.get('user');

    this.item$=this.db.list('/abdominal/'+this.user,ref=>ref.orderByKey().equalTo(this.key)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
    this.item$.subscribe(data=>{console.log(data)});
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtabdominalPage');
  }
  
  abd(data:NgForm){

  }
}
