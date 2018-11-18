import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the SelectdishorncalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectdishorncalf',
  templateUrl: 'selectdishorncalf.html',
})
export class SelectdishorncalfPage {
  public damList:Array<any>;
  public loadeddamList:Array<any>;
 // public damRef:firebase.database.Reference;
  user:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api:NodeapiProvider) {
    this.user=this.navParams.get('user');

    this.api.getAllCalf(this.user).subscribe(data => {
      let dam = [];
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        dam.push(snap);
      });

      this.damList = dam;
      this.loadeddamList = dam;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectdishorncalfPage');
  }
  initializeItems(): void {
    this.damList = this.loadeddamList;
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

  this.damList = this.damList.filter((v) => {
    if(v.bid && q) {
      if (v.bid.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.damList.length);
  }
  dh(a){
    this.navCtrl.push("DishorncalfPage",{user:this.user,id:a});
  }
}
