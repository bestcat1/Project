import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the MncalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mncalf',
  templateUrl: 'mncalf.html',
})
export class MncalfPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController) {
  this.menu.enable(false,'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MncalfPage');
  }

}
