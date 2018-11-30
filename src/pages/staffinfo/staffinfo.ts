import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController } from 'ionic-angular';

/**
 * Generated class for the StaffinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staffinfo',
  templateUrl: 'staffinfo.html',
})
export class StaffinfoPage {
user;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu1:MenuController,
    private viewCtrl:ViewController) {
    this.user = this.navParams.get('detail');
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffinfoPage');
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
