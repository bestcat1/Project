import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the ManagUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manag-users',
  templateUrl: 'manag-users.html',
})
export class ManagUsersPage {
user;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modal:ModalController) {
    this.user=this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagUsersPage');
  }
  registerstaff(){
    this.navCtrl.push("RegisterstaffPage",{user:this.user});
  }
  staffinfo(){
    this.navCtrl.push("StaffinfoPage",{user:this.user});
  }
}
