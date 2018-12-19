import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import { AuthProvider } from '../../providers/auth/auth';
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
detail;
question;
anwser;
key;
checkcpass=true;
checkanwser=true;
email;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl:ViewController,private api:NodeapiProvider,
  private auth:AuthProvider) {
    this.user=this.navParams.get('user');
    console.log(this.user);
    this.api.getUser(this.user).subscribe(data=>{
      var value = Object.keys(data).map(key=>data[key]);
      this.question = value[0].question;
      this.anwser = value[0].anwser;
      this.email = value[0].email;
      this.key = Object.keys(data)[0];
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Forgetpassword1Page');
  }
  forget(data:NgForm){
    console.log(this.email)
    console.log(data.value.anwser,this.anwser)
    if(data.value.anwser==this.anwser){
      this.auth.resetPasswordByEmail(this.email).subscribe();

      this.checkanwser=true;
      this.checkcpass=true;
      this.navCtrl.pop();
    }
    else{

      this.checkanwser=false;
    }
  }

}
