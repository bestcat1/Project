import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
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
  public damRef:firebase.database.Reference;
  user:string;
  item$ : Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase) {
    this.user=this.navParams.get('user');
    console.log(this.user);
    this.item$=this.db.list('/nurture/'+this.user).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });

   
    this.item$.forEach( damList => {
      let dam = [];
      damList.forEach( country => {
        dam.push(country);
        return false;
      });

      this.damList = dam;
      this.loadeddamList = dam;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShownurturePage');
  }
  showdtnurture(k){
   
    this.navCtrl.push('ShowdtnurturePage',{user:this.user,key:k})
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
