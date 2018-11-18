import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MenuController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  item$ : Observable<any[]>;

constructor(private db: AngularFireDatabase,public menuCtrl: MenuController,public NavCtrl: NavController,public alertCtrl:AlertController) {
  this.item$=this.db.list('/User').snapshotChanges().map(chang =>{
    return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
  });

  this.db.list('/User').query.on("child_added",function(snapshot){

  });

}

delWiki(k){
   this.db.list('/User').remove(k);
   let alert = this.alertCtrl.create({
    title: 'เรียบร้อย!',
    subTitle: 'ลบข้อมูลผู้ใช้เรียบร้อยแล้ว',
    buttons: ['ตกลง'],
  });
  alert.present();
  }
}

