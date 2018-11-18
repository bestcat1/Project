import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the ShowWeancalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-weancalf',
  templateUrl: 'show-weancalf.html',
})
export class ShowWeancalfPage {
  public calfList:Array<any>;
  public loadedcalfList:Array<any>;
  public calfRef:firebase.database.Reference;
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user=this.navParams.get('user');

    this.calfRef = firebase.database().ref('/weancalf/'+this.user);
    this.calfRef.on('value', calfList => {
      let calf = [];
      calfList.forEach( country => {
        calf.push(country.val());
        return false;
      });

      this.calfList = calf;
      this.loadedcalfList = calf;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowWeancalfPage');
  }
  initializeItems(): void {
    this.calfList = this.loadedcalfList;
  }
  getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;

  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.calfList = this.calfList.filter((v) => {
    if(v.bid && q) {
      if (v.bid.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.calfList.length);

}
showdetail(n)
{
  this.navCtrl.push("ShowdatailweancalfPage",{user:this.user,id:n});
}
}
