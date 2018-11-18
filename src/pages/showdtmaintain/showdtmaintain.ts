import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the ShowdtmaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtmaintain',
  templateUrl: 'showdtmaintain.html',
})
export class ShowdtmaintainPage {

  user;
 key;
 program;
 maintain;

  item$:Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase) {
;
    this.user=this.navParams.get('user');
    this.key=this.navParams.get('key');
    console.log(this.key);
    this.item$=this.db.list('/maintain/'+this.user,ref=>ref.orderByKey().equalTo(this.key)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });

    this.item$.subscribe(data=>{
      for(let i=0;i<data.length;i++){
        console.log(data[i].type_of_maintain);
        this.program = this.db.list('/setting/farm/program_maintain/drug_pro_maintain/' + this.user,ref=>ref.orderByChild('pro_maintain').equalTo(data[i].type_of_maintain)).snapshotChanges().map(chang => {
          return chang.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        break;
      }
    })
    this.maintain = this.db.list('/setting/farm/program_maintain/' + this.user).snapshotChanges().map(chang => {
      return chang.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtmaintainPage');
  }
mt(data:NgForm){

}
select(a)
{
  console.log(a);
  this.program = this.db.list('/setting/farm/program_maintain/drug_pro_maintain/' + this.user,ref=>ref.orderByChild('pro_maintain').equalTo(a)).snapshotChanges().map(chang => {
    return chang.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });
}
}
