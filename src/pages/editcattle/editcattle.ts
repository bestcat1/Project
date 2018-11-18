import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the EditcattlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcattle',
  templateUrl: 'editcattle.html',
})
export class EditcattlePage {
  public damList:Array<any>;
  public loadedDamList:Array<any>;
  public DamRef:firebase.database.Reference;

user:string;
item$ : Observable<any[]>;
corral;
corrals;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api: NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.corral=this.navParams.get('corral');
    this.api.getCorral(this.user).subscribe(data=>{
      this.corrals = Object.keys(data).map(key => data[key]);
    })
    if(this.corral=='ทั้งหมด'){
      this.api.getAllCattle(this.user).subscribe(data=>{
      var dam = Object.keys(data).map(key => data[key]);
      this.damList = dam;
      this.loadedDamList = dam;
      })
    }
    else{
    this.api.getCattleByCorral(this.user, this.corral).subscribe(data=>{
      var dam = Object.keys(data).map(key => data[key]);
      this.damList = dam;
      this.loadedDamList = dam;
    });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcattlePage');
  }
  showdetail(n){
    console.log(n);
    this.navCtrl.push("EditdetailcattlePage",{user:this.user,id:n});
  }
  initializeItems(): void {
    this.damList = this.loadedDamList;
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

selectcorral(n){
  if(n=='ทั้งหมด'){
    this.api.getAllCattle(this.user).subscribe(data=>{
    var dam = Object.keys(data).map(key => data[key]);
    this.damList = dam;
    this.loadedDamList = dam;
    })
  }
  else{
  this.api.getCattleByCorral(this.user, n).subscribe(data=>{
    var dam = Object.keys(data).map(key => data[key]);
    this.damList = dam;
    this.loadedDamList = dam;
  });
  }
}
}
