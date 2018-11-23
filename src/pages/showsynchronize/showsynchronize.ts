import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShowsynchronizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showsynchronize',
  templateUrl: 'showsynchronize.html',
})
export class ShowsynchronizePage {
  public damList:Array<any>;
  public loadeddamList:Array<any>;
  user:string;

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private api:NodeapiProvider) {

    this.user=this.navParams.get('user');

  }
  ionViewWillEnter(){
    this.api.getSyncByUser(this.user).subscribe(data=>{
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
    console.log('ionViewDidLoad ShowsynchronizePage');
  }
  showdtsynchronize(k){
    this.navCtrl.push('ShowdtsynchronizePage',{user:this.user,key:k})
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
    if(v.dam_id && q) {
      if (v.dam_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.damList.length);

}


}

