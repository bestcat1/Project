import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

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
item:Observable<any[]>;
menu;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu1:MenuController) {
    //this.user=this.navParams.get('user');
    //this.item = this.db.list('/User',ref=>ref.orderByChild('adminfarm').equalTo(this.user)).valueChanges();
    this.menu=menu1;
    this.menu.enable(true,'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffinfoPage');
  }

}
