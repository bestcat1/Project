import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import swal from 'sweetalert';
/**
 * Generated class for the EditdatauserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdatauser',
  templateUrl: 'editdatauser.html',
})
export class EditdatauserPage {
user;
item$:Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public global: GlobalProvider,private db:AngularFireDatabase,
    public viewCtrl:ViewController) {
    this.user=this.global.getMyGlobalVar();
    console.log(this.global.getMyGlobalVar());
    this.item$=this.db.list('/User',ref=>ref.orderByChild('user').equalTo(this.user)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdatauserPage');
  }
  update(data:NgForm){
    console.log(data.value);
    this.db.list('/User').update(data.value.key,data.value)
    swal("บันทึกเสร็จสิ้น!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
    this.viewCtrl.dismiss();
  }

}
