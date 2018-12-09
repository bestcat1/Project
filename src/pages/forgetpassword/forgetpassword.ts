import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';


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
username:any;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public viewCtrl:ViewController,private api:NodeapiProvider) {
    this.api.getUserAll().subscribe(data=>{
      this.username = Object.keys(data).map(key=>data[key]);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }
forget(fg:NgForm){
  console.log(this.username)
  for(let i=0;i<this.username.length;i++){
    if(fg.value.user==this.username[i].user){
      this.checkuser=true;
      console.log(fg.value.user,this.username[i].user)
      this.viewCtrl.dismiss();
      this.navCtrl.push("Forgetpassword1Page",{user:this.username[i].user});
      break;
    }else{
      this.checkuser=false;
    }
  }
}

}
