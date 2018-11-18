import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
/**
 * Generated class for the Forgetpassword1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpassword1',
  templateUrl: 'forgetpassword1.html',
})
export class Forgetpassword1Page {
user;
detail=[];
question=[];
anwser=[];
key=[];
checkcpass=true;
checkanwser=true;
checkhide=true;
datas:Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase,
  public viewCtrl:ViewController) {
    this.user=this.navParams.get('user');
    console.log(this.user);
    this.datas=this.db.list('/User',ref=>ref.orderByChild('user').equalTo(this.user)).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
    this.datas.forEach(data=>{
      this.question.push(data[0].question);
      this.anwser.push(data[0].anwser);
      this.key.push(data[0].key);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Forgetpassword1Page');
  }
  forget(data:NgForm){
    console.log(data.value.anwser,this.anwser[0])
    if(data.value.anwser==this.anwser[0]){
      this.checkhide=false;
      this.checkanwser=true;
      this.checkcpass=true;
    }
    else{
      this.checkhide=true;
      this.checkanwser=false;
    }
  }
  change(d:NgForm){
    console.log(d.value);
    if(d.value.cpass==d.value.pass){
      this.checkcpass=true;
      this.db.list('/User').update(this.key[0],{pass:d.value.pass})
      this.viewCtrl.dismiss();
      swal("บันทึกเสร็จสิ้น!", "เปลี่ยนรหัสผ่านเสร็จสิ้น", "success");
    }
    else{
      this.checkcpass=false;
    }
  }
}
