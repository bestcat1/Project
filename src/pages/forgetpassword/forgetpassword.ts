import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ForgetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
j=0;
checkuser=true;
username:Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase
  ,public viewCtrl:ViewController) {

    this.username=this.db.list('/User').snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }
forget(fg:NgForm){
this.username.subscribe(data=>{
  for(let i=0;i<data.length;i++){
    if(fg.value.user==data[i].user){
      this.checkuser=true;
      console.log(fg.value.user,data[i].user)
      this.viewCtrl.dismiss();
      this.navCtrl.push("Forgetpassword1Page",{user:data[i].user});

      break;
    }else{
      this.checkuser=false;
    }
  }
})

}

}
