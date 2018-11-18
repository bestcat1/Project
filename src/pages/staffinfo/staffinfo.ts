import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.user=this.navParams.get('user');
    this.item = this.db.list('/personnel',ref=>ref.orderByChild('adminfarm').equalTo(this.user)).valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffinfoPage');
  }

}
