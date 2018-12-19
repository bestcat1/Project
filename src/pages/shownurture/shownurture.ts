import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShownurturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shownurture',
  templateUrl: 'shownurture.html',
})
export class ShownurturePage {
  public damList:Array<any>;
  public loadeddamList:Array<any>;
  user:string;
  privilege
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api: NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.privilege = this.navParams.get('privilege');
    console.log(this.user);

  }
  ionViewWillEnter(){
    this.api.getTreatmentByUser(this.user).subscribe(data=>{
      console.log(data);
      var dam = [];
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      for(let i=0;i<values.length;i++){
        dam.push(values[i]);
        dam[i].key = Object.keys(data)[i];
      }
    }
    else{
      dam = [];
    }

    this.damList = dam;
    this.loadeddamList = dam;
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShownurturePage');
  }
  showdtnurture(k){

    this.navCtrl.push('ShowdtnurturePage',{user:this.user,key:k,privilege:this.privilege})
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
    if(v.id && q) {
      if (v.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.damList.length);

}
}
