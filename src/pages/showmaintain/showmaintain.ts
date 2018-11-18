import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';



/**
 * Generated class for the ShowmaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showmaintain',
  templateUrl: 'showmaintain.html',
})
export class ShowmaintainPage {
  public damList:Array<any>;
  public loadeddamList:Array<any>;

  user:string;
  item$ : Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:AngularFireDatabase) {
    this.user=this.navParams.get('user');
    this.item$=this.db.list('/maintain/'+this.user).snapshotChanges().map(chang =>{
      return chang.map(c=>({key:c.payload.key, ...c.payload.val()}));
    });

    
    this.item$.forEach(damList => {
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
    console.log('ionViewDidLoad ShowmaintainPage');
  }
  showdtmaintain(k){
    this.navCtrl.push('ShowdtmaintainPage',{user:this.user,key:k})
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

