import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';





@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',

})
export class MenuPage {
  user:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu:MenuController) {
    this.user=this.navParams.get('user');
    this.menu=menu;
    this.menu.enable(true,'myMenu');
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  mncattle(){
    this.navCtrl.push("MncattlePage");
  }
  mndam(){
    this.navCtrl.push("MndamPage");
  }
  mncalf(){
    this.navCtrl.push("MncalfPage");
  }
  setting(){
    this.navCtrl.push("SettingPage");
  }
  verify(){
    this.navCtrl.push("VerifyPage");
  }
  report(){

    this.navCtrl.push("ReportPage");
  }
}
