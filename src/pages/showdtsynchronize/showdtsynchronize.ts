import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the ShowdtsynchronizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtsynchronize',
  templateUrl: 'showdtsynchronize.html',
})
export class ShowdtsynchronizePage {
user;
key
item=[];
syncs;
pro_sync=[];
item$:Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase
    ,public modalCtrl:ModalController) {
    this.key=this.navParams.get('key');
    this.user=this.navParams.get('user');
    this.syncs=this.db.list('/setting/farm/program_sync/'+this.user).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
    this.item$=this.db.list('/synchronize/'+this.user,ref=>ref.orderByKey().equalTo(this.key)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
    this.item$.forEach(data=>{
      data.forEach(element => {
        this.pro_sync.push(element.program_sync);
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtsynchronizePage');
  }
  verify(a){
    this.pro_sync[0]=a;
  }
  showverify(){
    const modal = this.modalCtrl.create("VerifyProSyncPage",{user:this.user,program: this.pro_sync[0]});
    modal.present();
  }
  sync(data:NgForm){
    console.log(data.value);

  }
}
