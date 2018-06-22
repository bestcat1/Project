import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the MncattlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mncattle',
  templateUrl: 'mncattle.html',
})
export class MncattlePage {
  item:AngularFireList<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MncattlePage');
  }



}
