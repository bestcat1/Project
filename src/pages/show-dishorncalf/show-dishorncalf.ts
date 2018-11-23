import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShowDishorncalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-dishorncalf',
  templateUrl: 'show-dishorncalf.html',
})
export class ShowDishorncalfPage {
  public calfList:Array<any>;
  public loadedcalfList:Array<any>;

  user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
    this.user=this.navParams.get('user');


  }
  ionViewWillEnter(){
    this.api.getHorndeteringByUser(this.user).subscribe(data=>{
      console.log(data);
      var calf = [];
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      for(let i=0;i<values.length;i++){
        calf.push(values[i]);
        calf[i].key = Object.keys(data)[i];
      }
    }
    else{
      calf = [];
    }

    this.calfList = calf;
    this.loadedcalfList = calf;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDishorncalfPage');
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
    if(v.birth_id && q) {
      if (v.birth_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.calfList.length);

}

showdetail(n){
console.log(n);
this.navCtrl.push("ShowdetaildishorncalfPage",{user:this.user,id:n});
}
}
